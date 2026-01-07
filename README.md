# global-phone-validator

A comprehensive Node.js + TypeScript package for validating **all types of phone numbers** worldwide. Supports **all countries** with **country-specific validation rules** and **phone number type detection** (mobile, landline, VoIP, toll-free, premium, special services) for 30+ major countries. Handles international formats (+CC), 0-prefixed, and plain digits. Returns standardized E.164 format.

## Features

- ✅ Global validation for all countries
- ✅ Phone type detection (mobile, landline, VoIP, toll-free, premium)
- ✅ 50+ countries with specific validation rules
- ✅ 70+ countries with mobile prefix detection
- ✅ Multiple input formats (+CC, 0-prefixed, plain digits)
- ✅ E.164 format output
- ✅ Full TypeScript support
- ✅ Zero dependencies

## Installation

```bash
npm install global-phone-validator
# or
yarn add global-phone-validator
```

## Try It Online

Test the package directly in your browser with RunKit:

**[▶️ Try on RunKit](https://npm.runkit.com/global-phone-validator)**

> **Note:** If you get a 503 error, RunKit may be temporarily unavailable or the latest version may still be indexing. Try again in a few minutes, or test locally using the code below.

### Quick Test Code

You can paste this code in RunKit or run it locally:

```javascript
const { validatePhoneNumber } = require("global-phone-validator");

// Test various countries
console.log(validatePhoneNumber("+91 98765 43210")); // India - Mobile
console.log(validatePhoneNumber("+1 555 123 4567")); // USA - Mobile
console.log(validatePhoneNumber("+44 7123 456789")); // UK - Mobile
console.log(validatePhoneNumber("+49 176 77274194")); // Germany - Mobile
console.log(validatePhoneNumber("+61 4 1234 5678")); // Australia - Mobile
console.log(validatePhoneNumber("+86 138 0013 8000")); // China - Mobile
```

### Test Locally

```bash
# Install the package
npm install global-phone-validator

# Create a test file
node -e "const {validatePhoneNumber} = require('global-phone-validator'); console.log(validatePhoneNumber('+91 98765 43210'));"
```

## Usage

### Basic Validation

```typescript
import { validatePhoneNumber } from "global-phone-validator";

// International format with country code
const result1 = validatePhoneNumber("+91 98765 43210");
console.log(result1);
// {
//   isValid: true,
//   countryCode: '91',
//   nationalNumber: '9876543210',
//   e164: '+919876543210',
//   isMobile: true,
//   country: 'IN',
//   countryName: 'India'
// }

// 0-prefixed format (India)
const result2 = validatePhoneNumber("09876543210");
console.log(result2.isValid); // true

// Plain digits with default country
const result3 = validatePhoneNumber("9876543210", "IN");
console.log(result3.isValid); // true

// Auto-detection from country code (no defaultCountry needed)
const result3a = validatePhoneNumber("+4917677274194");
console.log(result3a.isValid); // true - Auto-detects Germany from +49
console.log(result3a.country); // "DE" (Germany)

// Country matching validation (strict mode with defaultCountry)
const result3b = validatePhoneNumber("+4917677274194", "IN");
console.log(result3b.isValid); // false - Germany number doesn't match IN

const result3c = validatePhoneNumber("+4917677274194", "DE");
console.log(result3c.isValid); // true - Germany number matches DE

// US number
const result4 = validatePhoneNumber("+1 555 123 4567");
console.log(result4);
// {
//   isValid: true,
//   countryCode: '1',
//   nationalNumber: '5551234567',
//   e164: '+15551234567',
//   country: 'US',
//   countryName: 'United States'
// }
```

### Phone Type Detection

```typescript
validatePhoneNumber("+919876543210").phoneType; // 'mobile'
validatePhoneNumber("+442079460958").phoneType; // 'landline'
validatePhoneNumber("+18001234567").phoneType; // 'toll-free'
validatePhoneNumber("+19001234567").phoneType; // 'premium'
```

### Mobile-Only Validation

```typescript
validatePhoneNumber("9876543210", "IN", true); // true (mobile)
validatePhoneNumber("0123456789", "IN", true); // false (landline)
```

### Get Country Codes

```typescript
import {
  getAllCountryCodes,
  getCountryDialCode,
  getCountryCodeByDialCode,
} from "global-phone-validator";

// Get all country codes
const countries = getAllCountryCodes();
console.log(countries); // Array of all countries

// Get dial code for a country
const dialCode = getCountryDialCode("IN");
console.log(dialCode); // '91'

// Get country by dial code
const country = getCountryCodeByDialCode("91");
console.log(country); // { name: 'India', dial_code: '+91', code: 'IN' }
```

## API Reference

### `validatePhoneNumber(input, defaultCountry?, mobileOnly?)`

Validates a phone number and returns detailed information.

**Parameters:**

- `input` (string): Phone number in various formats
- `defaultCountry` (string, optional): ISO country code (e.g., "IN", "US").
  - **When number has `+` prefix**:
    - Country is **auto-detected** from the dial code (e.g., `+49` → Germany, `+91` → India)
    - If `defaultCountry` is provided: Validates that detected country **matches** `defaultCountry` (strict mode)
    - If `defaultCountry` is **not provided**: Validates based on the **detected country** from the dial code
  - **When number doesn't have `+` prefix**: `defaultCountry` is **REQUIRED** - no default country is assumed
- `mobileOnly` (boolean, optional): If true, only accepts mobile numbers (works for all countries with mobile prefix rules). Default: false

**Returns:** `PhoneValidationResult`

```typescript
interface PhoneValidationResult {
  isValid: boolean;
  countryCode?: string; // e.g., '91'
  nationalNumber?: string; // e.g., '9876543210'
  e164?: string; // e.g., '+919876543210'
  isMobile?: boolean; // true if mobile number (based on country-specific prefix rules)
  country?: string; // ISO country code, e.g., 'IN'
  countryName?: string; // Full country name, e.g., 'India'
}
```

### `getAllCountryCodes()`

Returns an array of all supported countries.

**Returns:** `CountryCode[]`

```typescript
interface CountryCode {
  name: string; // e.g., 'India'
  dial_code: string; // e.g., '+91'
  code: string; // e.g., 'IN'
}
```

### `getCountryDialCode(countryCode)`

Gets the dial code for a country.

**Parameters:**

- `countryCode` (string): ISO country code (e.g., "IN")

**Returns:** `string | null` - The dial code without the + sign (e.g., "91")

### `getCountryCodeByDialCode(dialCode)`

Gets country information by dial code.

**Parameters:**

- `dialCode` (string): Dial code with or without + (e.g., "91" or "+91")

**Returns:** `CountryCode | null`

## Supported Formats

The package handles phone numbers in the following formats:

1. **International format**: `+91 98765 43210` or `+919876543210`
   - Country is auto-detected from the dial code
   - `defaultCountry` parameter is optional (used for strict matching)
2. **0-prefixed**: `09876543210`
   - **Requires** `defaultCountry` parameter (e.g., `validatePhoneNumber("09876543210", "IN")`)
3. **Plain digits**: `9876543210`
   - **Requires** `defaultCountry` parameter (e.g., `validatePhoneNumber("9876543210", "IN")`)

## Country-Specific Validation

The package includes **comprehensive validation rules** for **50+ major countries** with specific length and format requirements. Each country has its own validation pattern ensuring accurate phone number validation.

### Countries with Specific Validation Rules

#### Americas

- **United States/Canada (1)**: 10 digits
- **Brazil (55)**: 10-11 digits
- **Mexico (52)**: 10 digits
- **Argentina (54)**: 10 digits
- **Chile (56)**: 9 digits
- **Colombia (57)**: 10 digits
- **Venezuela (58)**: 10 digits
- **Peru (51)**: 9 digits

#### Europe

- **United Kingdom (44)**: 10-11 digits
- **Germany (49)**: 10-11 digits
- **France (33)**: 9 digits
- **Italy (39)**: 9-10 digits
- **Spain (34)**: 9 digits
- **Netherlands (31)**: 9 digits
- **Sweden (46)**: 9 digits
- **Norway (47)**: 8 digits
- **Poland (48)**: 9 digits
- **Russia (7)**: 10 digits
- **Switzerland (41)**: 9 digits
- **Belgium (32)**: 9 digits
- **Greece (30)**: 10 digits
- **Portugal (351)**: 9 digits
- **Ireland (353)**: 9 digits
- **Czech Republic (420)**: 9 digits
- **Ukraine (380)**: 9 digits
- **And more...**

#### Asia-Pacific

- **India (91)**: 10 digits (mobile: 6-9) - Mobile prefix detection
- **China (86)**: 11 digits
- **Japan (81)**: 10-11 digits
- **South Korea (82)**: 9-10 digits
- **Australia (61)**: 9 digits
- **Indonesia (62)**: 9-11 digits
- **Philippines (63)**: 10 digits
- **Thailand (66)**: 9 digits
- **Malaysia (60)**: 9-10 digits
- **Singapore (65)**: 8 digits
- **New Zealand (64)**: 8-10 digits
- **Vietnam (84)**: 9-10 digits
- **Pakistan (92)**: 10 digits
- **Turkey (90)**: 10 digits
- **UAE (971)**: 9 digits
- **Israel (972)**: 9 digits
- **Hong Kong (852)**: 8 digits
- **Taiwan (886)**: 9 digits
- **And more...**

#### Africa & Middle East

- **South Africa (27)**: 9 digits
- **Nigeria (234)**: 10 digits
- **Kenya (254)**: 9 digits
- **Egypt (20)**: 8-10 digits
- **Morocco (212)**: 9 digits
- **Qatar (974)**: 8 digits
- **And more...**

### Mobile Prefix Detection

The package includes **mobile prefix detection** for **70+ countries**, allowing automatic identification of mobile numbers:

**Countries with Mobile Prefix Detection:**

- **Europe**: Germany, UK, France, Italy, Spain, Netherlands, Sweden, Norway, Poland, Russia, Austria, Belgium, Switzerland, Portugal, Greece, Ireland, Czech Republic, Denmark, Finland, Hungary, Iceland, Romania, Slovakia, Slovenia, Ukraine, and more
- **Asia-Pacific**: India, China, Japan, South Korea, Australia, Indonesia, Philippines, Thailand, Malaysia, Singapore, New Zealand, Vietnam, Pakistan, Bangladesh, Sri Lanka, Myanmar, Iran, Israel, Hong Kong, Taiwan, and more
- **Americas**: Argentina, Chile, Colombia, Peru, Venezuela, Uruguay, and more
- **Africa & Middle East**: South Africa, Nigeria, UAE, Egypt, Morocco, Qatar, Kenya, and more

**Note:** Some countries (like Mexico, Brazil) have area-code-dependent mobile prefixes that require area code information for accurate detection. For these countries, format validation is performed but mobile detection may be limited.

### Other Countries

- **General validation**: 4-15 digits (ITU-T E.164 standard)
- All countries from CountryCodes.json are supported
- Falls back to general validation for countries without specific rules

## Examples

```typescript
import { validatePhoneNumber } from "global-phone-validator";

validatePhoneNumber("+91 98765 43210"); // India mobile
validatePhoneNumber("+1 555 123 4567"); // US
validatePhoneNumber("+44 7123 456789"); // UK mobile
validatePhoneNumber("+49 17677274194"); // Germany mobile
validatePhoneNumber("+18001234567"); // US toll-free
validatePhoneNumber("+19001234567"); // US premium
validatePhoneNumber("12345"); // Invalid
```

## Why Use This Package?

- **Accurate**: Country-specific validation rules ensure phone numbers are validated correctly
- **Comprehensive**: Supports all countries with specific rules for 50+ major countries
- **Lightweight**: Zero dependencies, small package size
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Flexible**: Handles multiple input formats (international, 0-prefixed, plain digits)
- **Standardized**: Returns E.164 format for consistent phone number representation

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## Data Structure

The package uses a **generalized, unified data structure** that makes it easy to extend and maintain:

### Country Data Structure

All country information is consolidated into a single `CountryData` interface:

```typescript
interface CountryData {
  name: string; // Country name
  dial_code: string; // Dial code with + (e.g., "+91")
  code: string; // ISO country code (e.g., "IN")

  validation?: {
    // Optional validation rules
    pattern?: RegExp | string;
    minLength?: number;
    maxLength?: number;
  };

  phoneTypes?: {
    // Phone type detection rules
    mobilePrefixes?: string[];
    landlinePrefixes?: string[];
    voipPrefixes?: string[];
    tollFreePrefixes?: string[];
    premiumPrefixes?: string[];
    specialPrefixes?: string[];
  };

  metadata?: {
    // Optional metadata
    notes?: string;
    areaCodeDependent?: boolean;
    lastUpdated?: string;
  };
}
```

### Data Sources

1. **CountryCodes.json**: Basic country information (name, dial_code, code)
2. **phoneTypes.ts**: Phone type detection rules (mobile, landline, VoIP, etc.)
3. **countryData.ts**: Unified structure that merges both sources

### Extending the Data

You can easily add or update country data:

```typescript
import { addCountryData } from "global-phone-validator/dataAccess";

// Add new country with phone type rules
addCountryData("123", {
  name: "New Country",
  dial_code: "+123",
  code: "NC",
  validation: {
    pattern: "^\\d{10}$",
    minLength: 10,
    maxLength: 10,
  },
  phoneTypes: {
    mobilePrefixes: ["9"],
    landlinePrefixes: ["1", "2", "3"],
    tollFreePrefixes: ["800"],
  },
});
```

### Data Access API

```typescript
import {
  getCountryData,
  getPhoneTypeRules,
  getValidationRules,
  getCountriesWithPhoneTypeSupport,
  hasPhoneTypeSupport,
} from "global-phone-validator/dataAccess";

// Get complete country data
const india = getCountryData("91");

// Get phone type rules only
const rules = getPhoneTypeRules("91");

// Get validation rules only
const validation = getValidationRules("91");

// Get all countries with phone type support
const countries = getCountriesWithPhoneTypeSupport();

// Check if country supports specific phone type
const hasMobile = hasPhoneTypeSupport("91", "mobile");
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Contributing

1. Fork the repository
2. Add validation rules to `src/index.ts`
3. Add phone type rules to `src/phoneTypes.ts`
4. Submit a Pull Request

## License

MIT

## Links

- [NPM Package](https://www.npmjs.com/package/global-phone-validator)
- [GitHub Repository](https://github.com/AVantala/global-phone-validator)
- [Report Issues](https://github.com/AVantala/global-phone-validator/issues)
