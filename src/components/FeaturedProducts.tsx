
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DollarSign, Star, ShoppingCart, TrendingDown, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    rating: 4.7,
    price: 149.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    sentiment: "Positive",
    stock: "In Stock"
  },
  {
    id: 2,
    name: "Smart Home Security Camera",
    rating: 4.5,
    price: 89.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    sentiment: "Positive",
    stock: "Low Stock"
  },
  {
    id: 3,
    name: "Ultra HD Smart TV 55\"",
    rating: 4.8,
    price: 699.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1601944179066-29b8f9ead73f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHR2fGVufDB8fDB8fHww",
    sentiment: "Very Positive",
    stock: "In Stock"
  },
  {
    id: 4,
    name: "Pro Fitness Smartwatch",
    rating: 4.6,
    price: 129.99,
    discount: 5,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    sentiment: "Positive",
    stock: "In Stock"
  }
];

const FeaturedProducts = () => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="product-card product-card-hover border border-white/10 bg-secondary/30 overflow-hidden group">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-accent text-white font-medium">
                  {product.discount}% OFF
                </Badge>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-600/20">
                  {product.stock}
                </Badge>
              </div>
            </div>
            
            <CardContent className="pt-4">
              <div className="flex items-center gap-1 mb-1 text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
                <Badge variant="outline" className="ml-2 text-xs bg-green-500/10 text-green-500 border-green-600/20">
                  {product.sentiment}
                </Badge>
              </div>
              <h3 className="font-medium text-base line-clamp-1 mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.discount > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0 flex justify-between">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-green-500" />
                <span>Price dropped recently</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
