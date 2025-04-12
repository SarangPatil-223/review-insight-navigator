import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import logging
import csv
from pathlib import Path
import os
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_random_user_agent():
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0"
    ]
    return random.choice(user_agents)

def scrape_amazon_reviews(url: str, scroll_count: int = 5):
    try:
        # Set up Chrome WebDriver with more realistic settings
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        options.add_argument(f"--user-agent={get_random_user_agent()}")
        options.add_argument("--disable-gpu")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        # Initialize the WebDriver
        logger.info("Initializing Chrome WebDriver")
        driver = webdriver.Chrome(options=options)
        
        # Execute CDP commands to prevent detection
        driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": get_random_user_agent()})
        driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
            'source': '''
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => undefined
                })
            '''
        })
        
        logger.info(f"Navigating to URL: {url}")
        driver.get(url)
        time.sleep(random.uniform(3, 5))  # Random delay to appear more human-like

        # Try to find and click the "See all reviews" link
        try:
            see_all_reviews = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "a[data-hook='see-all-reviews-link-foot']"))
            )
            see_all_reviews.click()
            logger.info("Clicked 'See all reviews' link")
            time.sleep(random.uniform(2, 4))
        except Exception as e:
            logger.info(f"Could not find 'See all reviews' link: {str(e)}")

        # Scroll down to load more reviews with random delays
        logger.info("Scrolling to load more reviews")
        for i in range(scroll_count):
            driver.execute_script("window.scrollBy(0, 800);")
            time.sleep(random.uniform(1, 3))
            logger.info(f"Scrolled {i+1} times")

        # Save the page source for debugging
        page_source = driver.page_source
        with open("page_source.html", "w", encoding="utf-8") as f:
            f.write(page_source)
        logger.info("Saved page source to page_source.html")

        # First try the known working selector
        logger.info("Trying primary selector: .review-text-content span")
        try:
            reviews = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".review-text-content span"))
            )
            review_texts = [review.text.strip() for review in reviews if review.text.strip()]
            if review_texts:
                logger.info(f"Found {len(review_texts)} reviews with primary selector")
                # Save these reviews immediately
                csv_path = Path("amazon_reviews.csv")
                with open(csv_path, "w", newline="", encoding="utf-8") as file:
                    writer = csv.writer(file)
                    writer.writerow(["Review"])
                    for review in review_texts:
                        writer.writerow([review])
                logger.info(f"Saved {len(review_texts)} reviews to {csv_path}")
                driver.quit()
                return review_texts
        except Exception as e:
            logger.error(f"Error with primary selector: {str(e)}")

        # If primary selector fails, try alternative selectors
        review_selectors = [
            "div[data-hook='review']",
            "div[data-hook='review-collapsed']",
            "div[data-hook='review-expanded']",
            "span[data-hook='review-body']",
            "[data-hook='review-body']",
            ".review-text",
            ".a-expander-content",
            ".review-text-content",
            "div.a-expander-content",
            "div[data-hook='review-text']",
            "div[data-hook='review-body']",
            "div[data-hook='review-content']"
        ]

        review_texts = []
        for selector in review_selectors:
            try:
                logger.info(f"Trying alternative selector: {selector}")
                reviews = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
                )
                texts = [review.text.strip() for review in reviews if review.text.strip()]
                if texts:
                    logger.info(f"Found {len(texts)} reviews with selector: {selector}")
                    review_texts.extend(texts)
            except Exception as e:
                logger.error(f"Error with selector {selector}: {str(e)}")

        # Remove duplicates while preserving order
        review_texts = list(dict.fromkeys(review_texts))

        # Save reviews to CSV for debugging
        if review_texts:
            csv_path = Path("amazon_reviews.csv")
            with open(csv_path, "w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                writer.writerow(["Review"])
                for review in review_texts:
                    writer.writerow([review])
            logger.info(f"Saved {len(review_texts)} reviews to {csv_path}")
        else:
            logger.warning("No reviews found with any selector")

        logger.info(f"Found {len(review_texts)} unique reviews")
        driver.quit()
        return review_texts

    except Exception as e:
        logger.error(f"Error in scraping: {str(e)}")
        if 'driver' in locals():
            driver.quit()
        return []
