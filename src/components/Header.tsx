import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <svg 
              className="w-8 h-8 text-foreground" 
              viewBox="0 0 36 36" 
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <path d="M6.5,9.5A1.5,1.5,0,1,1,8,8,1.5,1.5,0,0,1,6.5,9.5Z" />
              <path d="M14.33,10a5,5,0,0,1,7.34,0H31V6H5v4Z" />
              <path d="M29.5,9.5A1.5,1.5,0,1,1,31,8,1.5,1.5,0,0,1,29.5,9.5Z" />
              <path d="M27.68,11.66A9,9,0,1,1,24.05,8.6L25.48,7.2a11,11,0,1,0,3.64,3.49Z" />
              <path d="M18.89,18.41l1.74-2a1,1,0,1,0-1.51-1.32L18,16.43l-1.12-1.33a1,1,0,1,0-1.51,1.32l1.74,2L15.15,20a1,1,0,0,0,.19,1.4,1,1,0,0,0,1.4-.2L18,19.36l1.26,1.81a1,1,0,0,0,1.4.21A1,1,0,0,0,21,20Z" />
            </svg>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Product
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Resources
            </a>
          </nav>
        </div>

        {/* Sign In Button */}
        <div className="flex items-center">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;