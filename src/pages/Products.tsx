
import Navbar from "@/components/Navbar";
import { Filter, Search, Grid3X3, List, BarChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      rating: 4.5,
      image: "https://placehold.co/400x400/333/white?text=Headphones",
      category: "Electronics",
      discount: 15,
      reviews: 329,
    },
    {
      id: 2,
      name: "Ultra HD Smart TV 55-inch",
      price: 699.99,
      rating: 4.8,
      image: "https://placehold.co/400x400/333/white?text=TV",
      category: "Electronics",
      discount: 0,
      reviews: 542,
    },
    {
      id: 3,
      name: "Professional Blender with Multiple Settings",
      price: 89.99,
      rating: 4.2,
      image: "https://placehold.co/400x400/333/white?text=Blender",
      category: "Kitchen",
      discount: 10,
      reviews: 198,
    },
    {
      id: 4,
      name: "Memory Foam Pillow",
      price: 49.99,
      rating: 4.7,
      image: "https://placehold.co/400x400/333/white?text=Pillow",
      category: "Home",
      discount: 0,
      reviews: 421,
    },
    {
      id: 5,
      name: "Professional DSLR Camera",
      price: 899.99,
      rating: 4.9,
      image: "https://placehold.co/400x400/333/white?text=Camera",
      category: "Electronics",
      discount: 5,
      reviews: 156,
    },
    {
      id: 6,
      name: "Ergonomic Office Chair",
      price: 249.99,
      rating: 4.4,
      image: "https://placehold.co/400x400/333/white?text=Chair",
      category: "Furniture",
      discount: 0,
      reviews: 287,
    },
  ];

  const categories = ["All Categories", "Electronics", "Kitchen", "Home", "Furniture"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <BarChartIcon className="mr-2 h-6 w-6 text-accent" /> Product Analysis
            </h1>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <div className="flex space-x-2">
                <Select defaultValue="All Categories">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-white/10 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none rounded-l-md"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-10 bg-white/10" />
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-none rounded-r-md"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              <Badge variant="outline" className="flex items-center justify-center py-2 glass-card">
                <Filter className="mr-1 h-3 w-3" /> Filters
              </Badge>
              {["Electronics", "Best Sellers", "On Sale", "Free Shipping"].map((filter) => (
                <Badge key={filter} variant="outline" className="flex items-center justify-center py-2 glass-card">
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Products grid */}
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {products.map((product) => (
              <Card key={product.id} className={`overflow-hidden glass-card product-card-hover ${viewMode === "list" ? "flex" : ""}`}>
                <CardContent className="p-0">
                  <div className={viewMode === "list" ? "flex" : ""}>
                    <div className={`${viewMode === "list" ? "w-48 flex-shrink-0" : "w-full"} h-48 sm:h-64 bg-secondary/40 relative overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col" : ""}`}>
                      <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-500 text-sm">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({product.rating}) · {product.reviews} reviews
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary/40">
                          {product.category}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between mt-auto ${viewMode === "list" ? "mt-auto" : ""}`}>
                        <div>
                          {product.discount > 0 ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="ml-2">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
