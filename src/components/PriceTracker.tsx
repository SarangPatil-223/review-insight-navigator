
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, DollarSign, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample price history data
const priceHistoryData = [
  { date: "Jan", price: 149.99 },
  { date: "Feb", price: 159.99 },
  { date: "Mar", price: 154.99 },
  { date: "Apr", price: 149.99 },
  { date: "May", price: 144.99 },
  { date: "Jun", price: 139.99 },
  { date: "Jul", price: 149.99 },
  { date: "Aug", price: 129.99 },
];

// Sample competitor data
const competitorData = [
  { store: "Competitor A", price: 139.99, difference: -10.00 },
  { store: "Competitor B", price: 154.99, difference: 5.00 },
  { store: "Competitor C", price: 144.99, difference: -5.00 },
];

const PriceTracker = () => {
  const currentPrice = 149.99;
  const lowestPrice = 129.99;
  const highestPrice = 159.99;
  const averagePrice = priceHistoryData.reduce((sum, item) => sum + item.price, 0) / priceHistoryData.length;
  
  // Calculate if current price is a good deal
  const isGoodDeal = currentPrice <= averagePrice;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Price Overview */}
      <Card className="card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Price Overview</CardTitle>
          <CardDescription>Current Amazon price and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline mb-4">
            <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
            <span className="text-3xl font-bold">{currentPrice}</span>
            {isGoodDeal ? (
              <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-600/20">
                Good Deal
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-2 bg-yellow-500/10 text-yellow-500 border-yellow-600/20">
                Above Average
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Lowest</p>
              <p className="text-lg font-medium flex items-center">
                <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                ${lowestPrice}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average</p>
              <p className="text-lg font-medium">${averagePrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest</p>
              <p className="text-lg font-medium flex items-center">
                <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                ${highestPrice}
              </p>
            </div>
          </div>
          
          {currentPrice === lowestPrice ? (
            <div className="flex items-center p-3 bg-green-900/20 text-green-400 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              This is the lowest price we've tracked for this product!
            </div>
          ) : (
            <div className="flex items-center p-3 bg-blue-900/20 text-blue-400 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              This product was ${(currentPrice - lowestPrice).toFixed(2)} cheaper on {priceHistoryData.find(item => item.price === lowestPrice)?.date}.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price History Chart */}
      <Card className="card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Price History</CardTitle>
          <CardDescription>Historical price data over time</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value}`}
                stroke="#999"
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, "Price"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ background: '#222', border: '1px solid #333' }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#0ea5e9" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitor Pricing */}
      <Card className="md:col-span-2 card-hover border border-white/10 bg-secondary/30">
        <CardHeader>
          <CardTitle>Competitor Pricing</CardTitle>
          <CardDescription>Compare prices across different retailers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
              <div className="font-medium">Amazon</div>
              <div className="font-bold">${currentPrice}</div>
            </div>
            
            {competitorData.map((competitor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-white/5 rounded-md bg-background/20">
                <div className="font-medium">{competitor.store}</div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">${competitor.price}</span>
                  {competitor.difference < 0 ? (
                    <Badge className="bg-green-500/10 text-green-500 border-green-600/20">
                      ${Math.abs(competitor.difference).toFixed(2)} cheaper
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-500 border-red-600/20">
                      ${competitor.difference.toFixed(2)} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceTracker;
