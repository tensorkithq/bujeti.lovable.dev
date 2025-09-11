import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <svg 
              className="w-8 h-8" 
              viewBox="0 0 1125 1125"
              fill="none"
            >
              <path d="M479.34 717.11s12.56 98.77 94.03 180.24c82.97 82.97 167.21 81.02 167.21 81.02l-131.39 131.38s-86.95-9.04-172.16-94.24c-74.64-74.64-89.08-167.01-89.08-167.01l131.39-131.38Zm175.42-5.69s91.82 38.51 203.1 8.69c113.34-30.37 153.77-104.3 153.77-104.3l48.09 179.48s-51.3 70.79-167.7 101.97c-101.95 27.32-189.18-6.36-189.18-6.36l-48.09-179.48Zm82.78-154.76s79.26-60.27 109.08-171.55c30.37-113.34-13.44-185.32-13.44-185.32l179.47 48.09s35.65 79.82 4.46 196.22c-27.32 101.95-100.1 160.65-100.1 160.65l-179.47-48.09ZM644.9 407.59s-12.56-98.77-94.03-180.24c-82.97-82.97-167.21-81.02-167.21-81.02L515.04 14.95s86.95 9.04 172.16 94.24c74.64 74.64 89.08 167.01 89.08 167.01L644.89 407.58Zm-175.42 5.69s-91.82-38.51-203.1-8.69c-113.34 30.37-153.77 104.3-153.77 104.3L64.52 329.41s51.3-70.79 167.7-101.97c101.95-27.32 189.18 6.36 189.18 6.36l48.09 179.48ZM386.7 568.04s-79.26 60.27-109.08 171.55c-30.37 113.34 13.44 185.32 13.44 185.32l-179.47-48.09S75.94 797 107.13 680.6c27.32-101.95 100.1-160.65 100.1-160.65l179.47 48.09Z" fill="#9fff59"/>
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
        <div className="flex items-center  ">
          <Button variant="outline" size="sm" className="hover:bg-gray-500/30 hover:text-gray-50">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;