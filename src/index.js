"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = void 0;
var utils_1 = require("./utils");
function validatePhoneNumber(input, defaultCountry, mobileOnly) {
    if (defaultCountry === void 0) { defaultCountry = "IN"; }
    if (mobileOnly === void 0) { mobileOnly = false; }
    var cleaned = (0, utils_1.cleanPhoneNumber)(input);
    var countryDial = (0, utils_1.getCountryDialCode)(defaultCountry);
    if (!countryDial)
        return { isValid: false };
    var countryCode = "";
    var nationalNumber = "";
    // Handle +CC or 0-prefixed or plain
    if (cleaned.startsWith("+")) {
        var match = cleaned.match(/^\+(\d{1,4})(\d{6,14})$/);
        if (!match)
            return { isValid: false };
        countryCode = match[1];
        nationalNumber = match[2];
    }
    else if (cleaned.startsWith("0")) {
        countryCode = countryDial;
        nationalNumber = cleaned.slice(1);
    }
    else {
        countryCode = countryDial;
        nationalNumber = cleaned;
    }
    // Basic validation rules
    if (countryCode === "91") {
        if (!/^[6-9]\d{9}$/.test(nationalNumber))
            return { isValid: false };
    }
    else {
        if (!/^\d{6,14}$/.test(nationalNumber))
            return { isValid: false };
    }
    // Optional Mobile/Fixed line detection (India)
    var isMobile;
    var isFixedLine;
    if (countryCode === "91") {
        var firstDigit = nationalNumber[0];
        if ("6789".includes(firstDigit)) {
            isMobile = true;
            isFixedLine = false;
        }
        else {
            isMobile = false;
            isFixedLine = true;
        }
    }
    // If mobileOnly is true, fail non-mobile numbers
    if (mobileOnly && countryCode === "91" && !isMobile)
        return { isValid: false };
    return {
        isValid: true,
        countryCode: countryCode,
        nationalNumber: nationalNumber,
        e164: "+".concat(countryCode).concat(nationalNumber),
        isMobile: isMobile,
        isFixedLine: isFixedLine,
    };
}
exports.validatePhoneNumber = validatePhoneNumber;
