
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { User, Mail, Phone, MapPin, Save, ShoppingBag, Clock, Heart, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64">
              <Card className="glass-card sticky top-20">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://placehold.co/200x200/333/white?text=JD" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-sm text-muted-foreground mb-4">john.doe@example.com</p>
                  <Separator className="mb-4 bg-white/10" />
                  
                  <nav className="w-full">
                    <ul className="space-y-1 w-full text-left">
                      <li>
                        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-white">
                          <User className="h-4 w-4" /> Profile
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-muted-foreground">
                          <ShoppingBag className="h-4 w-4" /> Orders
                        </a>
                      </li>
                      <li>
                        <a href="/wishlist" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-muted-foreground">
                          <Heart className="h-4 w-4" /> Wishlist
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-muted-foreground">
                          <Clock className="h-4 w-4" /> Recently Viewed
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-muted-foreground">
                          <CreditCard className="h-4 w-4" /> Payment Methods
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-muted-foreground">
                          <Settings className="h-4 w-4" /> Settings
                        </a>
                      </li>
                      <Separator className="my-2 bg-white/10" />
                      <li>
                        <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 text-muted-foreground">
                          <LogOut className="h-4 w-4" /> Sign Out
                        </a>
                      </li>
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">My Account</h1>
              
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/40 p-1">
                  <TabsTrigger value="profile" className="flex items-center gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-white">
                    <User className="h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-white">
                    <ShoppingBag className="h-4 w-4" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="flex items-center gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-white">
                    <MapPin className="h-4 w-4" />
                    Addresses
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Personal Information</CardTitle>
                          <CardDescription>Update your personal details here</CardDescription>
                        </div>
                        {!isEditing && (
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            Edit Profile
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="firstName" 
                                className="pl-10" 
                                defaultValue="John"
                                readOnly={!isEditing}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              defaultValue="Doe"
                              readOnly={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="email" 
                                type="email" 
                                className="pl-10" 
                                defaultValue="john.doe@example.com"
                                readOnly={!isEditing}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="phone" 
                                className="pl-10" 
                                defaultValue="+1 (555) 123-4567"
                                readOnly={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    {isEditing && (
                      <CardFooter className="flex justify-end space-x-2">
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View and track your orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">When you place orders, they will appear here</p>
                        <Button onClick={() => window.location.href = "/"}>
                          Start Shopping
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="addresses">
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Saved Addresses</CardTitle>
                          <CardDescription>Manage your shipping addresses</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          Add New Address
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
                        <p className="text-muted-foreground mb-4">Add a shipping address to speed up checkout</p>
                        <Button variant="outline">
                          Add Address
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
