from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from scraper import scrape_amazon_reviews
from sentiment import analyze_sentiment
import logging
import time
from typing import Optional

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.post("/analyze")
async def analyze(product_url: str = Form(...)):
    try:
        logger.info(f"Received request to analyze URL: {product_url}")
        
        # Validate URL
        if not product_url or not isinstance(product_url, str):
            raise HTTPException(status_code=400, detail="Invalid URL format")
        
        if not product_url.startswith(("http://", "https://")):
            product_url = "https://" + product_url
            
        if "amazon.com" not in product_url:
            raise HTTPException(status_code=400, detail="Only Amazon product URLs are supported")
        
        # Scrape reviews
        reviews = scrape_amazon_reviews(product_url)
        if not reviews:
            raise HTTPException(status_code=404, detail="No reviews found for the given URL")
        
        logger.info(f"Successfully scraped {len(reviews)} reviews")
        
        # Analyze sentiment
        summary = analyze_sentiment(reviews)
        if not summary:
            raise HTTPException(status_code=500, detail="Failed to analyze sentiment")
        
        logger.info("Sentiment analysis completed successfully")
        return JSONResponse(
            content={"sentiment_summary": summary},
            status_code=200
        )
        
    except HTTPException as he:
        logger.error(f"HTTP Error: {str(he.detail)}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={"status": "healthy", "timestamp": time.time()},
        status_code=200
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error handler caught: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"},
    )
