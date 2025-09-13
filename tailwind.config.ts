import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1600px",
        "4xl": "1920px",
        "5xl": "2560px",
      },
    },
    // Define all screen breakpoints
    screens: {
      // Mobile
      'xs': '475px',      // Small mobile
      'sm': '640px',      // Mobile landscape
      
      // Tablet
      'md': '768px',      // Tablet portrait
      'lg': '1024px',     // Tablet landscape
      
      // Desktop
      'xl': '1280px',     // Small desktop
      '2xl': '1400px',    // Desktop (your current max)
      
      // Large Screens
      '3xl': '1600px',    // Large desktop
      '4xl': '1920px',    // Full HD
      '5xl': '2560px',    // 2K/QHD
      '6xl': '3840px',    // 4K/UHD
      
      // Ultra-wide monitors
      'ultra': '3440px',  // Ultra-wide QHD
      'ultra-4k': '5120px', // Ultra-wide 4K
      
      // Custom breakpoints for specific use cases
      'laptop-lg': '1440px',     // Larger laptops
      'desktop-lg': '1680px',     // Larger desktop monitors
      'cinema': '2048px',         // Cinema displays
      'retina-5k': '5120px',      // 5K Retina displays
      
      // Max width breakpoints (for "up to" queries)
      'max-xs': {'max': '474px'},
      'max-sm': {'max': '639px'},
      'max-md': {'max': '767px'},
      'max-lg': {'max': '1023px'},
      'max-xl': {'max': '1279px'},
      'max-2xl': {'max': '1399px'},
      'max-3xl': {'max': '1599px'},
      'max-4xl': {'max': '1919px'},
      
      // Range breakpoints
      'tablet-only': {'min': '768px', 'max': '1023px'},
      'desktop-only': {'min': '1024px', 'max': '1919px'},
      'mobile-only': {'max': '767px'},
      
      // Portrait/Landscape with size constraints
      'portrait': {'raw': '(orientation: portrait)'},
      'landscape': {'raw': '(orientation: landscape)'},
      'portrait-lg': {'raw': '(orientation: portrait) and (min-width: 1024px)'},
      'landscape-lg': {'raw': '(orientation: landscape) and (min-width: 1024px)'},
    },
    extend: {
      fontFamily: {
        title: ['"General Sans", sans-serif'],
        sans: ['"Instrument Sans", sans-serif'],
        'libre-baskerville': ['"Libre Baskerville"', 'serif'],
      },
      fontSize: {
        // Standard sizes
        '88': ['5.5rem', '1'],
        
        // Responsive hero text sizes using clamp
        'hero-xs': 'clamp(1.875rem, 4vw, 2.5rem)',
        'hero-sm': 'clamp(2.5rem, 5vw, 3rem)',
        'hero-md': 'clamp(3rem, 5.5vw, 3.5rem)',
        'hero-lg': 'clamp(3.5rem, 6vw, 4rem)',
        'hero-xl': 'clamp(4rem, 6.5vw, 5rem)',
        'hero-2xl': 'clamp(5rem, 7vw, 6rem)',
        'hero-3xl': 'clamp(6rem, 8vw, 7rem)',
        'hero-4xl': 'clamp(7rem, 9vw, 8rem)',
        
        // Responsive body text
        'body-xs': 'clamp(0.875rem, 1.2vw, 1rem)',
        'body-sm': 'clamp(1rem, 1.4vw, 1.125rem)',
        'body-md': 'clamp(1.125rem, 1.5vw, 1.25rem)',
        'body-lg': 'clamp(1.25rem, 1.6vw, 1.5rem)',
        
        // Large screen optimized sizes
        'display-1': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-2': ['7rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-3': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      spacing: {
        // Large screen spacing utilities
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '108': '27rem',
        '116': '29rem',
        '124': '31rem',
        '132': '33rem',
        '140': '35rem',
        '148': '37rem',
        '156': '39rem',
        '164': '41rem',
        '172': '43rem',
        '180': '45rem',
        '192': '48rem',
        '200': '50rem',
        '256': '64rem',
      },
      maxWidth: {
        // Extended max-width utilities for large screens
        '8xl': '88rem',    // 1408px
        '9xl': '96rem',    // 1536px
        '10xl': '104rem',  // 1664px
        '11xl': '112rem',  // 1792px
        '12xl': '120rem',  // 1920px
        '13xl': '128rem',  // 2048px
        '14xl': '136rem',  // 2176px
        '15xl': '144rem',  // 2304px
        'full-hd': '1920px',
        '2k': '2560px',
        '4k': '3840px',
        '5k': '5120px',
      },
      width: {
        // Percentage-based widths for large screens
        '1/7': '14.285714%',
        '2/7': '28.571429%',
        '3/7': '42.857143%',
        '4/7': '57.142857%',
        '5/7': '71.428571%',
        '6/7': '85.714286%',
        '1/8': '12.5%',
        '3/8': '37.5%',
        '5/8': '62.5%',
        '7/8': '87.5%',
        '1/9': '11.111111%',
        '2/9': '22.222222%',
        '4/9': '44.444444%',
        '5/9': '55.555556%',
        '7/9': '77.777778%',
        '8/9': '88.888889%',
      },
      height: {
        // Viewport-based heights for large screens
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
        'screen-60': '60vh',
        'screen-50': '50vh',
        'screen-40': '40vh',
        'screen-30': '30vh',
      },
      colors: {
        'laser-primary': 'hsl(var(--laser-primary))',
        'laser-secondary': 'hsl(var(--laser-secondary))',
        'laser-accent': 'hsl(var(--laser-accent))',
        'laser-glow': 'hsl(var(--laser-glow))',
        // Brand color palette - Green/Lime variations
        brand: {
          50: '#e8fcef', // lightest
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#81eea8',
          400: '#41dd7a',
          500: '#22c55d', // primary brand color
          600: '#17a34a',
          700: '#1a8f44',
          800: '#176936',
          900: '#14532d',
          950: '#052e16', // darkest
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: '#9fff59', // bright lime accent for buttons
          foreground: '#052e16', // dark green for contrast
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 15s linear infinite",
      },
      // Grid template columns for large screens
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      // Z-index for complex layouts
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none'
        }
      });
    }
  ],
} satisfies Config;