/**
 * Security Configuration Utility
 * Centralizes security-related settings and environment checks
 */

// Environment detection
export const isDevelopment = import.meta.env.MODE === 'development'
export const isProduction = import.meta.env.MODE === 'production'

// CORS Origins Configuration
export const CORS_ORIGINS = {
  development: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:4173'
  ],
  production: [
    'https://aau.co.ug',
    'https://www.aau.co.ug',
    'https://automobile-association.vercel.app'
  ]
} as const

// Security Headers
export const SECURITY_HEADERS = {
  'Content-Security-Policy': isDevelopment 
    ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:* http://127.0.0.1:* https://*.supabase.co https://*.supabase.io; img-src 'self' data: blob: https:; media-src 'self' data: blob:;"
    : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://aau.co.ug https://automobile-association.vercel.app https://*.supabase.co https://*.supabase.io;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
} as const

// Validate current origin against allowed origins
export const isAllowedOrigin = (origin: string): boolean => {
  const allowedOrigins: readonly string[] = isDevelopment 
    ? CORS_ORIGINS.development 
    : CORS_ORIGINS.production
  
  return (allowedOrigins as string[]).includes(origin)
}

// Environment-specific API configurations
export const API_CONFIG = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
  baseUrl: import.meta.env.VITE_API_BASE_URL || (
    isDevelopment 
      ? 'http://localhost:5173' 
      : (typeof window !== 'undefined' && window.location.origin === 'https://automobile-association.vercel.app')
        ? 'https://automobile-association.vercel.app'
        : 'https://aau.co.ug'
  ),
  enableDebug: isDevelopment && import.meta.env.VITE_ENABLE_DEBUG === 'true',
  enableConsoleLogs: isDevelopment && import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true'
} as const

// Security validation functions
export const validateEnvironmentVariables = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!API_CONFIG.supabaseUrl) {
    errors.push('VITE_SUPABASE_URL is required')
  }
  
  if (!API_CONFIG.supabaseKey) {
    errors.push('VITE_SUPABASE_KEY is required')
  }
  
  // Validate Supabase URL format
  if (API_CONFIG.supabaseUrl && !API_CONFIG.supabaseUrl.startsWith('https://')) {
    errors.push('VITE_SUPABASE_URL must use HTTPS')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Console logging wrapper that respects environment settings
export const secureLog = {
  info: (...args: any[]) => {
    if (API_CONFIG.enableConsoleLogs) {
      console.info(...args)
    }
  },
  warn: (...args: any[]) => {
    if (API_CONFIG.enableConsoleLogs) {
      console.warn(...args)
    }
  },
  error: (...args: any[]) => {
    // Always log errors, even in production
    console.error(...args)
  },
  debug: (...args: any[]) => {
    if (API_CONFIG.enableDebug) {
      console.debug(...args)
    }
  }
}

// Origin validation for client-side CORS checks
export const validateOrigin = (): boolean => {
  // Allow validation to pass during SSR or when window is not available
  if (typeof window === 'undefined') {
    return true
  }
  
  const currentOrigin = window.location.origin
  const isValid = isAllowedOrigin(currentOrigin)
  
  // Log validation attempts for debugging
  if (!isValid) {
    secureLog.error(`Origin validation failed for: ${currentOrigin}`)
    secureLog.error(`Allowed origins for ${isDevelopment ? 'development' : 'production'}:`, 
      isDevelopment ? CORS_ORIGINS.development : CORS_ORIGINS.production)
  }
  
  return isValid
}

export default {
  isDevelopment,
  isProduction,
  CORS_ORIGINS,
  SECURITY_HEADERS,
  API_CONFIG,
  isAllowedOrigin,
  validateEnvironmentVariables,
  secureLog,
  validateOrigin
}
