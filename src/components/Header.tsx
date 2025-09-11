import React from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-accent">
            Bujeti
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8 ml-12">
          <a 
            href="#features" 
            className="text-foreground/80 hover:text-accent transition-colors duration-200 font-medium"
          >
            Features
          </a>
          <a 
            href="#pricing" 
            className="text-foreground/80 hover:text-accent transition-colors duration-200 font-medium"
          >
            Pricing
          </a>
          <a 
            href="#solutions" 
            className="text-foreground/80 hover:text-accent transition-colors duration-200 font-medium"
          >
            Solutions
          </a>
          <a 
            href="#resources" 
            className="text-foreground/80 hover:text-accent transition-colors duration-200 font-medium"
          >
            Resources
          </a>
          <a 
            href="#company" 
            className="text-foreground/80 hover:text-accent transition-colors duration-200 font-medium"
          >
            Company
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-foreground/80 hover:text-accent hover:bg-accent/10 font-medium"
          >
            Sign in
          </Button>
          <Button 
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-6"
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}