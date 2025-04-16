
import { Shield } from "lucide-react";
import { ButtonEffect } from "@/components/ui/button-effect";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2 bg-white/95 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className={cn(
              "transition-colors duration-300",
              scrolled ? "text-primary" : "text-white"
            )} />
            <span className={cn(
              "font-sora font-bold text-xl transition-colors duration-300",
              scrolled ? "text-slate-800" : "text-white"
            )}>
              HAWA
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#walkthrough" 
              className={cn(
                "font-medium transition-colors duration-300",
                scrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-white"
              )}
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className={cn(
                "font-medium transition-colors duration-300",
                scrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-white"
              )}
            >
              Features
            </a>
            <a 
              href="#why" 
              className={cn(
                "font-medium transition-colors duration-300",
                scrolled ? "text-slate-600 hover:text-primary" : "text-white hover:text-white"
              )}
            >
              Why HAWA
            </a>
            <ButtonEffect size="sm" asChild>
              <Link to="/try-it">Try It 💬</Link>
            </ButtonEffect>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#walkthrough" 
              className="font-medium text-slate-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="font-medium text-slate-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#why" 
              className="font-medium text-slate-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why HAWA
            </a>
            <ButtonEffect size="sm" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
              <Link to="/try-it">Try It 💬</Link>
            </ButtonEffect>
          </nav>
        </div>
      )}
    </header>
  );
}
