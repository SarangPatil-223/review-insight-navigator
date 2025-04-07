
import { useState } from "react";
import { Search, Loader2, Link, Upload, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import FeaturedProducts from "@/components/FeaturedProducts";

const UrlParser = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
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

    // Check if it's an Amazon URL
    if (!url.includes("amazon.com")) {
      toast({
        title: "Unsupported URL",
        description: "Please enter an Amazon product URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Analysis started",
        description: "Your product is being analyzed. Results will appear below.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full border border-white/10 shadow-lg card-hover glass-card">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold gradient-text">Product Analysis</CardTitle>
          <CardDescription className="text-base text-muted-foreground">Enter an Amazon product URL to analyze reviews and track prices</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="bg-secondary/30 p-6 rounded-lg mb-4 text-center border border-white/5">
            <Upload className="h-12 w-12 mx-auto mb-2 text-primary opacity-80" />
            <h3 className="text-lg font-semibold mb-1 text-white">Analyze Any Amazon Product</h3>
            <p className="text-sm text-muted-foreground">Get sentiment analysis and price tracking with a single click</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-url" className="text-sm font-medium text-muted-foreground">
                Product URL
              </Label>
              <div className="relative flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors">
                    <Link className="h-5 w-5" />
                  </div>
                  <Input
                    id="product-url"
                    type="text"
                    placeholder="Paste Amazon product URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 pr-4 py-6 w-full bg-background/50 border-secondary focus:border-primary transition-all"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !url.trim()} 
                  className="h-12 px-6 font-semibold transition-all hover:shadow-md bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Product
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="text-center px-2 py-3">
              <p className="text-sm text-muted-foreground">
                Our AI will analyze reviews, identify key sentiments, and track price history
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <FeaturedProducts />
    </div>
  );
};

export default UrlParser;
