/**
 * Mobile number prefix rules for countries
 * Format: { countryCode: { mobilePrefixes: string[] } }
 * Note: Prefixes are checked against the national number (after removing country code and leading 0)
 */

export interface MobilePrefixRules {
  mobilePrefixes: string[]; // Valid mobile number prefixes
}

export const MOBILE_PREFIX_RULES: Record<string, MobilePrefixRules> = {
  // India (91) - Mobile: 6, 7, 8, 9
  "91": {
    mobilePrefixes: ["6", "7", "8", "9"],
  },

  // Germany (49) - Mobile: 015x, 016x, 017x (151-159, 160, 162, 163, 170-179)
  "49": {
    mobilePrefixes: ["151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "162", "163", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179"],
  },

  // United States/Canada (1) - No specific mobile prefix (all numbers can be mobile)
  "1": {
    mobilePrefixes: [], // All 10-digit numbers can be mobile or landline
  },

  // United Kingdom (44) - Mobile: 7
  "44": {
    mobilePrefixes: ["7"],
  },

  // France (33) - Mobile: 6, 7
  "33": {
    mobilePrefixes: ["6", "7"],
  },

  // Italy (39) - Mobile: 3
  "39": {
    mobilePrefixes: ["3"],
  },

  // Spain (34) - Mobile: 6, 7
  "34": {
    mobilePrefixes: ["6", "7"],
  },

  // Australia (61) - Mobile: 4
  "61": {
    mobilePrefixes: ["4"],
  },

  // Brazil (55) - Mobile: 9 (after area code, but we check the full number)
  "55": {
    mobilePrefixes: ["9"], // Mobile numbers typically have 9 as second digit after area code
  },

  // China (86) - Mobile: 13x, 14x, 15x, 16x, 17x, 18x, 19x
  "86": {
    mobilePrefixes: ["13", "14", "15", "16", "17", "18", "19"],
  },

  // Japan (81) - Mobile: 70, 80, 90
  "81": {
    mobilePrefixes: ["70", "80", "90"],
  },

  // South Korea (82) - Mobile: 10, 11, 16, 17, 18, 19
  "82": {
    mobilePrefixes: ["10", "11", "16", "17", "18", "19"],
  },

  // Russia (7) - Mobile: 9
  "7": {
    mobilePrefixes: ["9"],
  },

  // Netherlands (31) - Mobile: 6
  "31": {
    mobilePrefixes: ["6"],
  },

  // Sweden (46) - Mobile: 7
  "46": {
    mobilePrefixes: ["7"],
  },

  // Norway (47) - Mobile: 4, 9
  "47": {
    mobilePrefixes: ["4", "9"],
  },

  // Poland (48) - Mobile: 5, 6, 7, 8, 9
  "48": {
    mobilePrefixes: ["5", "6", "7", "8", "9"],
  },

  // Turkey (90) - Mobile: 5
  "90": {
    mobilePrefixes: ["5"],
  },

  // Pakistan (92) - Mobile: 3
  "92": {
    mobilePrefixes: ["3"],
  },

  // Indonesia (62) - Mobile: 8
  "62": {
    mobilePrefixes: ["8"],
  },

  // Philippines (63) - Mobile: 9
  "63": {
    mobilePrefixes: ["9"],
  },

  // Thailand (66) - Mobile: 6, 8, 9
  "66": {
    mobilePrefixes: ["6", "8", "9"],
  },

  // Malaysia (60) - Mobile: 1
  "60": {
    mobilePrefixes: ["1"],
  },

  // Singapore (65) - Mobile: 8, 9
  "65": {
    mobilePrefixes: ["8", "9"],
  },

  // New Zealand (64) - Mobile: 2
  "64": {
    mobilePrefixes: ["2"],
  },

  // Vietnam (84) - Mobile: 9
  "84": {
    mobilePrefixes: ["9"],
  },

  // UAE (971) - Mobile: 5
  "971": {
    mobilePrefixes: ["5"],
  },

  // South Africa (27) - Mobile: 6, 7, 8
  "27": {
    mobilePrefixes: ["6", "7", "8"],
  },

  // Nigeria (234) - Mobile: 7, 8, 9
  "234": {
    mobilePrefixes: ["7", "8", "9"],
  },

  // Mexico (52) - Mobile: 1 (after area code)
  "52": {
    mobilePrefixes: ["1"],
  },

  // Argentina (54) - Mobile: 9
  "54": {
    mobilePrefixes: ["9"],
  },

  // Colombia (57) - Mobile: 3
  "57": {
    mobilePrefixes: ["3"],
  },

  // Chile (56) - Mobile: 9
  "56": {
    mobilePrefixes: ["9"],
  },

  // Peru (51) - Mobile: 9
  "51": {
    mobilePrefixes: ["9"],
  },

  // Venezuela (58) - Mobile: 4
  "58": {
    mobilePrefixes: ["4"],
  },

  // Bangladesh (880) - Mobile: 13, 14, 15, 16, 17, 18, 19
  "880": {
    mobilePrefixes: ["13", "14", "15", "16", "17", "18", "19"],
  },

  // Sri Lanka (94) - Mobile: 7
  "94": {
    mobilePrefixes: ["7"],
  },

  // Myanmar (95) - Mobile: 9
  "95": {
    mobilePrefixes: ["9"],
  },

  // Iran (98) - Mobile: 9
  "98": {
    mobilePrefixes: ["9"],
  },

  // Israel (972) - Mobile: 5
  "972": {
    mobilePrefixes: ["5"],
  },

  // Hong Kong (852) - Mobile: 5, 6, 9
  "852": {
    mobilePrefixes: ["5", "6", "9"],
  },

  // Taiwan (886) - Mobile: 9
  "886": {
    mobilePrefixes: ["9"],
  },

  // Afghanistan (93) - Mobile: 70, 71, 72, 73, 74, 75, 76, 77, 78, 79
  "93": {
    mobilePrefixes: ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"],
  },

  // Albania (355) - Mobile: 66, 67, 68, 69
  "355": {
    mobilePrefixes: ["66", "67", "68", "69"],
  },

  // Algeria (213) - Mobile: 5, 6, 7
  "213": {
    mobilePrefixes: ["5", "6", "7"],
  },

  // Angola (244) - Mobile: 91, 92, 93, 94, 95, 96, 97, 98, 99
  "244": {
    mobilePrefixes: ["91", "92", "93", "94", "95", "96", "97", "98", "99"],
  },

  // Austria (43) - Mobile: 6
  "43": {
    mobilePrefixes: ["6"],
  },

  // Azerbaijan (994) - Mobile: 50, 51, 55, 70, 77
  "994": {
    mobilePrefixes: ["50", "51", "55", "70", "77"],
  },

  // Bahrain (973) - Mobile: 3, 6, 9
  "973": {
    mobilePrefixes: ["3", "6", "9"],
  },

  // Belarus (375) - Mobile: 25, 29, 33, 44
  "375": {
    mobilePrefixes: ["25", "29", "33", "44"],
  },

  // Belgium (32) - Mobile: 4
  "32": {
    mobilePrefixes: ["4"],
  },

  // Bolivia (591) - Mobile: 6, 7
  "591": {
    mobilePrefixes: ["6", "7"],
  },

  // Bosnia and Herzegovina (387) - Mobile: 60, 61, 62, 63, 64, 65, 66
  "387": {
    mobilePrefixes: ["60", "61", "62", "63", "64", "65", "66"],
  },

  // Botswana (267) - Mobile: 7
  "267": {
    mobilePrefixes: ["7"],
  },

  // Bulgaria (359) - Mobile: 87, 88, 89, 98
  "359": {
    mobilePrefixes: ["87", "88", "89", "98"],
  },

  // Cambodia (855) - Mobile: 1, 6, 7, 8, 9
  "855": {
    mobilePrefixes: ["1", "6", "7", "8", "9"],
  },

  // Cameroon (237) - Mobile: 6
  "237": {
    mobilePrefixes: ["6"],
  },

  // Croatia (385) - Mobile: 9
  "385": {
    mobilePrefixes: ["9"],
  },

  // Cuba (53) - Mobile: 5
  "53": {
    mobilePrefixes: ["5"],
  },

  // Cyprus (357) - Mobile: 9
  "357": {
    mobilePrefixes: ["9"],
  },

  // Czech Republic (420) - Mobile: 6, 7
  "420": {
    mobilePrefixes: ["6", "7"],
  },

  // Denmark (45) - Mobile: 2, 3, 4, 5, 6, 7, 8, 9
  "45": {
    mobilePrefixes: ["2", "3", "4", "5", "6", "7", "8", "9"],
  },

  // Egypt (20) - Mobile: 10, 11, 12, 15
  "20": {
    mobilePrefixes: ["10", "11", "12", "15"],
  },

  // Estonia (372) - Mobile: 5
  "372": {
    mobilePrefixes: ["5"],
  },

  // Ethiopia (251) - Mobile: 9
  "251": {
    mobilePrefixes: ["9"],
  },

  // Finland (358) - Mobile: 4, 5
  "358": {
    mobilePrefixes: ["4", "5"],
  },

  // Ghana (233) - Mobile: 2, 5
  "233": {
    mobilePrefixes: ["2", "5"],
  },

  // Greece (30) - Mobile: 6
  "30": {
    mobilePrefixes: ["6"],
  },

  // Hungary (36) - Mobile: 20, 30, 31, 50, 70
  "36": {
    mobilePrefixes: ["20", "30", "31", "50", "70"],
  },

  // Iceland (354) - Mobile: 6, 7, 8
  "354": {
    mobilePrefixes: ["6", "7", "8"],
  },

  // Iraq (964) - Mobile: 7
  "964": {
    mobilePrefixes: ["7"],
  },

  // Ireland (353) - Mobile: 8
  "353": {
    mobilePrefixes: ["8"],
  },

  // Jordan (962) - Mobile: 7
  "962": {
    mobilePrefixes: ["7"],
  },

  // Kazakhstan (7) - Same as Russia, Mobile: 7 (for Kazakhstan region)
  // Note: Kazakhstan shares +7 with Russia, but uses 7xx prefixes

  // Kenya (254) - Mobile: 7
  "254": {
    mobilePrefixes: ["7"],
  },

  // Kuwait (965) - Mobile: 5, 6, 9
  "965": {
    mobilePrefixes: ["5", "6", "9"],
  },

  // Lebanon (961) - Mobile: 3, 7
  "961": {
    mobilePrefixes: ["3", "7"],
  },

  // Luxembourg (352) - Mobile: 6
  "352": {
    mobilePrefixes: ["6"],
  },

  // Morocco (212) - Mobile: 6, 7
  "212": {
    mobilePrefixes: ["6", "7"],
  },

  // Nepal (977) - Mobile: 98, 99
  "977": {
    mobilePrefixes: ["98", "99"],
  },

  // Portugal (351) - Mobile: 9
  "351": {
    mobilePrefixes: ["9"],
  },

  // Qatar (974) - Mobile: 3, 5, 6, 7
  "974": {
    mobilePrefixes: ["3", "5", "6", "7"],
  },

  // Romania (40) - Mobile: 7
  "40": {
    mobilePrefixes: ["7"],
  },

  // Saudi Arabia (966) - Mobile: 5
  "966": {
    mobilePrefixes: ["5"],
  },

  // Serbia (381) - Mobile: 6
  "381": {
    mobilePrefixes: ["6"],
  },

  // Slovakia (421) - Mobile: 9
  "421": {
    mobilePrefixes: ["9"],
  },

  // Slovenia (386) - Mobile: 3, 4, 5, 6, 7, 8, 9
  "386": {
    mobilePrefixes: ["3", "4", "5", "6", "7", "8", "9"],
  },

  // Switzerland (41) - Mobile: 7, 8
  "41": {
    mobilePrefixes: ["7", "8"],
  },

  // Tunisia (216) - Mobile: 2, 9
  "216": {
    mobilePrefixes: ["2", "9"],
  },

  // Ukraine (380) - Mobile: 39, 50, 63, 66, 67, 68, 73, 93, 95, 96, 97, 98, 99
  "380": {
    mobilePrefixes: ["39", "50", "63", "66", "67", "68", "73", "93", "95", "96", "97", "98", "99"],
  },

  // Uruguay (598) - Mobile: 9
  "598": {
    mobilePrefixes: ["9"],
  },

  // Zimbabwe (263) - Mobile: 7
  "263": {
    mobilePrefixes: ["7"],
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
  // Sort prefixes by length (longest first) to match longer prefixes first
  const sortedPrefixes = [...rules.mobilePrefixes].sort((a, b) => b.length - a.length);
  
  for (const prefix of sortedPrefixes) {
    if (nationalNumber.startsWith(prefix)) {
      return true;
    }
  }

  // If we have mobile prefixes but number doesn't match, return undefined
  // This allows other validation to handle it
  return undefined;
}
