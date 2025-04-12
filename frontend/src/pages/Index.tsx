
import Navbar from "@/components/Navbar";
import UrlParser from "@/components/UrlParser";
import SentimentResults from "@/components/SentimentResults";
import PriceTracker from "@/components/PriceTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChartIcon, DollarSign, ArrowUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                AI-Powered Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Review Insight Navigator
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Analyze Amazon product reviews, track sentiment patterns, and monitor price changes to make smarter shopping decisions.
            </p>
          </div>
          
          <UrlParser />
          
          <Tabs defaultValue="sentiment" className="mt-14">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/40 p-1">
              <TabsTrigger value="sentiment" className="flex items-center gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-white">
                <BarChartIcon className="h-4 w-4" />
                Sentiment Analysis
              </TabsTrigger>
              <TabsTrigger value="price" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
                <DollarSign className="h-4 w-4" />
                Price Tracking
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sentiment">
              <SentimentResults />
            </TabsContent>
            
            <TabsContent value="price">
              <PriceTracker />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-black py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BarChartIcon className="h-6 w-6 text-accent mr-2" />
                <span className="text-xl font-bold gradient-text">ReviewInsight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making online shopping smarter with AI-powered review analysis and price intelligence.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-accent">Sentiment Analysis</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent">Price Tracking</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent">Product Comparison</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent">Deal Alerts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-accent">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2025 Review Insight Navigator. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-2 md:mt-0">Powered by NLTK, VADER Sentiment Analysis, and ML.</p>
          </div>
        </div>
      </footer>
      
      <a 
        href="#" 
        className="fixed bottom-4 right-4 p-3 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-all"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  );
};

export default Index;
