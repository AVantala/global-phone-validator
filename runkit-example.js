// RunKit Example for global-phone-validator
// Test this at: https://npm.runkit.com/global-phone-validator

const { validatePhoneNumber, getAllCountryCodes, getCountryDialCode } = require("global-phone-validator");

console.log("=== Global Phone Validator Test ===\n");

// Test 1: Indian mobile number
console.log("Test 1: Indian Mobile Number");
const result1 = validatePhoneNumber("+91 98765 43210");
console.log("Input: +91 98765 43210");
console.log("Result:", JSON.stringify(result1, null, 2));
console.log("✓ Valid:", result1.isValid);
console.log("✓ Mobile:", result1.isMobile);
console.log("✓ E.164:", result1.e164);
console.log();

// Test 2: US number
console.log("Test 2: US Number");
const result2 = validatePhoneNumber("+1 555 123 4567");
console.log("Input: +1 555 123 4567");
console.log("Result:", JSON.stringify(result2, null, 2));
console.log("✓ Valid:", result2.isValid);
console.log("✓ Country:", result2.country);
console.log();

// Test 3: UK number
console.log("Test 3: UK Number");
const result3 = validatePhoneNumber("+44 20 7946 0958");
console.log("Input: +44 20 7946 0958");
console.log("Result:", JSON.stringify(result3, null, 2));
console.log("✓ Valid:", result3.isValid);
console.log("✓ Country:", result3.countryName);
console.log();

// Test 4: Germany number
console.log("Test 4: Germany Number");
const result4 = validatePhoneNumber("+49 30 12345678");
console.log("Input: +49 30 12345678");
console.log("Result:", JSON.stringify(result4, null, 2));
console.log("✓ Valid:", result4.isValid);
console.log();

// Test 5: Australia number
console.log("Test 5: Australia Number");
const result5 = validatePhoneNumber("+61 2 1234 5678");
console.log("Input: +61 2 1234 5678");
console.log("Result:", JSON.stringify(result5, null, 2));
console.log("✓ Valid:", result5.isValid);
console.log();

// Test 6: Invalid number
console.log("Test 6: Invalid Number");
const result6 = validatePhoneNumber("12345");
console.log("Input: 12345");
console.log("Result:", JSON.stringify(result6, null, 2));
console.log("✓ Valid:", result6.isValid);
console.log();

// Test 7: Get country dial code
console.log("Test 7: Get Country Dial Code");
const dialCode = getCountryDialCode("IN");
console.log("getCountryDialCode('IN'):", dialCode);
console.log();

// Test 8: Get all countries count
console.log("Test 8: All Countries");
const allCountries = getAllCountryCodes();
console.log("Total countries supported:", allCountries.length);
console.log("Sample countries:", allCountries.slice(0, 5).map(c => c.name).join(", "));
console.log();

console.log("=== All tests completed ===");

// Export for RunKit interactive use
module.exports = {
  validatePhoneNumber,
  getAllCountryCodes,
  getCountryDialCode,
  examples: {
    india: validatePhoneNumber("+91 98765 43210"),
    usa: validatePhoneNumber("+1 555 123 4567"),
    uk: validatePhoneNumber("+44 20 7946 0958"),
    germany: validatePhoneNumber("+49 30 12345678"),
    australia: validatePhoneNumber("+61 2 1234 5678"),
  }
};

