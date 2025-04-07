
import Navbar from "@/components/Navbar";
import UrlParser from "@/components/UrlParser";
import SentimentResults from "@/components/SentimentResults";
import PriceTracker from "@/components/PriceTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Review Insight Navigator
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Analyze Amazon product reviews, track sentiment patterns, and monitor price changes to make smarter shopping decisions.
            </p>
          </div>
          
          <UrlParser />
          
          <Tabs defaultValue="sentiment" className="mt-10">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="sentiment" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Sentiment Analysis
              </TabsTrigger>
              <TabsTrigger value="price" className="flex items-center gap-2">
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
      
      <footer className="bg-secondary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Review Insight Navigator. All rights reserved.</p>
            <p className="mt-1">Powered by NLTK, VADER Sentiment Analysis, and ML.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
