import { PhoneValidationResult, CountryCode } from "./types";
import {
  getCountryDialCode,
  cleanPhoneNumber,
  detectCountryFromPhoneNumber,
  getAllCountryCodes,
} from "./utils";
import countryCodes from "./CountryCodes.json";

const COUNTRY_CODES = countryCodes as CountryCode[];

/**
 * Validates phone numbers for any country
 * 
 * @param input - Phone number in various formats (+91..., 0..., or plain digits)
 * @param defaultCountry - ISO country code (e.g., "IN", "US") used when country cannot be detected
 * @param mobileOnly - If true, only accepts mobile numbers (currently only for India)
 * @returns PhoneValidationResult with validation status and parsed information
 * 
 * @example
 * validatePhoneNumber("+91 98765 43210") // India with country code
 * validatePhoneNumber("09876543210") // India with 0 prefix
 * validatePhoneNumber("9876543210", "IN") // India plain digits
 * validatePhoneNumber("+1 555 123 4567") // US number
 */
export function validatePhoneNumber(
  input: string,
  defaultCountry: string = "IN",
  mobileOnly: boolean = false
): PhoneValidationResult {
  if (!input || typeof input !== "string") {
    return { isValid: false };
  }

  const cleaned = cleanPhoneNumber(input);
  
  if (cleaned.length < 7) {
    return { isValid: false };
  }

  let countryCode = "";
  let nationalNumber = "";
  let detectedCountry: CountryCode | null = null;

  // Handle international format with + prefix
  if (cleaned.startsWith("+")) {
    const detection = detectCountryFromPhoneNumber(cleaned);
    if (detection.country) {
      detectedCountry = detection.country;
      countryCode = detection.dialCode;
      nationalNumber = detection.nationalNumber;
    } else {
      return { isValid: false };
    }
  }
  // Handle 0-prefixed numbers (common in many countries)
  else if (cleaned.startsWith("0")) {
    const defaultDialCode = getCountryDialCode(defaultCountry);
    if (!defaultDialCode) {
      return { isValid: false };
    }
    countryCode = defaultDialCode;
    nationalNumber = cleaned.substring(1);
    detectedCountry = COUNTRY_CODES.find(
      (c) => c.code.toUpperCase() === defaultCountry.toUpperCase()
    ) || null;
  }
  // Handle plain digits (assume default country)
  else {
    const defaultDialCode = getCountryDialCode(defaultCountry);
    if (!defaultDialCode) {
      return { isValid: false };
    }
    countryCode = defaultDialCode;
    nationalNumber = cleaned;
    detectedCountry = COUNTRY_CODES.find(
      (c) => c.code.toUpperCase() === defaultCountry.toUpperCase()
    ) || null;
  }

  // Validate national number length (general rule: 4-15 digits)
  if (nationalNumber.length < 4 || nationalNumber.length > 15) {
    return { isValid: false };
  }

  // Country-specific validation
  if (countryCode === "91") {
    // India: must be exactly 10 digits (mobile: 6-9, landline: 0-5)
    if (!/^\d{10}$/.test(nationalNumber)) {
      return { isValid: false };
    }
  } else if (countryCode === "1") {
    // US/Canada: 10 digits (without country code)
    if (!/^\d{10}$/.test(nationalNumber)) {
      return { isValid: false };
    }
  } else {
    // General validation: 4-15 digits
    if (!/^\d{4,15}$/.test(nationalNumber)) {
      return { isValid: false };
    }
  }

  // Mobile/Fixed line detection (India)
  let isMobile: boolean | undefined;
  let isFixedLine: boolean | undefined;
  
  if (countryCode === "91" && nationalNumber.length === 10) {
    const firstDigit = nationalNumber[0];
    // Indian mobile numbers start with 6, 7, 8, or 9
    if ("6789".includes(firstDigit)) {
      isMobile = true;
      isFixedLine = false;
    } else {
      // Landline numbers typically start with 0-5
      isMobile = false;
      isFixedLine = true;
    }
  }

  // If mobileOnly is true, fail non-mobile numbers
  if (mobileOnly && countryCode === "91" && !isMobile) {
    return { isValid: false };
  }

  return {
    isValid: true,
    countryCode,
    nationalNumber,
    e164: `+${countryCode}${nationalNumber}`,
    isMobile,
    isFixedLine,
    country: detectedCountry?.code,
    countryName: detectedCountry?.name,
  };
}

// Export types and utilities
export type { PhoneValidationResult, CountryCode } from "./types";
export { getAllCountryCodes, getCountryDialCode, getCountryCodeByDialCode } from "./utils";
