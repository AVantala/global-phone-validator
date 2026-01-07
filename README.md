# global-phone-validator

A comprehensive Node.js + TypeScript package for validating phone numbers worldwide. Supports **all countries** with **country-specific validation rules** for 50+ major countries. Handles international formats (+CC), 0-prefixed, and plain digits. Includes mobile/landline detection for India and returns standardized E.164 format.

## Features

- ✅ **True Global Validation**: Validates phone numbers for **all countries** with country-specific rules for 50+ major countries
- ✅ **Country-Specific Rules**: Accurate validation for US, UK, Germany, France, Australia, Brazil, China, Japan, India, and 40+ more countries
- ✅ **Multiple Formats**: Handles international format (+CC), 0-prefixed, and plain digit formats
- ✅ **India-Specific**: Mobile vs landline detection for Indian phone numbers
- ✅ **Standardized Output**: Returns E.164 format (+CCNNNNNNNNN) with country information
- ✅ **TypeScript**: Fully typed with TypeScript definitions
- ✅ **Zero Dependencies**: No external dependencies required
- ✅ **ITU-T E.164 Compliant**: Follows international telecommunication standards

## Installation

```bash
npm install global-phone-validator
# or
yarn add global-phone-validator
```

## Try It Online

Test the package directly in your browser with RunKit:

**[▶️ Try on RunKit](https://npm.runkit.com/global-phone-validator)**

Or use this code snippet:

```javascript
const { validatePhoneNumber } = require("global-phone-validator");

// Test various countries
validatePhoneNumber("+91 98765 43210"); // India
validatePhoneNumber("+1 555 123 4567"); // USA
validatePhoneNumber("+44 20 7946 0958"); // UK
validatePhoneNumber("+49 30 12345678"); // Germany
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
//   isFixedLine: false,
//   country: 'IN',
//   countryName: 'India'
// }

// 0-prefixed format (India)
const result2 = validatePhoneNumber("09876543210");
console.log(result2.isValid); // true

// Plain digits with default country
const result3 = validatePhoneNumber("9876543210", "IN");
console.log(result3.isValid); // true

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

### Mobile-Only Validation (India)

```typescript
// Only accept mobile numbers
const result = validatePhoneNumber("9876543210", "IN", true);
console.log(result.isValid); // true (mobile number)

const result2 = validatePhoneNumber("0123456789", "IN", true);
console.log(result2.isValid); // false (landline number)
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
- `defaultCountry` (string, optional): ISO country code (e.g., "IN", "US") used when country cannot be detected. Default: "IN"
- `mobileOnly` (boolean, optional): If true, only accepts mobile numbers (currently only for India). Default: false

**Returns:** `PhoneValidationResult`

```typescript
interface PhoneValidationResult {
  isValid: boolean;
  countryCode?: string; // e.g., '91'
  nationalNumber?: string; // e.g., '9876543210'
  e164?: string; // e.g., '+919876543210'
  isMobile?: boolean; // true if mobile (India only)
  isFixedLine?: boolean; // true if landline (India only)
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
2. **0-prefixed**: `09876543210` (uses defaultCountry parameter)
3. **Plain digits**: `9876543210` (uses defaultCountry parameter)

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

- **India (91)**: 10 digits (mobile: 6-9, landline: 0-5) - Mobile/landline detection
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

### Other Countries

- **General validation**: 4-15 digits (ITU-T E.164 standard)
- All countries from CountryCodes.json are supported
- Falls back to general validation for countries without specific rules

## Examples

```typescript
import { validatePhoneNumber } from "global-phone-validator";

// Valid Indian mobile number
validatePhoneNumber("+91 98765 43210");
// { isValid: true, isMobile: true, e164: '+919876543210', ... }

// Valid Indian landline
validatePhoneNumber("0123456789", "IN");
// { isValid: true, isFixedLine: true, ... }

// Invalid number
validatePhoneNumber("12345");
// { isValid: false }

// US number
validatePhoneNumber("+1 555 123 4567");
// { isValid: true, country: 'US', e164: '+15551234567', ... }

// UK number
validatePhoneNumber("+44 20 7946 0958");
// { isValid: true, country: 'GB', e164: '+442079460958', ... }

// Germany number
validatePhoneNumber("+49 30 12345678");
// { isValid: true, country: 'DE', e164: '+493012345678', ... }

// France number
validatePhoneNumber("+33 1 23 45 67 89");
// { isValid: true, country: 'FR', e164: '+33123456789', ... }

// Australia number
validatePhoneNumber("+61 2 1234 5678");
// { isValid: true, country: 'AU', e164: '+61212345678', ... }

// Brazil number
validatePhoneNumber("+55 11 98765 4321");
// { isValid: true, country: 'BR', e164: '+5511987654321', ... }

// China number
validatePhoneNumber("+86 138 0013 8000");
// { isValid: true, country: 'CN', e164: '+8613800138000', ... }

// Japan number
validatePhoneNumber("+81 3 1234 5678");
// { isValid: true, country: 'JP', e164: '+81312345678', ... }
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding Country Validation Rules

If you'd like to add or improve validation rules for specific countries, please:

1. Fork the repository
2. Add the validation rule to the `validationRules` object in `src/index.ts`
3. Update the README with the country information
4. Submit a Pull Request

## License

MIT

## Links

- **NPM Package**: [global-phone-validator](https://www.npmjs.com/package/global-phone-validator)
- **GitHub Repository**: [AVantala/global-phone-validator](https://github.com/AVantala/global-phone-validator)
- **Issues**: [Report a bug or request a feature](https://github.com/AVantala/global-phone-validator/issues)

## License

MIT
