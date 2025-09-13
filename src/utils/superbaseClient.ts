import { createClient } from "@supabase/supabase-js";
import { API_CONFIG, validateEnvironmentVariables, secureLog } from "./securityConfig";

// Validate environment variables on initialization
const validation = validateEnvironmentVariables();
if (!validation.isValid) {
  const errorMessage = `Supabase configuration error: ${validation.errors.join(', ')}`;
  secureLog.error(errorMessage);
  throw new Error(errorMessage);
}

const supabase = createClient(API_CONFIG.supabaseUrl!, API_CONFIG.supabaseKey!, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Enhanced security for auth
    storageKey: 'aau-auth-token',
    storage: window.localStorage,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
  // Enhanced security configuration
  db: {
    schema: 'public',
  },
  // Only enable real-time in development or when explicitly needed
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Add auth state change listener for security logging
supabase.auth.onAuthStateChange((event, session) => {
  secureLog.info(`Auth state changed: ${event}`, session?.user?.id ? 'User logged in' : 'User logged out');
});

export default supabase;