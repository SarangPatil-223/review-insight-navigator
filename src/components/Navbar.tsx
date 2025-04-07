
import { useState } from "react";
import { Menu, X, BarChart2, DollarSign, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <BarChart2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">ReviewInsight</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <BarChart2 size={18} />
              <span>Sentiment Analysis</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <DollarSign size={18} />
              <span>Price Tracking</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Heart size={18} />
              <span>Saved Items</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="-mr-2">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-secondary">
              <div className="flex items-center gap-2">
                <Home size={18} />
                <span>Home</span>
              </div>
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-secondary">
              <div className="flex items-center gap-2">
                <BarChart2 size={18} />
                <span>Sentiment Analysis</span>
              </div>
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-secondary">
              <div className="flex items-center gap-2">
                <DollarSign size={18} />
                <span>Price Tracking</span>
              </div>
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-secondary">
              <div className="flex items-center gap-2">
                <Heart size={18} />
                <span>Saved Items</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
