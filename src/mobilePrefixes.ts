/**
 * Mobile number prefix rules for countries
 * Format: { countryCode: { mobilePrefixes: string[], landlinePrefixes?: string[] } }
 */

export interface MobilePrefixRules {
  mobilePrefixes: string[]; // Valid mobile number prefixes
  landlinePrefixes?: string[]; // Valid landline prefixes (optional)
}

export const MOBILE_PREFIX_RULES: Record<string, MobilePrefixRules> = {
  // India (91)
  "91": {
    mobilePrefixes: ["6", "7", "8", "9"],
    landlinePrefixes: ["0", "1", "2", "3", "4", "5"],
  },

  // Germany (49)
  "49": {
    mobilePrefixes: ["15", "16", "17"],
    landlinePrefixes: ["30", "40", "69", "89", "211", "221", "231", "241", "351", "361", "371", "381", "391", "421", "431", "451", "461", "471", "481", "511", "531", "541", "561", "571", "581", "591", "611", "621", "631", "641", "651", "661", "671", "681", "691", "711", "721", "731", "741", "751", "761", "771", "781", "911", "921", "931", "941", "951", "961", "971", "981", "991"],
  },

  // United States/Canada (1)
  "1": {
    mobilePrefixes: [], // All 10-digit numbers can be mobile or landline
    landlinePrefixes: [],
  },

  // United Kingdom (44)
  "44": {
    mobilePrefixes: ["7"], // Mobile numbers start with 7
    landlinePrefixes: ["1", "2", "3", "4", "5", "6", "8", "9"],
  },

  // France (33)
  "33": {
    mobilePrefixes: ["6", "7"], // Mobile numbers start with 6 or 7
    landlinePrefixes: ["1", "2", "3", "4", "5", "8", "9"],
  },

  // Italy (39)
  "39": {
    mobilePrefixes: ["3"], // Mobile numbers start with 3
    landlinePrefixes: ["0", "1", "2", "4", "5", "6", "7", "8", "9"],
  },

  // Spain (34)
  "34": {
    mobilePrefixes: ["6", "7"], // Mobile numbers start with 6 or 7
    landlinePrefixes: ["8", "9"],
  },

  // Australia (61)
  "61": {
    mobilePrefixes: ["4"], // Mobile numbers start with 4
    landlinePrefixes: ["2", "3", "7", "8"],
  },

  // Brazil (55)
  "55": {
    mobilePrefixes: ["9"], // Mobile numbers start with 9 (after area code)
    landlinePrefixes: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },

  // China (86)
  "86": {
    mobilePrefixes: ["13", "14", "15", "16", "17", "18", "19"], // Mobile numbers start with 13x-19x
    landlinePrefixes: ["10", "20", "21", "22", "23", "24", "25", "27", "28", "29", "311", "351", "371", "431", "451", "471", "531", "551", "571", "591", "631", "671", "731", "751", "771", "791", "851", "871", "891", "898", "931", "951", "971", "991"],
  },

  // Japan (81)
  "81": {
    mobilePrefixes: ["70", "80", "90"], // Mobile numbers start with 70, 80, or 90
    landlinePrefixes: ["3", "6", "11", "52", "92", "93", "95", "96", "98"],
  },

  // South Korea (82)
  "82": {
    mobilePrefixes: ["10", "11", "16", "17", "18", "19"], // Mobile numbers start with 10x-19x
    landlinePrefixes: ["2", "31", "32", "33", "41", "42", "43", "44", "51", "52", "53", "54", "55", "61", "62", "63", "64"],
  },

  // Russia (7)
  "7": {
    mobilePrefixes: ["9"], // Mobile numbers start with 9
    landlinePrefixes: ["3", "4", "5", "8"],
  },

  // Netherlands (31)
  "31": {
    mobilePrefixes: ["6"], // Mobile numbers start with 6
    landlinePrefixes: ["1", "2", "3", "4", "5", "7", "8", "9"],
  },

  // Sweden (46)
  "46": {
    mobilePrefixes: ["7"], // Mobile numbers start with 7
    landlinePrefixes: ["8", "11", "13", "16", "18", "19", "21", "23", "26", "31", "33", "35", "36", "40", "42", "44", "46", "54", "60", "63", "90"],
  },

  // Norway (47)
  "47": {
    mobilePrefixes: ["4", "9"], // Mobile numbers start with 4 or 9
    landlinePrefixes: ["2", "3", "5", "6", "7", "8"],
  },

  // Poland (48)
  "48": {
    mobilePrefixes: ["5", "6", "7", "8", "9"], // Mobile numbers start with 5-9
    landlinePrefixes: ["1", "2", "3", "4"],
  },

  // Turkey (90)
  "90": {
    mobilePrefixes: ["5"], // Mobile numbers start with 5
    landlinePrefixes: ["2", "3", "4"],
  },

  // Pakistan (92)
  "92": {
    mobilePrefixes: ["3"], // Mobile numbers start with 3
    landlinePrefixes: ["4", "5", "6", "7", "8", "9"],
  },

  // Indonesia (62)
  "62": {
    mobilePrefixes: ["8"], // Mobile numbers start with 8
    landlinePrefixes: ["2", "3", "4", "5", "6", "7", "9"],
  },

  // Philippines (63)
  "63": {
    mobilePrefixes: ["9"], // Mobile numbers start with 9
    landlinePrefixes: ["2", "3", "4", "5", "6", "7", "8"],
  },

  // Thailand (66)
  "66": {
    mobilePrefixes: ["6", "8", "9"], // Mobile numbers start with 6, 8, or 9
    landlinePrefixes: ["2", "3", "4", "5", "7"],
  },

  // Malaysia (60)
  "60": {
    mobilePrefixes: ["1"], // Mobile numbers start with 1
    landlinePrefixes: ["3", "4", "5", "6", "7", "9"],
  },

  // Singapore (65)
  "65": {
    mobilePrefixes: ["8", "9"], // Mobile numbers start with 8 or 9
    landlinePrefixes: ["6"],
  },

  // New Zealand (64)
  "64": {
    mobilePrefixes: ["2"], // Mobile numbers start with 2
    landlinePrefixes: ["3", "4", "6", "7", "9"],
  },

  // Vietnam (84)
  "84": {
    mobilePrefixes: ["9"], // Mobile numbers start with 9
    landlinePrefixes: ["2", "3", "4", "5", "6", "7", "8"],
  },

  // UAE (971)
  "971": {
    mobilePrefixes: ["5"], // Mobile numbers start with 5
    landlinePrefixes: ["2", "3", "4", "6", "7", "9"],
  },

  // South Africa (27)
  "27": {
    mobilePrefixes: ["6", "7", "8"], // Mobile numbers start with 6, 7, or 8
    landlinePrefixes: ["1", "2", "3", "4", "5", "9"],
  },

  // Nigeria (234)
  "234": {
    mobilePrefixes: ["7", "8", "9"], // Mobile numbers start with 7, 8, or 9
    landlinePrefixes: ["1", "2", "3", "4", "5", "6"],
  },

  // Mexico (52)
  "52": {
    mobilePrefixes: ["1"], // Mobile numbers start with 1 (after area code)
    landlinePrefixes: ["2", "3", "4", "5", "6", "7", "8", "9"],
  },

  // Argentina (54)
  "54": {
    mobilePrefixes: ["9"], // Mobile numbers start with 9
    landlinePrefixes: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },

  // Colombia (57)
  "57": {
    mobilePrefixes: ["3"], // Mobile numbers start with 3
    landlinePrefixes: ["1", "2", "4", "5", "6", "7", "8", "9"],
  },
};

/**
 * Check if a number is a mobile number based on country-specific prefix rules
 */
export function isMobileNumber(
  countryCode: string,
  nationalNumber: string
): boolean | undefined {
  const rules = MOBILE_PREFIX_RULES[countryCode];
  if (!rules || rules.mobilePrefixes.length === 0) {
    return undefined; // No rules available
  }

  // Check if number starts with any mobile prefix
  for (const prefix of rules.mobilePrefixes) {
    if (nationalNumber.startsWith(prefix)) {
      return true;
    }
  }

  // If landline prefixes are defined and number matches, it's a landline
  if (rules.landlinePrefixes && rules.landlinePrefixes.length > 0) {
    for (const prefix of rules.landlinePrefixes) {
      if (nationalNumber.startsWith(prefix)) {
        return false;
      }
    }
  }

  // If we have mobile prefixes but number doesn't match, it might be invalid
  // Return undefined to let other validation handle it
  return undefined;
}

/**
 * Check if a number is a landline number based on country-specific prefix rules
 */
export function isLandlineNumber(
  countryCode: string,
  nationalNumber: string
): boolean | undefined {
  const rules = MOBILE_PREFIX_RULES[countryCode];
  if (!rules) {
    return undefined;
  }

  // If landline prefixes are defined, check them
  if (rules.landlinePrefixes && rules.landlinePrefixes.length > 0) {
    for (const prefix of rules.landlinePrefixes) {
      if (nationalNumber.startsWith(prefix)) {
        return true;
      }
    }
  }

  // If mobile prefixes are defined and number doesn't match mobile, might be landline
  if (rules.mobilePrefixes.length > 0) {
    let matchesMobile = false;
    for (const prefix of rules.mobilePrefixes) {
      if (nationalNumber.startsWith(prefix)) {
        matchesMobile = true;
        break;
      }
    }
    if (!matchesMobile) {
      return true; // Not mobile, likely landline
    }
  }

  return undefined;
}

