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
      },
    },
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
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
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        halal: {
          DEFAULT: "hsl(var(--halal))",
          bg: "hsl(var(--halal-bg))",
          border: "hsl(var(--halal-border))",
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
        // Custom brand colors
        pink: {
          soft: "hsl(var(--pink-soft))",
          medium: "hsl(var(--pink-medium))",
          deep: "hsl(var(--pink-deep))",
        },
        purple: {
          soft: "hsl(var(--purple-soft))",
          medium: "hsl(var(--purple-medium))",
          deep: "hsl(var(--purple-deep))",
        },
        yellow: {
          soft: "hsl(var(--yellow-soft))",
          medium: "hsl(var(--yellow-medium))",
          deep: "hsl(var(--yellow-deep))",
        },
        cream: "hsl(var(--cream))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        cupcake: "50% 50% 45% 45%",
        lemon: "50% 50% 50% 50% / 60% 60% 40% 40%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-enhanced": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "25%": { transform: "translateY(-10px) rotate(-3deg) scale(1.05)" },
          "50%": { transform: "translateY(-20px) rotate(0deg) scale(1)" },
          "75%": { transform: "translateY(-10px) rotate(3deg) scale(1.05)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "squish": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9, 1.1)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
          "70%": { opacity: "1", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(340 70% 75% / 0.4)" },
          "50%": { boxShadow: "0 0 40px hsl(340 70% 75% / 0.6), 0 0 60px hsl(45 90% 70% / 0.3)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "sparkle-drift": {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "25%": { opacity: "1" },
          "50%": { transform: "translateY(-30px) scale(1.2)" },
          "75%": { opacity: "0.5" },
          "100%": { opacity: "0", transform: "translateY(-60px) scale(0.5)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        "icon-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "float-enhanced": "float-enhanced 4s ease-in-out infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
        "squish": "squish 0.3s ease-in-out",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
        "sparkle-drift": "sparkle-drift 3s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "icon-bounce": "icon-bounce 0.6s ease-in-out infinite",
      },
      boxShadow: {
        'soft': '0 10px 40px -10px hsl(340 50% 70% / 0.3)',
        'card': '0 15px 50px -15px hsl(280 40% 60% / 0.25), 0 5px 20px -5px hsl(340 50% 70% / 0.15)',
        'glow-pink': '0 0 20px hsl(340 70% 75% / 0.4), 0 0 40px hsl(340 70% 75% / 0.2)',
        'glow-yellow': '0 0 20px hsl(45 90% 70% / 0.5), 0 0 40px hsl(45 90% 70% / 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
