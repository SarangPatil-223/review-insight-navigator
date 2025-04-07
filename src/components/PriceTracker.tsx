
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ChevronDown, ChevronUp, Bell, AlertTriangle, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const PriceTracker = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [period, setPeriod] = useState("30d");
  
  // Sample product data with price history
  const product = {
    name: "Noise Cancelling Headphones XZ-400",
    currentPrice: 149.99,
    previousPrice: 199.99,
    lowestPrice: 129.99,
    highestPrice: 249.99,
    discount: 25,
    rating: 4.7,
    reviews: 1243,
    inStock: true,
    priceChange: -10.5,
    priceHistory: [
      { date: '2024-03-01', price: 249.99 },
      { date: '2024-03-10', price: 229.99 },
      { date: '2024-03-15', price: 199.99 },
      { date: '2024-03-20', price: 189.99 },
      { date: '2024-03-25', price: 169.99 },
      { date: '2024-04-01', price: 149.99 },
    ],
    priceAlerts: [
      { id: 1, threshold: 139.99, status: 'active' },
    ]
  };
  
  // Calculate price difference and percentage
  const priceDiff = product.currentPrice - product.previousPrice;
  const priceDiffPercentage = (priceDiff / product.previousPrice) * 100;
  
  const handleTrackPrice = () => {
    setTrackingEnabled(true);
  };
  
  const isPriceDropping = product.currentPrice < product.previousPrice;
  const isGoodTimeToBuy = product.currentPrice <= (product.lowestPrice * 1.1); // Within 10% of lowest price
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Price Card */}
        <Card className="md:col-span-2 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-primary" /> Current Price
            </CardTitle>
            <CardDescription>Latest price data for this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2">
              <div>
                <p className="text-4xl font-bold mb-1">${product.currentPrice}</p>
                <div className={`flex items-center ${isPriceDropping ? 'text-green-500' : 'text-red-500'}`}>
                  {isPriceDropping ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronUp className="h-4 w-4 mr-1" />}
                  <span className="font-medium">${Math.abs(priceDiff).toFixed(2)}</span>
                  <span className="text-sm ml-1">({Math.abs(priceDiffPercentage).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-sm text-muted-foreground mb-1">Previous: <span className="line-through">${product.previousPrice}</span></p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Lowest: ${product.lowestPrice}</span>
                  <span className="ml-4">Highest: ${product.highestPrice}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-4 rounded-lg mt-4">
              <div className="flex items-start mb-2">
                <div className={`p-2 rounded-full ${isGoodTimeToBuy ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'} mr-3`}>
                  {isGoodTimeToBuy ? <ShoppingCart className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-medium">{isGoodTimeToBuy ? 'Good time to buy!' : 'Consider waiting'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {isGoodTimeToBuy 
                      ? 'Current price is close to the lowest recorded price for this product.'
                      : 'The price has been lower in the past. Setting up a price alert might be a good idea.'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {!trackingEnabled ? (
              <Button onClick={handleTrackPrice} className="w-full">
                <Bell className="mr-2 h-4 w-4" /> Track Price
              </Button>
            ) : (
              <div className="w-full bg-secondary/30 p-3 rounded-lg text-center text-sm">
                <span className="text-accent font-medium">Price tracking enabled!</span> We'll notify you of any price changes.
              </div>
            )}
          </CardFooter>
        </Card>
        
        {/* Price Alert Card */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Bell className="h-5 w-5 mr-1 text-accent" /> Price Alerts
            </CardTitle>
            <CardDescription>Get notified when price drops</CardDescription>
          </CardHeader>
          <CardContent>
            {product.priceAlerts.length > 0 ? (
              <div>
                {product.priceAlerts.map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium">${alert.threshold}</p>
                      <p className="text-xs text-muted-foreground">Alert will trigger when price drops below this value</p>
                    </div>
                    <Badge variant="outline" className="capitalize">{alert.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Bell className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No price alerts set up yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Set New Alert
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Price History Chart */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl">Price History</CardTitle>
              <CardDescription>Historical price data for this product</CardDescription>
            </div>
            <Tabs defaultValue={period} className="w-full sm:w-auto mt-4 sm:mt-0">
              <TabsList className="grid grid-cols-3 w-full sm:w-[200px]">
                <TabsTrigger value="30d" onClick={() => setPeriod("30d")}>30D</TabsTrigger>
                <TabsTrigger value="90d" onClick={() => setPeriod("90d")}>90D</TabsTrigger>
                <TabsTrigger value="1y" onClick={() => setPeriod("1y")}>1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={product.priceHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 20', 'dataMax + 20']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Price']}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3182CE" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Price Comparison */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Retailer Price Comparison</CardTitle>
          <CardDescription>Compare prices across different retailers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { retailer: 'Amazon', price: 149.99, shipping: 0, total: 149.99, inStock: true },
              { retailer: 'Best Buy', price: 159.99, shipping: 0, total: 159.99, inStock: true },
              { retailer: 'Walmart', price: 154.99, shipping: 5.99, total: 160.98, inStock: false },
              { retailer: 'Target', price: 169.99, shipping: 0, total: 169.99, inStock: true },
            ].map((retailer, index) => (
              <div key={index} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg ${index === 0 ? 'bg-accent/10 border border-accent/20' : 'bg-secondary/30'}`}>
                <div className="mb-3 sm:mb-0">
                  <p className="font-medium">{retailer.retailer}</p>
                  {index === 0 && <span className="text-xs text-accent">Best Price</span>}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex flex-col">
                    <p className="font-medium">${retailer.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      {retailer.shipping === 0 ? 'Free shipping' : `+$${retailer.shipping} shipping`}
                    </p>
                  </div>
                  <div className="sm:w-24 text-right sm:text-center">
                    <p className={`text-sm ${retailer.inStock ? 'text-green-500' : 'text-red-500'}`}>
                      {retailer.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <Button size="sm" variant={index === 0 ? "default" : "outline"} className="sm:w-24">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Missing import
const Badge = ({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) => {
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${className} ${
      variant === 'outline' ? 'border' : 'bg-primary text-white'
    }`}>
      {children}
    </span>
  );
};

export default PriceTracker;
