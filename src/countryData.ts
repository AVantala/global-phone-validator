import countryCodes from "./CountryCodes.json";
import { PhoneTypeRules } from "./phoneTypes";

export interface CountryData {
  name: string;
  dial_code: string;
  code: string;
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

function getCountryCode(dialCode: string): string {
  return dialCode.replace(/^\+/, "");
}

export const COUNTRY_DATA: Record<string, Partial<CountryData>> = {
  "91": {
    name: "India",
    dial_code: "+91",
    code: "IN",
    validation: {
      pattern: "^[6-9]\\d{9}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["6", "7", "8", "9"],
      landlinePrefixes: [
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "20",
        "22",
        "24",
        "26",
        "28",
        "29",
        "30",
        "31",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "40",
        "44",
        "45",
        "46",
        "47",
        "48",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81",
        "82",
        "83",
        "84",
        "85",
        "86",
        "87",
        "88",
        "89",
        "90",
        "91",
        "92",
        "93",
        "94",
        "95",
        "96",
        "97",
        "98",
        "99",
      ],
      tollFreePrefixes: ["1800", "1860", "800"],
      premiumPrefixes: ["1900"],
    },
  },

  "49": {
    name: "Germany",
    dial_code: "+49",
    code: "DE",
    validation: {
      pattern: "^\\d{9,13}$",
      minLength: 9,
      maxLength: 13,
    },
    phoneTypes: {
      mobilePrefixes: [
        "151",
        "152",
        "153",
        "154",
        "155",
        "156",
        "157",
        "158",
        "159",
        "160",
        "162",
        "163",
        "170",
        "171",
        "172",
        "173",
        "174",
        "175",
        "176",
        "177",
        "178",
        "179",
      ],
      landlinePrefixes: [
        "30",
        "40",
        "69",
        "89",
        "211",
        "221",
        "231",
        "241",
        "351",
        "361",
        "371",
        "381",
        "391",
        "421",
        "431",
        "451",
        "461",
        "471",
        "481",
        "511",
        "531",
        "541",
        "561",
        "571",
        "581",
        "591",
        "611",
        "621",
        "631",
        "641",
        "651",
        "661",
        "671",
        "681",
        "691",
        "711",
        "721",
        "731",
        "741",
        "751",
        "761",
        "771",
        "781",
        "911",
        "921",
        "931",
        "941",
        "951",
        "961",
        "971",
        "981",
        "991",
      ],
      tollFreePrefixes: ["800"],
      premiumPrefixes: ["900"],
      voipPrefixes: ["32"],
    },
  },

  "1": {
    name: "United States/Canada",
    dial_code: "+1",
    code: "US",
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: [], // All numbers can be mobile or landline
      tollFreePrefixes: ["800", "833", "844", "855", "866", "877", "888"],
      premiumPrefixes: ["900", "976"],
    },
    metadata: {
      areaCodeDependent: true,
    },
  },

  "44": {
    name: "United Kingdom",
    dial_code: "+44",
    code: "GB",
    validation: {
      pattern: "^\\d{10,11}$",
      minLength: 10,
      maxLength: 11,
    },
    phoneTypes: {
      mobilePrefixes: ["7"],
      landlinePrefixes: ["1", "2", "3", "4", "5", "6", "8", "9"],
      tollFreePrefixes: ["800", "808"],
      premiumPrefixes: [
        "900",
        "901",
        "902",
        "903",
        "904",
        "905",
        "906",
        "907",
        "908",
        "909",
        "910",
        "911",
        "912",
        "913",
        "914",
        "915",
        "916",
        "917",
        "918",
        "919",
        "920",
        "921",
        "922",
        "923",
        "924",
        "925",
        "926",
        "927",
        "928",
        "929",
        "930",
        "931",
        "932",
        "933",
        "934",
        "935",
        "936",
        "937",
        "938",
        "939",
        "940",
        "941",
        "942",
        "943",
        "944",
        "945",
        "946",
        "947",
        "948",
        "949",
        "950",
        "951",
        "952",
        "953",
        "954",
        "955",
        "956",
        "957",
        "958",
        "959",
        "960",
        "961",
        "962",
        "963",
        "964",
        "965",
        "966",
        "967",
        "968",
        "969",
        "970",
        "971",
        "972",
        "973",
        "974",
        "975",
        "976",
        "977",
        "978",
        "979",
        "980",
        "981",
        "982",
        "983",
        "984",
        "985",
        "986",
        "987",
        "988",
        "989",
        "990",
        "991",
        "992",
        "993",
        "994",
        "995",
        "996",
        "997",
        "998",
        "999",
      ],
      voipPrefixes: ["56"],
    },
  },

  "33": {
    name: "France",
    dial_code: "+33",
    code: "FR",
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["6", "7"],
      landlinePrefixes: ["1", "2", "3", "4", "5", "8", "9"],
      tollFreePrefixes: ["800", "805", "809"],
      premiumPrefixes: ["900"],
    },
  },
  "7": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["9"],
      landlinePrefixes: ["3", "4", "5", "8"],
      tollFreePrefixes: ["800"],
      premiumPrefixes: ["900"],
    },
  },
  "20": {
    validation: {
      pattern: "^\\d{8,10}$",
      minLength: 8,
      maxLength: 10,
    },
  },
  "27": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["6", "7", "8"],
      landlinePrefixes: ["1", "2", "3", "4", "5", "9"],
      tollFreePrefixes: ["800"],
    },
  },
  "30": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
  },
  "31": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["6"],
      landlinePrefixes: ["1", "2", "3", "4", "5", "7", "8", "9"],
      tollFreePrefixes: ["800"],
    },
  },
  "32": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "34": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["6", "7"],
      landlinePrefixes: ["8", "9"],
      tollFreePrefixes: ["800", "900"],
      premiumPrefixes: ["901", "902", "903", "905", "906", "907", "908", "909"],
    },
  },
  "36": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "39": {
    validation: {
      pattern: "^\\d{9,10}$",
      minLength: 9,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["3"],
      landlinePrefixes: ["0", "1", "2", "4", "5", "6", "7", "8", "9"],
      tollFreePrefixes: ["800"],
      premiumPrefixes: ["900"],
    },
  },
  "40": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "41": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "45": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
  },
  "46": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["7"],
      landlinePrefixes: [
        "8",
        "11",
        "13",
        "16",
        "18",
        "19",
        "21",
        "23",
        "26",
        "31",
        "33",
        "35",
        "36",
        "40",
        "42",
        "44",
        "46",
        "54",
        "60",
        "63",
        "90",
      ],
      tollFreePrefixes: ["200"],
    },
  },
  "47": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
    phoneTypes: {
      mobilePrefixes: ["4", "9"],
      landlinePrefixes: ["2", "3", "5", "6", "7", "8"],
      tollFreePrefixes: ["800"],
    },
  },
  "48": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["5", "6", "7", "8", "9"],
      landlinePrefixes: ["1", "2", "3", "4"],
      tollFreePrefixes: ["800"],
      premiumPrefixes: ["900"],
    },
  },
  "51": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "52": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["1"],
      landlinePrefixes: ["2", "3", "4", "5", "6", "7", "8", "9"],
      tollFreePrefixes: ["800"],
    },
  },
  "53": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
  },
  "54": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["9"],
      landlinePrefixes: ["1", "2", "3", "4", "5", "6", "7", "8"],
      tollFreePrefixes: ["800"],
    },
  },
  "55": {
    validation: {
      pattern: "^\\d{10,11}$",
      minLength: 10,
      maxLength: 11,
    },
    phoneTypes: {
      mobilePrefixes: ["9"],
      landlinePrefixes: ["1", "2", "3", "4", "5", "6", "7", "8"],
      tollFreePrefixes: ["800"],
      premiumPrefixes: ["900"],
    },
  },
  "56": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["9"],
      landlinePrefixes: ["2", "3", "4", "5", "6", "7", "8"],
      tollFreePrefixes: ["800"],
    },
  },
  "57": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["3"],
      landlinePrefixes: ["1", "2", "4", "5", "6", "7", "8", "9"],
      tollFreePrefixes: ["1800"],
    },
  },
  "58": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
  },
  "60": {
    validation: {
      pattern: "^\\d{9,10}$",
      minLength: 9,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["1"],
      landlinePrefixes: ["3", "4", "5", "6", "7", "9"],
      tollFreePrefixes: ["1800"],
    },
  },
  "61": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["4"],
      landlinePrefixes: ["2", "3", "7", "8"],
      tollFreePrefixes: ["1800", "1300"],
      premiumPrefixes: ["1900"],
    },
  },
  "62": {
    validation: {
      pattern: "^\\d{9,11}$",
      minLength: 9,
      maxLength: 11,
    },
    phoneTypes: {
      mobilePrefixes: ["8"],
      landlinePrefixes: ["2", "3", "4", "5", "6", "7", "9"],
      tollFreePrefixes: ["800"],
    },
  },
  "63": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["9"],
      landlinePrefixes: ["2", "3", "4", "5", "6", "7", "8"],
      tollFreePrefixes: ["800"],
    },
  },
  "64": {
    validation: {
      pattern: "^\\d{8,10}$",
      minLength: 8,
      maxLength: 10,
    },
    phoneTypes: {
      mobilePrefixes: ["2"],
      landlinePrefixes: ["3", "4", "6", "7", "9"],
      tollFreePrefixes: ["800"],
    },
  },
  "65": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
    phoneTypes: {
      mobilePrefixes: ["8", "9"],
      landlinePrefixes: ["6"],
      tollFreePrefixes: ["1800"],
    },
  },
  "66": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
    phoneTypes: {
      mobilePrefixes: ["6", "8", "9"],
      landlinePrefixes: ["2", "3", "4", "5", "7"],
      tollFreePrefixes: ["1800"],
    },
  },
  "81": {
    validation: {
      pattern: "^\\d{10,11}$",
      minLength: 10,
      maxLength: 11,
    },
    phoneTypes: {
      mobilePrefixes: ["70", "80", "90"],
      landlinePrefixes: ["3", "6", "11", "52", "92", "93", "95", "96", "98"],
      tollFreePrefixes: ["120", "800"],
      premiumPrefixes: ["990"],
    },
  },
  "82": {
    validation: {
      pattern: "^\\d{9,10}$",
      minLength: 9,
      maxLength: 10,
    },
  },
  "84": {
    validation: {
      pattern: "^\\d{9,10}$",
      minLength: 9,
      maxLength: 10,
    },
  },
  "86": {
    validation: {
      pattern: "^\\d{11}$",
      minLength: 11,
      maxLength: 11,
    },
    phoneTypes: {
      mobilePrefixes: ["13", "14", "15", "16", "17", "18", "19"],
      landlinePrefixes: [
        "10",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "27",
        "28",
        "29",
        "311",
        "351",
        "371",
        "431",
        "451",
        "471",
        "531",
        "551",
        "571",
        "591",
        "631",
        "671",
        "731",
        "751",
        "771",
        "791",
        "851",
        "871",
        "891",
        "898",
        "931",
        "951",
        "971",
        "991",
      ],
      tollFreePrefixes: ["400", "800"],
    },
  },
  "90": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
  },
  "92": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
  },
  "93": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "94": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "95": {
    validation: {
      pattern: "^\\d{8,10}$",
      minLength: 8,
      maxLength: 10,
    },
  },
  "98": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
  },
  "212": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "213": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "234": {
    validation: {
      pattern: "^\\d{10}$",
      minLength: 10,
      maxLength: 10,
    },
  },
  "254": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "351": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "352": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "353": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "354": {
    validation: {
      pattern: "^\\d{7,9}$",
      minLength: 7,
      maxLength: 9,
    },
  },
  "358": {
    validation: {
      pattern: "^\\d{6,10}$",
      minLength: 6,
      maxLength: 10,
    },
  },
  "380": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "420": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "421": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "852": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
  },
  "853": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
  },
  "886": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "971": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "972": {
    validation: {
      pattern: "^\\d{9}$",
      minLength: 9,
      maxLength: 9,
    },
  },
  "974": {
    validation: {
      pattern: "^\\d{8}$",
      minLength: 8,
      maxLength: 8,
    },
  },
};

let countryDataCache: Record<string, CountryData> | null = null;

export function initializeCountryData(): Record<string, CountryData> {
  if (countryDataCache) {
    return countryDataCache;
  }

  const data: Record<string, CountryData> = {};
  (
    countryCodes as Array<{ name: string; dial_code: string; code: string }>
  ).forEach((country) => {
    const countryCode = getCountryCode(country.dial_code);
    const countryData: CountryData = {
      name: country.name,
      dial_code: country.dial_code,
      code: country.code,
    };
    if (COUNTRY_DATA[countryCode]) {
      if (COUNTRY_DATA[countryCode].validation)
        countryData.validation = COUNTRY_DATA[countryCode].validation;
      if (COUNTRY_DATA[countryCode].phoneTypes)
        countryData.phoneTypes = COUNTRY_DATA[countryCode].phoneTypes;
      if (COUNTRY_DATA[countryCode].metadata)
        countryData.metadata = COUNTRY_DATA[countryCode].metadata;
      if (COUNTRY_DATA[countryCode].name)
        countryData.name = COUNTRY_DATA[countryCode].name;
      if (COUNTRY_DATA[countryCode].dial_code)
        countryData.dial_code = COUNTRY_DATA[countryCode].dial_code;
      if (COUNTRY_DATA[countryCode].code)
        countryData.code = COUNTRY_DATA[countryCode].code;
    }
    data[countryCode] = countryData;
  });
  Object.keys(COUNTRY_DATA).forEach((code) => {
    if (!data[code]) {
      const partial = COUNTRY_DATA[code];
      if (partial.name && partial.dial_code && partial.code) {
        data[code] = {
          name: partial.name,
          dial_code: partial.dial_code,
          code: partial.code,
          ...partial,
        } as CountryData;
      }
    } else {
      data[code] = { ...data[code], ...COUNTRY_DATA[code] };
    }
  });

  countryDataCache = data;
  return data;
}

export function clearCountryDataCache(): void {
  countryDataCache = null;
}

export function getCountryData(countryCode: string): CountryData | undefined {
  const allData = initializeCountryData();
  return allData[countryCode];
}

export function getCountryDataByIsoCode(
  isoCode: string
): CountryData | undefined {
  const allData = initializeCountryData();
  return Object.values(allData).find((data) => data.code === isoCode);
}

export function getAllCountryData(): Record<string, CountryData> {
  return initializeCountryData();
}

export function setCountryData(
  countryCode: string,
  data: Partial<CountryData>
): void {
  const existing = COUNTRY_DATA[countryCode];
  if (existing) {
    COUNTRY_DATA[countryCode] = { ...existing, ...data };
  } else {
    // Find from CountryCodes.json
    const country = (
      countryCodes as Array<{ name: string; dial_code: string; code: string }>
    ).find((c) => getCountryCode(c.dial_code) === countryCode);
    if (country) {
      COUNTRY_DATA[countryCode] = {
        name: country.name,
        dial_code: country.dial_code,
        code: country.code,
        ...data,
      };
    }
  }
}
