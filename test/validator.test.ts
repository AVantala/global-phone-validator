import { validatePhoneNumber, getAllCountryCodes, getCountryDialCode, getCountryCodeByDialCode } from "../src/index";

console.log("=== Phone Validator Tests ===\n");

// Test 1: International format (India)
console.log("Test 1: International format (India)");
const result1 = validatePhoneNumber("+91 98765 43210");
console.log("Input: +91 98765 43210");
console.log("Result:", JSON.stringify(result1, null, 2));
console.log("✓ Valid:", result1.isValid);
console.log("✓ Mobile:", result1.isMobile);
console.log("✓ E.164:", result1.e164);
console.log();

// Test 2: 0-prefixed (India)
console.log("Test 2: 0-prefixed (India)");
const result2 = validatePhoneNumber("09876543210");
console.log("Input: 09876543210");
console.log("Result:", JSON.stringify(result2, null, 2));
console.log("✓ Valid:", result2.isValid);
console.log();

// Test 3: Plain digits with default country
console.log("Test 3: Plain digits (India)");
const result3 = validatePhoneNumber("9876543210", "IN");
console.log("Input: 9876543210 (default: IN)");
console.log("Result:", JSON.stringify(result3, null, 2));
console.log("✓ Valid:", result3.isValid);
console.log("✓ Mobile:", result3.isMobile);
console.log();

// Test 4: US number
console.log("Test 4: US number");
const result4 = validatePhoneNumber("+1 555 123 4567");
console.log("Input: +1 555 123 4567");
console.log("Result:", JSON.stringify(result4, null, 2));
console.log("✓ Valid:", result4.isValid);
console.log("✓ Country:", result4.country);
console.log();

// Test 5: Germany number
console.log("Test 5: Germany number");
const result5 = validatePhoneNumber("+4915123456789");
console.log("Input: +4915123456789");
console.log("Result:", JSON.stringify(result5, null, 2));
console.log("✓ Valid:", result5.isValid);
console.log("✓ Country:", result5.country);
console.log();

// Test 6: Mobile-only validation (India)
console.log("Test 6: Mobile-only validation (India)");
const result6a = validatePhoneNumber("9876543210", "IN", true);
const result6b = validatePhoneNumber("0123456789", "IN", true);
console.log("Input: 9876543210 (mobileOnly: true)");
console.log("Result:", JSON.stringify(result6a, null, 2));
console.log("✓ Valid (mobile):", result6a.isValid);
console.log("Input: 0123456789 (mobileOnly: true)");
console.log("Result:", JSON.stringify(result6b, null, 2));
console.log("✓ Valid (landline):", result6b.isValid);
console.log();

// Test 7: Invalid number
console.log("Test 7: Invalid number");
const result7 = validatePhoneNumber("12345");
console.log("Input: 12345");
console.log("Result:", JSON.stringify(result7, null, 2));
console.log("✓ Valid:", result7.isValid);
console.log();

// Test 8: Utility functions
console.log("Test 8: Utility functions");
const dialCode = getCountryDialCode("IN");
console.log("getCountryDialCode('IN'):", dialCode);

const country = getCountryCodeByDialCode("91");
console.log("getCountryCodeByDialCode('91'):", country);

const allCountries = getAllCountryCodes();
console.log("getAllCountryCodes():", allCountries.length, "countries");
console.log();

console.log("=== All tests completed ===");
