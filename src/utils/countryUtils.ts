import { eligibleCountriesData } from '../data/eligibleCountriesData';
import { FEATURED_COUNTRIES, type FeaturedCountryName } from '../constants';

/**
 * Country data interface
 */
export interface CountryData {
  continent: string;
  country: string;
  years: number[];
  flag: string;
}

/**
 * Safely retrieves featured countries from the eligible countries data
 * Filters out any countries that might not exist in the data
 * 
 * @param maxCount Optional maximum number of featured countries to return
 * @returns Array of featured country data objects
 */
export const getFeaturedCountries = (maxCount?: number): CountryData[] => {
  const featuredCountries = FEATURED_COUNTRIES.map(countryName => 
    eligibleCountriesData.find(country => country.country === countryName)
  ).filter((country): country is CountryData => country !== undefined);

  return maxCount ? featuredCountries.slice(0, maxCount) : featuredCountries;
};

/**
 * Gets a specific featured country by name
 * 
 * @param countryName The name of the country to retrieve
 * @returns Country data or undefined if not found
 */
export const getFeaturedCountry = (countryName: FeaturedCountryName): CountryData | undefined => {
  return eligibleCountriesData.find(country => country.country === countryName);
};

/**
 * Validates if a country is in the featured list
 * 
 * @param countryName The country name to check
 * @returns True if the country is featured
 */
export const isFeaturedCountry = (countryName: string): countryName is FeaturedCountryName => {
  return FEATURED_COUNTRIES.includes(countryName as FeaturedCountryName);
};

/**
 * Gets the list of featured country names
 * 
 * @returns Array of featured country names
 */
export const getFeaturedCountryNames = (): readonly FeaturedCountryName[] => {
  return FEATURED_COUNTRIES;
};
