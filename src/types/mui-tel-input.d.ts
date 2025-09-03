declare module 'mui-tel-input' {
  import { TextFieldProps } from '@mui/material';

  export interface MuiTelInputInfo {
    countryCode?: string;
    countryCallingCode?: string;
    nationalNumber?: string;
    numberType?: string;
    error?: boolean;
    errorMessage?: string;
  }

  export interface MuiTelInputProps extends Omit<TextFieldProps, 'onChange'> {
    value: string;
    onChange: (value: string, info?: MuiTelInputInfo) => void;
    defaultCountry?: string;
    forceCallingCode?: boolean;
    onlyCountries?: string[];
    excludedCountries?: string[];
    preferredCountries?: string[];
    langOfCountryName?: string;
    continents?: string[];
    focusOnSelectCountry?: boolean;
  }

  export function matchIsValidTel(value: string): boolean;
  
  export const MuiTelInput: React.FC<MuiTelInputProps>;
  export default MuiTelInput;
}