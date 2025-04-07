
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Paste Amazon product URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 pr-4 py-6 w-full"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !url.trim()} 
              className="h-12 px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Product"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlParser;
