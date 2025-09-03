// Import and re-export from validator for convenience
import type { PhotoValidationResult } from '../utils/passportPhotoValidator';
export type { PhotoValidationResult };

export interface PhotoValidationState {
  isValidating: boolean;
  validationResult: PhotoValidationResult | null;
  showValidationDetails: boolean;
}

export interface PhotoRequirement {
  category: string;
  requirements: string[];
}
