export type PhoneNumberType =
  | "mobile"
  | "landline"
  | "voip"
  | "toll-free"
  | "premium"
  | "special"
  | "unknown";

export interface PhoneTypeRules {
  mobilePrefixes?: string[];
  landlinePrefixes?: string[];
  voipPrefixes?: string[];
  tollFreePrefixes?: string[];
  premiumPrefixes?: string[];
  specialPrefixes?: string[];
}

export function detectPhoneNumberType(
  countryCode: string,
  nationalNumber: string
): PhoneNumberType {
  const { getCountryData } = require("./countryData");
  const countryData = getCountryData(countryCode);
  const rules = countryData?.phoneTypes;
  if (!rules) {
    return "unknown";
  }

  // Check prefixes in priority order: toll-free, premium, voip, special, mobile, landline
  // This ensures special service numbers are detected before general mobile/landline

  // 1. Check toll-free first (highest priority)
  if (rules.tollFreePrefixes) {
    const sortedTollFree = [...rules.tollFreePrefixes].sort(
      (a, b) => b.length - a.length
    );
    for (const prefix of sortedTollFree) {
      if (nationalNumber.startsWith(prefix)) {
        return "toll-free";
      }
    }
  }

  if (rules.premiumPrefixes) {
    const sortedPremium = [...rules.premiumPrefixes].sort(
      (a, b) => b.length - a.length
    );
    for (const prefix of sortedPremium) {
      if (nationalNumber.startsWith(prefix)) {
        return "premium";
      }
    }
  }

  if (rules.voipPrefixes) {
    const sortedVoip = [...rules.voipPrefixes].sort(
      (a, b) => b.length - a.length
    );
    for (const prefix of sortedVoip) {
      if (nationalNumber.startsWith(prefix)) {
        return "voip";
      }
    }
  }

  if (rules.specialPrefixes) {
    const sortedSpecial = [...rules.specialPrefixes].sort(
      (a, b) => b.length - a.length
    );
    for (const prefix of sortedSpecial) {
      if (nationalNumber.startsWith(prefix)) {
        return "special";
      }
    }
  }

  if (rules.mobilePrefixes) {
    const sortedMobile = [...rules.mobilePrefixes].sort(
      (a, b) => b.length - a.length
    );
    for (const prefix of sortedMobile) {
      if (nationalNumber.startsWith(prefix)) {
        return "mobile";
      }
    }
  }

  if (rules.landlinePrefixes) {
    const sortedLandline = [...rules.landlinePrefixes].sort(
      (a, b) => b.length - a.length
    );
    for (const prefix of sortedLandline) {
      if (nationalNumber.startsWith(prefix)) {
        return "landline";
      }
    }
  }

  return "unknown";
}
