import { CountryData, getCountryData, getAllCountryData, setCountryData } from "./countryData";
import { PhoneTypeRules, detectPhoneNumberType, PhoneNumberType } from "./phoneTypes";
import { CountryCode } from "./types";

export function getPhoneTypeRules(countryCode: string): PhoneTypeRules | undefined {
  const countryData = getCountryData(countryCode);
  return countryData?.phoneTypes;
}

export function getValidationRules(countryCode: string): {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
} | undefined {
  const countryData = getCountryData(countryCode);
  if (!countryData?.validation) {
    return undefined;
  }
  
  const { pattern, minLength, maxLength } = countryData.validation;
  
  return {
    pattern: typeof pattern === "string" ? new RegExp(pattern) : pattern,
    minLength,
    maxLength,
  };
}

export function getCountryInfo(countryCode: string): CountryData | undefined {
  return getCountryData(countryCode);
}

function getCountryInfoByIsoCode(isoCode: string): CountryData | undefined {
  const allData = getAllCountryData();
  return Object.values(allData).find((data) => data.code === isoCode);
}

export function addCountryData(
  countryCode: string,
  data: {
    name?: string;
    dial_code?: string;
    code?: string;
    validation?: {
      pattern?: RegExp | string;
      minLength?: number;
      maxLength?: number;
    };
    phoneTypes?: PhoneTypeRules;
    metadata?: {
      notes?: string;
      areaCodeDependent?: boolean;
      lastUpdated?: string;
    };
  }
): void {
  setCountryData(countryCode, data);
}

export function getCountriesWithPhoneTypeSupport(): Array<{
  countryCode: string;
  name: string;
  code: string;
  supportedTypes: PhoneNumberType[];
}> {
  const allData = getAllCountryData();
  const result: Array<{
    countryCode: string;
    name: string;
    code: string;
    supportedTypes: PhoneNumberType[];
  }> = [];
  
  Object.entries(allData).forEach(([countryCode, data]) => {
    if (data.phoneTypes) {
      const supportedTypes: PhoneNumberType[] = [];
      if (data.phoneTypes.mobilePrefixes?.length) supportedTypes.push("mobile");
      if (data.phoneTypes.landlinePrefixes?.length) supportedTypes.push("landline");
      if (data.phoneTypes.voipPrefixes?.length) supportedTypes.push("voip");
      if (data.phoneTypes.tollFreePrefixes?.length) supportedTypes.push("toll-free");
      if (data.phoneTypes.premiumPrefixes?.length) supportedTypes.push("premium");
      if (data.phoneTypes.specialPrefixes?.length) supportedTypes.push("special");
      
      if (supportedTypes.length > 0) {
        result.push({
          countryCode,
          name: data.name,
          code: data.code,
          supportedTypes,
        });
      }
    }
  });
  
  return result;
}

export function hasPhoneTypeSupport(countryCode: string, type: PhoneNumberType): boolean {
  const rules = getPhoneTypeRules(countryCode);
  if (!rules) return false;
  
  switch (type) {
    case "mobile":
      return (rules.mobilePrefixes?.length ?? 0) > 0;
    case "landline":
      return (rules.landlinePrefixes?.length ?? 0) > 0;
    case "voip":
      return (rules.voipPrefixes?.length ?? 0) > 0;
    case "toll-free":
      return (rules.tollFreePrefixes?.length ?? 0) > 0;
    case "premium":
      return (rules.premiumPrefixes?.length ?? 0) > 0;
    case "special":
      return (rules.specialPrefixes?.length ?? 0) > 0;
    default:
      return false;
  }
}

export {
  getAllCountryData,
  getCountryData,
  detectPhoneNumberType,
  type CountryData,
  type PhoneTypeRules,
  type PhoneNumberType,
};

export { getCountryInfoByIsoCode as getCountryInfoByIso };

