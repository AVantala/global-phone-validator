import { CountryCode } from "./types";
import countryCodes from "./CountryCodes.json";

const COUNTRY_CODES = countryCodes as CountryCode[];

export function getCountryDialCode(countryCode: string): string | null {
  const country = COUNTRY_CODES.find(
    (c) => c.code.toUpperCase() === countryCode.toUpperCase()
  );
  return country ? country.dial_code.replace("+", "") : null;
}

export function getCountryCodeByDialCode(dialCode: string): CountryCode | null {
  const normalizedDialCode = dialCode.replace("+", "");
  const matches = COUNTRY_CODES.filter(
    (c) => c.dial_code.replace("+", "") === normalizedDialCode
  );
  if (matches.length === 0) return null;
  if (matches.length === 1) return matches[0];
  const preferred = ["US", "GB", "CA", "AU"];
  for (const code of preferred) {
    const match = matches.find((c) => c.code === code);
    if (match) return match;
  }
  return matches[0];
}

export function detectCountryFromPhoneNumber(phoneNumber: string): {
  country: CountryCode | null;
  dialCode: string;
  nationalNumber: string;
} {
  const cleaned = phoneNumber.replace(/[^0-9+]/g, "");

  if (!cleaned.startsWith("+")) {
    return { country: null, dialCode: "", nationalNumber: cleaned };
  }

  for (let len = 4; len >= 1; len--) {
    const potentialDialCode = cleaned.substring(1, 1 + len);
    const country = getCountryCodeByDialCode(potentialDialCode);
    if (country) {
      const nationalNumber = cleaned.substring(1 + len);
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

export function cleanPhoneNumber(input: string): string {
  return input.replace(/\s+/g, "").replace(/[^0-9+]/g, "");
}

export function getAllCountryCodes(): CountryCode[] {
  return COUNTRY_CODES;
}
