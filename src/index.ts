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
  defaultCountry?: string,
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

      // If defaultCountry is provided, validate that detected country matches
      if (defaultCountry) {
        const expectedDialCode = getCountryDialCode(defaultCountry);
        if (expectedDialCode && countryCode !== expectedDialCode) {
          return { isValid: false };
        }
      }
    } else {
      return { isValid: false };
    }
  }
  // Handle 0-prefixed numbers (common in many countries)
  else if (cleaned.startsWith("0")) {
    if (!defaultCountry) {
      return { isValid: false }; // Require defaultCountry for 0-prefixed numbers
    }
    const defaultDialCode = getCountryDialCode(defaultCountry);
    if (!defaultDialCode) {
      return { isValid: false };
    }
    countryCode = defaultDialCode;
    nationalNumber = cleaned.substring(1);
    detectedCountry =
      COUNTRY_CODES.find(
        (c) => c.code.toUpperCase() === defaultCountry.toUpperCase()
      ) || null;
  }
  // Handle plain digits (require defaultCountry)
  else {
    if (!defaultCountry) {
      return { isValid: false }; // Require defaultCountry for plain digits
    }
    const defaultDialCode = getCountryDialCode(defaultCountry);
    if (!defaultDialCode) {
      return { isValid: false };
    }
    countryCode = defaultDialCode;
    nationalNumber = cleaned;
    detectedCountry =
      COUNTRY_CODES.find(
        (c) => c.code.toUpperCase() === defaultCountry.toUpperCase()
      ) || null;
  }

  // Validate national number length (general rule: 4-15 digits)
  if (nationalNumber.length < 4 || nationalNumber.length > 15) {
    return { isValid: false };
  }

  // Country-specific validation rules
  const validationRules: Record<
    string,
    { pattern: RegExp; minLength: number; maxLength: number }
  > = {
    "1": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // US/Canada
    "7": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Russia/Kazakhstan
    "20": { pattern: /^\d{8,10}$/, minLength: 8, maxLength: 10 }, // Egypt
    "27": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // South Africa
    "30": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Greece
    "31": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Netherlands
    "32": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Belgium
    "33": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // France
    "34": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Spain
    "36": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Hungary
    "39": { pattern: /^\d{9,10}$/, minLength: 9, maxLength: 10 }, // Italy
    "40": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Romania
    "41": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Switzerland
    "44": { pattern: /^\d{10,11}$/, minLength: 10, maxLength: 11 }, // UK
    "45": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Denmark
    "46": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Sweden
    "47": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Norway
    "48": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Poland
    "49": { pattern: /^\d{10,11}$/, minLength: 10, maxLength: 11 }, // Germany
    "51": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Peru
    "52": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Mexico
    "53": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Cuba
    "54": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Argentina
    "55": { pattern: /^\d{10,11}$/, minLength: 10, maxLength: 11 }, // Brazil
    "56": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Chile
    "57": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Colombia
    "58": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Venezuela
    "60": { pattern: /^\d{9,10}$/, minLength: 9, maxLength: 10 }, // Malaysia
    "61": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Australia
    "62": { pattern: /^\d{9,11}$/, minLength: 9, maxLength: 11 }, // Indonesia
    "63": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Philippines
    "64": { pattern: /^\d{8,10}$/, minLength: 8, maxLength: 10 }, // New Zealand
    "65": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Singapore
    "66": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Thailand
    "81": { pattern: /^\d{10,11}$/, minLength: 10, maxLength: 11 }, // Japan
    "82": { pattern: /^\d{9,10}$/, minLength: 9, maxLength: 10 }, // South Korea
    "84": { pattern: /^\d{9,10}$/, minLength: 9, maxLength: 10 }, // Vietnam
    "86": { pattern: /^\d{11}$/, minLength: 11, maxLength: 11 }, // China
    "90": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Turkey
    "91": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // India
    "92": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Pakistan
    "93": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Afghanistan
    "94": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Sri Lanka
    "95": { pattern: /^\d{8,10}$/, minLength: 8, maxLength: 10 }, // Myanmar
    "98": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Iran
    "212": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Morocco
    "213": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Algeria
    "234": { pattern: /^\d{10}$/, minLength: 10, maxLength: 10 }, // Nigeria
    "254": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Kenya
    "351": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Portugal
    "352": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Luxembourg
    "353": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Ireland
    "354": { pattern: /^\d{7,9}$/, minLength: 7, maxLength: 9 }, // Iceland
    "358": { pattern: /^\d{6,10}$/, minLength: 6, maxLength: 10 }, // Finland
    "380": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Ukraine
    "420": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Czech Republic
    "421": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Slovakia
    "852": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Hong Kong
    "853": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Macau
    "886": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Taiwan
    "971": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // UAE
    "972": { pattern: /^\d{9}$/, minLength: 9, maxLength: 9 }, // Israel
    "974": { pattern: /^\d{8}$/, minLength: 8, maxLength: 8 }, // Qatar
  };

  const rule = validationRules[countryCode];
  if (rule) {
    // Use country-specific validation
    if (
      nationalNumber.length < rule.minLength ||
      nationalNumber.length > rule.maxLength
    ) {
      return { isValid: false };
    }
    if (!rule.pattern.test(nationalNumber)) {
      return { isValid: false };
    }
  } else {
    // General validation for countries without specific rules: 4-15 digits
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
export {
  getAllCountryCodes,
  getCountryDialCode,
  getCountryCodeByDialCode,
} from "./utils";
