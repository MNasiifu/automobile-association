import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Development and production CORS origins
const getDevelopmentCorsOrigins = () => [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173', // Vite preview server
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4173'
]

const getProductionCorsOrigins = () => [
  'https://aauganda.co.ug',
  'https://www.aauganda.co.ug',
  'https://automobile-association.vercel.app'
]

// Environment-based CORS configuration
const getCorsConfig = (mode: string) => {
  const isDevelopment = mode === 'development'
  
  return {
    // Only allow production origins in production builds
    // Development server should only accept local origins for security
    origin: isDevelopment ? getDevelopmentCorsOrigins() : getProductionCorsOrigins(),
    
    // Only enable credentials when necessary and in secure contexts
    credentials: !isDevelopment, // Disable credentials in development for security
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'apikey' // For Supabase API key
    ],
    
    // Security headers
    optionsSuccessStatus: 200, // For legacy browser support
    maxAge: isDevelopment ? 0 : 86400 // Cache preflight for 24h in production
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  optimizeDeps: {
    include: ['@emotion/styled']
  },
  server: {
    // Development server configuration
    cors: getCorsConfig(mode),
    
    // Additional security for development server
    host: '127.0.0.1', // Restrict to localhost only
    strictPort: true, // Don't auto-increment port if busy
    
    // Headers for additional security
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  
  // Production build optimizations
  build: {
    // Security-focused build options
    sourcemap: mode === 'development', // Only generate sourcemaps in development
    minify: mode === 'production' ? 'esbuild' : false,
    
    // Remove console logs in production
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    } : undefined
  }
}))
