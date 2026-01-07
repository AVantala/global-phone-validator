export interface PhoneValidationResult {
  isValid: boolean;
  countryCode?: string; // e.g., '91'
  nationalNumber?: string; // e.g., '9876543210'
  e164?: string; // e.g., '+919876543210'
  isMobile?: boolean; // true if mobile number (currently only for India)
  isFixedLine?: boolean; // true if landline number (currently only for India)
  country?: string; // ISO country code, e.g., 'IN'
  countryName?: string; // Full country name, e.g., 'India'
}

export interface CountryCode {
  name: string;
  dial_code: string; // '+91'
  code: string; // 'IN'
}
