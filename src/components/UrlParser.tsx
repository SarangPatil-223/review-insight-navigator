import { useState } from "react";
import { Search, Loader2, Link, Upload, ShoppingBag, ArrowRight, BarChartIcon, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import FeaturedProducts from "@/components/FeaturedProducts";

interface SentimentData {
  vader: {
    positive: number;
    neutral: number;
    negative: number;
  };
  roberta: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const UrlParser = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      new URL(url);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Amazon product URL",
        variant: "destructive",
      });
      return;
    }
  
    if (!url.includes("amazon.com")) {
      toast({
        title: "Unsupported URL",
        description: "Please enter an Amazon product URL",
        variant: "destructive",
      });
      return;
    }
  
    setIsLoading(true);
    setSentiment(null);
  
    try {
      const formData = new FormData();
      formData.append("product_url", url);
  
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received data:", data);
      
      if (data.sentiment_summary) {
        setSentiment(data.sentiment_summary);
        toast({
          title: "Analysis complete",
          description: "Sentiment results fetched successfully!",
        });
      } else {
        throw new Error("No sentiment data received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to analyze product reviews. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const getTotalReviews = (data: SentimentData) => {
    return Object.values(data.vader).reduce((a, b) => a + b, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="w-full border border-white/10 shadow-lg card-hover glass-card">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl md:text-3xl font-bold gradient-text">Product Intelligence Hub</CardTitle>
          <CardDescription className="text-base text-muted-foreground max-w-2xl mx-auto">
            Analyze Amazon product reviews with AI-powered sentiment analysis and track price fluctuations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 bg-secondary/30 p-5 rounded-lg text-center border border-white/5 hover:border-white/10 transition-all">
              <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-3">
                <BarChartIcon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">Sentiment Analysis</h3>
              <p className="text-sm text-muted-foreground">Uncover detailed sentiment patterns in reviews</p>
            </div>
            
            <div className="flex-1 bg-secondary/30 p-5 rounded-lg text-center border border-white/5 hover:border-white/10 transition-all">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">Price Intelligence</h3>
              <p className="text-sm text-muted-foreground">Monitor historical prices to find the best deals</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-url" className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Link className="h-4 w-4" />
                Product URL
              </Label>
              <div className="relative">
                <Input
                  id="product-url"
                  type="text"
                  placeholder="Paste Amazon product URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-4 pr-4 py-6 w-full bg-background/50 border-secondary focus:border-primary focus:ring-primary/20 transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !url.trim()} 
                  className="absolute right-1 top-1 bottom-1 h-auto px-6 font-semibold bg-accent hover:bg-accent/90 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {sentiment && (
              <div className="mt-6 bg-secondary/30 p-6 rounded-lg border border-white/10 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-white">Sentiment Analysis Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-background/20 p-4 rounded-lg border border-white/5">
                    <h4 className="text-md font-medium mb-3 flex items-center">
                      <div className="inline-flex items-center justify-center p-1.5 bg-blue-500/20 rounded-full mr-2">
                        <BarChartIcon className="h-4 w-4 text-blue-400" />
                      </div>
                      VADER Sentiment
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Positive</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-background/30 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(sentiment.vader.positive, getTotalReviews(sentiment))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{calculatePercentage(sentiment.vader.positive, getTotalReviews(sentiment))}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Neutral</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-background/30 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(sentiment.vader.neutral, getTotalReviews(sentiment))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{calculatePercentage(sentiment.vader.neutral, getTotalReviews(sentiment))}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Negative</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-background/30 rounded-full h-2 mr-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(sentiment.vader.negative, getTotalReviews(sentiment))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{calculatePercentage(sentiment.vader.negative, getTotalReviews(sentiment))}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 p-4 rounded-lg border border-white/5">
                    <h4 className="text-md font-medium mb-3 flex items-center">
                      <div className="inline-flex items-center justify-center p-1.5 bg-purple-500/20 rounded-full mr-2">
                        <BarChartIcon className="h-4 w-4 text-purple-400" />
                      </div>
                      RoBERTa Sentiment
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Positive</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-background/30 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(sentiment.roberta.positive, getTotalReviews(sentiment))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{calculatePercentage(sentiment.roberta.positive, getTotalReviews(sentiment))}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Neutral</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-background/30 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(sentiment.roberta.neutral, getTotalReviews(sentiment))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{calculatePercentage(sentiment.roberta.neutral, getTotalReviews(sentiment))}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Negative</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-background/30 rounded-full h-2 mr-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(sentiment.roberta.negative, getTotalReviews(sentiment))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{calculatePercentage(sentiment.roberta.negative, getTotalReviews(sentiment))}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-accent/5 rounded-lg border border-accent/10 px-4 py-3 mt-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-accent/10 p-1.5 mt-0.5">
                  <ShoppingBag className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">How it works</h4>
                  <p className="text-xs text-muted-foreground">
                    Our AI analyzes thousands of reviews, identifies key sentiments, and tracks pricing trends to give you 
                    comprehensive product intelligence before making your purchase decision.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Button variant="outline" className="group">
          View all 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <FeaturedProducts />
    </div>
  );
};

export default UrlParser;