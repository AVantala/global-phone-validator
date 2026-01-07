import { PhoneValidationResult, CountryCode, PhoneNumberType } from "./types";
import {
  getCountryDialCode,
  cleanPhoneNumber,
  detectCountryFromPhoneNumber,
  getAllCountryCodes,
} from "./utils";
import { detectPhoneNumberType } from "./phoneTypes";
import { getValidationRules } from "./dataAccess";
import countryCodes from "./CountryCodes.json";

const COUNTRY_CODES = countryCodes as CountryCode[];

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

  const rule = getValidationRules(countryCode);
  if (rule) {
    if (
      rule.minLength &&
      (nationalNumber.length < rule.minLength ||
        (rule.maxLength && nationalNumber.length > rule.maxLength))
    ) {
      return { isValid: false };
    }
    if (rule.pattern && !rule.pattern.test(nationalNumber)) {
      return { isValid: false };
    }
  } else {
    if (!/^\d{4,15}$/.test(nationalNumber)) {
      return { isValid: false };
    }
  }

  const phoneType: PhoneNumberType = detectPhoneNumberType(
    countryCode,
    nationalNumber
  );

  let isMobile: boolean | undefined;
  if (phoneType === "mobile") {
    isMobile = true;
  } else if (phoneType === "landline") {
    isMobile = false;
  }

  if (mobileOnly) {
    if (phoneType !== "mobile") {
      return { isValid: false };
    }
  }

  return {
    isValid: true,
    countryCode,
    nationalNumber,
    e164: `+${countryCode}${nationalNumber}`,
    isMobile,
    phoneType,
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
