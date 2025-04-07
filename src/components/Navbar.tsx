
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BarChartIcon, DollarSign, Heart, Home, ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BarChartIcon className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold gradient-text">ReviewInsight</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {searchOpen ? (
              <div className="relative flex items-center">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-60 pl-9 pr-4 py-1.5 bg-secondary/40 border-none focus:ring-accent"
                  autoFocus
                />
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 h-6 w-6" 
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <Search size={18} />
              </Button>
            )}
            
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/">
                <Home size={18} />
                <span>Home</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/products">
                <BarChartIcon size={18} />
                <span>Analysis</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/products">
                <DollarSign size={18} />
                <span>Pricing</span>
              </Link>
            </Button>
            
            <div className="flex items-center ml-2 space-x-1">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/wishlist">
                  <Heart size={18} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">3</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart size={18} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">2</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/account">
                  <User size={18} />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="mr-1">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative mr-1" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">2</span>
              </Link>
            </Button>
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden py-2 px-1">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full pl-9 py-1.5 bg-secondary/40 border-none focus:ring-accent"
                autoFocus
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/5">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/products" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/5">
              <BarChartIcon size={18} />
              <span>Sentiment Analysis</span>
            </Link>
            <Link to="/products" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/5">
              <DollarSign size={18} />
              <span>Price Tracking</span>
            </Link>
            <Link to="/wishlist" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/5">
              <Heart size={18} />
              <span>Saved Items</span>
            </Link>
            <Link to="/account" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/5">
              <User size={18} />
              <span>Account</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
