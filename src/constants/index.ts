export const IDP_ESTABLISHMENT_YEAR = 1926;

/**
 * Featured countries configuration for IDP promotion
 * These countries are displayed prominently in the UI
 * Easy to update without changing component logic
 */
export const FEATURED_COUNTRIES = [
  "United States of America",
  "United Kingdom", 
  "Germany",
  "France",
  "Australia",
  "Canada",
  "South Africa",
  "Kenya",
] as const;

// Type for featured country names
export type FeaturedCountryName = typeof FEATURED_COUNTRIES[number];