import {
  validatePhoneNumber,
  getAllCountryCodes,
  getCountryDialCode,
  getCountryCodeByDialCode,
} from "../src/index";

console.log("=== Global Phone Validator Test Suite ===\n");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => boolean) {
  try {
    if (fn()) {
      console.log(`✓ ${name}`);
      passed++;
    } else {
      console.log(`✗ ${name}`);
      failed++;
    }
  } catch (error) {
    console.log(`✗ ${name} - Error: ${error}`);
    failed++;
  }
}

test("India mobile number validation", () => {
  const result = validatePhoneNumber("+91 98765 43210");
  return (
    result.isValid === true &&
    result.countryCode === "91" &&
    result.isMobile === true &&
    result.phoneType === "mobile" &&
    result.e164 === "+919876543210"
  );
});

test("India 0-prefixed format", () => {
  const result = validatePhoneNumber("09876543210", "IN");
  return result.isValid === true && result.countryCode === "91";
});

test("India plain digits with country", () => {
  const result = validatePhoneNumber("9876543210", "IN");
  return result.isValid === true && result.isMobile === true;
});

test("US phone number validation", () => {
  const result = validatePhoneNumber("+1 555 123 4567");
  return (
    result.isValid === true &&
    result.countryCode === "1" &&
    result.country === "US" &&
    result.e164 === "+15551234567"
  );
});

test("Germany mobile number validation", () => {
  const result = validatePhoneNumber("+491761234567");
  return (
    result.isValid === true &&
    result.countryCode === "49" &&
    result.phoneType === "mobile" &&
    result.country === "DE"
  );
});

test("UK mobile number validation", () => {
  const result = validatePhoneNumber("+447123456789");
  return (
    result.isValid === true &&
    result.phoneType === "mobile" &&
    result.country === "GB"
  );
});

test("UK landline number validation", () => {
  const result = validatePhoneNumber("+442079460958");
  return (
    result.isValid === true &&
    result.phoneType === "landline" &&
    result.country === "GB"
  );
});

test("Toll-free number detection (US)", () => {
  const result = validatePhoneNumber("+18001234567");
  return result.isValid === true && result.phoneType === "toll-free";
});

test("Toll-free number detection (UK)", () => {
  const result = validatePhoneNumber("+448001234567");
  return result.isValid === true && result.phoneType === "toll-free";
});

test("Premium number detection (US)", () => {
  const result = validatePhoneNumber("+19001234567");
  return result.isValid === true && result.phoneType === "premium";
});

test("Mobile-only validation (accepts mobile)", () => {
  const result = validatePhoneNumber("9876543210", "IN", true);
  return result.isValid === true && result.isMobile === true;
});

test("Mobile-only validation (rejects landline)", () => {
  const result = validatePhoneNumber("0123456789", "IN", true);
  return result.isValid === false;
});

test("Invalid phone number", () => {
  const result = validatePhoneNumber("12345");
  return result.isValid === false;
});

test("Country code detection from + prefix", () => {
  const result = validatePhoneNumber("+4917677274194");
  return result.isValid === true && result.country === "DE";
});

test("Strict country matching (matching)", () => {
  const result = validatePhoneNumber("+4917677274194", "DE");
  return result.isValid === true;
});

test("Strict country matching (non-matching)", () => {
  const result = validatePhoneNumber("+4917677274194", "IN");
  return result.isValid === false;
});

test("Get country dial code", () => {
  const code = getCountryDialCode("IN");
  return code === "91";
});

test("Get country by dial code", () => {
  const country = getCountryCodeByDialCode("91");
  return country?.code === "IN" && country?.name === "India";
});

test("Get all country codes", () => {
  const countries = getAllCountryCodes();
  return Array.isArray(countries) && countries.length > 0;
});

test("China mobile number", () => {
  const result = validatePhoneNumber("+8613800138000");
  return (
    result.isValid === true &&
    result.phoneType === "mobile" &&
    result.country === "CN"
  );
});

test("Japan mobile number", () => {
  const result = validatePhoneNumber("+817012345678");
  return (
    result.isValid === true &&
    result.phoneType === "mobile" &&
    result.country === "JP"
  );
});

test("Australia mobile number", () => {
  const result = validatePhoneNumber("+61412345678");
  return (
    result.isValid === true &&
    result.phoneType === "mobile" &&
    result.country === "AU"
  );
});

console.log("\n=== Test Results ===");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);
console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failed === 0) {
  console.log("\n✓ All tests passed!");
  process.exit(0);
} else {
  console.log("\n✗ Some tests failed");
  process.exit(1);
}
