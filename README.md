# global-phone-validator

A reusable Node.js + TypeScript package for validating phone numbers worldwide. Supports any country using CountryCodes JSON, handles international formats (+CC), 0-prefixed, and plain digits. Includes mobile/landline detection for India and returns standardized E.164 format.

## Features

- ✅ **Worldwide Support**: Validates phone numbers for any country using CountryCodes JSON
- ✅ **Multiple Formats**: Handles international format (+CC), 0-prefixed, and plain digit formats
- ✅ **India-Specific**: Mobile vs landline detection for Indian phone numbers
- ✅ **Standardized Output**: Returns E.164 format (+CCNNNNNNNNN)
- ✅ **TypeScript**: Fully typed with TypeScript definitions
- ✅ **Zero Dependencies**: No external dependencies required

## Installation

```bash
npm install global-phone-validator
# or
yarn add global-phone-validator
```

## Usage

### Basic Validation

```typescript
import { validatePhoneNumber } from 'global-phone-validator';

// International format with country code
const result1 = validatePhoneNumber('+91 98765 43210');
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
const result2 = validatePhoneNumber('09876543210');
console.log(result2.isValid); // true

// Plain digits with default country
const result3 = validatePhoneNumber('9876543210', 'IN');
console.log(result3.isValid); // true

// US number
const result4 = validatePhoneNumber('+1 555 123 4567');
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
const result = validatePhoneNumber('9876543210', 'IN', true);
console.log(result.isValid); // true (mobile number)

const result2 = validatePhoneNumber('0123456789', 'IN', true);
console.log(result2.isValid); // false (landline number)
```

### Get Country Codes

```typescript
import { getAllCountryCodes, getCountryDialCode, getCountryCodeByDialCode } from 'global-phone-validator';

// Get all country codes
const countries = getAllCountryCodes();
console.log(countries); // Array of all countries

// Get dial code for a country
const dialCode = getCountryDialCode('IN');
console.log(dialCode); // '91'

// Get country by dial code
const country = getCountryCodeByDialCode('91');
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
  countryCode?: string;        // e.g., '91'
  nationalNumber?: string;     // e.g., '9876543210'
  e164?: string;               // e.g., '+919876543210'
  isMobile?: boolean;          // true if mobile (India only)
  isFixedLine?: boolean;       // true if landline (India only)
  country?: string;            // ISO country code, e.g., 'IN'
  countryName?: string;        // Full country name, e.g., 'India'
}
```

### `getAllCountryCodes()`

Returns an array of all supported countries.

**Returns:** `CountryCode[]`

```typescript
interface CountryCode {
  name: string;        // e.g., 'India'
  dial_code: string;   // e.g., '+91'
  code: string;        // e.g., 'IN'
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

### India (91)
- Mobile numbers: Must start with 6, 7, 8, or 9 and be exactly 10 digits
- Landline numbers: Start with 0-5 and be exactly 10 digits
- Mobile/landline detection is automatically performed

### United States/Canada (1)
- Must be exactly 10 digits (without country code)

### Other Countries
- General validation: 4-15 digits

## Examples

```typescript
import { validatePhoneNumber } from 'global-phone-validator';

// Valid Indian mobile number
validatePhoneNumber('+91 98765 43210');
// { isValid: true, isMobile: true, e164: '+919876543210', ... }

// Valid Indian landline
validatePhoneNumber('0123456789', 'IN');
// { isValid: true, isFixedLine: true, ... }

// Invalid number
validatePhoneNumber('12345');
// { isValid: false }

// US number
validatePhoneNumber('+1 555 123 4567');
// { isValid: true, country: 'US', e164: '+15551234567', ... }

// UK number
validatePhoneNumber('+44 20 7946 0958');
// { isValid: true, country: 'GB', e164: '+442079460958', ... }
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

