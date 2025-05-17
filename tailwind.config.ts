import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration
 * Defines custom theme settings, animations, and colour schemes
 */
export default {
	// Enable dark mode using class strategy
	darkMode: ["class"],
	// Define content paths for Tailwind to scan
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		// Container configuration for responsive layouts
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Custom colour palette using CSS variables
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Trading-specific colours
				trading: {
					buy: '#22c55e',      // Bright green for buy signals
					sell: '#ef4444',     // Bright red for sell signals
					hold: '#f59e0b',     // Bright amber for hold signals
					line: '#3b82f6',     // Bright blue for chart lines
					gridline: '#4b5563', // Dark grey for grid lines
					chartbg: '#0f172a',  // Dark blue for chart background
				},
				// Sidebar-specific colours
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Background colours for different sections
				background: {
					DEFAULT: '#0f172a',     // Dark blue for main background
					secondary: '#1e293b',   // Dark slate for secondary background
				},
				// Text colours for different emphasis levels
				text: {
					primary: '#f8fafc',     // Bright white for primary text
					secondary: '#e2e8f0',   // Bright grey for secondary text
					muted: '#94a3b8',       // Bright slate for muted text
				}
			},
			// Border radius configuration using CSS variables
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Custom keyframe animations
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'fadeIn': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			// Animation configurations
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 0.5s ease-out forwards'
			},
			// Transition property configurations
			transitionProperty: {
				'colors': 'background-color, border-color, color, fill, stroke',
			},
			// Custom box shadow configurations
			boxShadow: {
				'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)',
				'glow': '0 0 15px rgba(59, 130, 246, 0.5)'
			},
			// Background image configurations
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-linear': 'linear-gradient(to right, #1e293b, #0f172a)',
			},
		}
	},
	// Enable animation plugin
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
