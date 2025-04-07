
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { toast } = useToast();
  
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      quantity: 1,
      image: "https://placehold.co/300x300/333/white?text=Headphones",
    },
    {
      id: 2,
      name: "Ultra HD Smart TV 55-inch",
      price: 699.99,
      quantity: 1,
      image: "https://placehold.co/300x300/333/white?text=TV",
    },
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart",
    });
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment gateway...",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6 text-accent" /> Shopping Cart
            </h1>
            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden glass-card">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-32 h-32 bg-secondary/40 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-xl font-bold mt-1">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemove(item.id)}
                                className="text-muted-foreground hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="glass-card sticky top-20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2 bg-white/10" />
                      <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center p-4 bg-secondary/40 rounded-full mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet</p>
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

export default Cart;
