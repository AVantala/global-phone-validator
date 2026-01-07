import { CountryCode } from "./types";
import countryCodes from "./CountryCodes.json";

const COUNTRY_CODES = countryCodes as CountryCode[];

/**
 * Get country dial code by country code (e.g., "IN" -> "91")
 */
export function getCountryDialCode(countryCode: string): string | null {
  const country = COUNTRY_CODES.find(
    (c) => c.code.toUpperCase() === countryCode.toUpperCase()
  );
  return country ? country.dial_code.replace("+", "") : null;
}

/**
 * Get country code by dial code (e.g., "91" -> CountryCode for India)
 */
export function getCountryCodeByDialCode(dialCode: string): CountryCode | null {
  const normalizedDialCode = dialCode.replace("+", "");
  return (
    COUNTRY_CODES.find(
      (c) => c.dial_code.replace("+", "") === normalizedDialCode
    ) || null
  );
}

/**
 * Find country code from phone number by matching dial codes
 * Returns the longest matching dial code
 */
export function detectCountryFromPhoneNumber(phoneNumber: string): {
  country: CountryCode | null;
  dialCode: string;
  nationalNumber: string;
} {
  const cleaned = phoneNumber.replace(/[^0-9+]/g, "");

  if (!cleaned.startsWith("+")) {
    return { country: null, dialCode: "", nationalNumber: cleaned };
  }

  // Try to match dial codes from longest to shortest (1-4 digits)
  for (let len = 4; len >= 1; len--) {
    const potentialDialCode = cleaned.substring(1, 1 + len);
    const country = getCountryCodeByDialCode(potentialDialCode);

    if (country) {
      const nationalNumber = cleaned.substring(1 + len);
      // Basic sanity check: national number should be at least 4 digits
      if (nationalNumber.length >= 4) {
        return {
          country,
          dialCode: country.dial_code.replace("+", ""),
          nationalNumber,
        };
      }
    }
  }

  return { country: null, dialCode: "", nationalNumber: cleaned.substring(1) };
}

/**
 * Clean phone number by removing spaces, dashes, parentheses, etc.
 */
export function cleanPhoneNumber(input: string): string {
  return input.replace(/\s+/g, "").replace(/[^0-9+]/g, "");
}

/**
 * Get all country codes
 */
export function getAllCountryCodes(): CountryCode[] {
  return COUNTRY_CODES;
}
