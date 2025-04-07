
import Navbar from "@/components/Navbar";
import { Heart, Trash2, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Wishlist = () => {
  const { toast } = useToast();
  
  // Sample wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      rating: 4.5,
      image: "https://placehold.co/300x300/333/white?text=Headphones",
      discount: 15,
    },
    {
      id: 2,
      name: "Ultra HD Smart TV 55-inch",
      price: 699.99,
      rating: 4.8,
      image: "https://placehold.co/300x300/333/white?text=TV",
      discount: 0,
    },
    {
      id: 3,
      name: "Professional Blender with Multiple Settings",
      price: 89.99,
      rating: 4.2,
      image: "https://placehold.co/300x300/333/white?text=Blender",
      discount: 10,
    },
  ];

  const handleRemove = (id: number) => {
    toast({
      title: "Item removed",
      description: "Product has been removed from your wishlist",
    });
  };

  const handleAddToCart = (id: number) => {
    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
    });
  };

  const handleClearAll = () => {
    toast({
      title: "Wishlist cleared",
      description: "All products have been removed from your wishlist",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <Heart className="mr-2 h-6 w-6 text-accent" /> My Wishlist
            </h1>
            {wishlistItems.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-muted-foreground hover:text-white">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            )}
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden glass-card card-hover">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 h-40 bg-secondary/40 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center text-yellow-500">
                                  {'★'.repeat(Math.floor(item.rating))}
                                  {'☆'.repeat(5 - Math.floor(item.rating))}
                                </div>
                                <span className="ml-2 text-sm text-muted-foreground">({item.rating})</span>
                              </div>
                            </div>
                            <div className="text-right">
                              {item.discount > 0 && (
                                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                                  {item.discount}% OFF
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            {item.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                                <span className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleRemove(item.id)}>
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                            <Button size="sm" onClick={() => handleAddToCart(item.id)}>
                              <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center p-4 bg-secondary/40 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Find products you love and add them to your wishlist</p>
              <Button onClick={() => window.location.href = "/"}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
