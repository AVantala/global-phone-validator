"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanPhoneNumber = exports.getCountryDialCode = void 0;
var CountryCodes_json_1 = require("./CountryCodes.json");
function getCountryDialCode(countryCode) {
    var country = CountryCodes_json_1.default.find(function (c) { return c.code.toUpperCase() === countryCode.toUpperCase(); });
    return country ? country.dial_code.replace("+", "") : null;
}
exports.getCountryDialCode = getCountryDialCode;
function cleanPhoneNumber(input) {
    // Remove spaces, dashes, parentheses, etc.
    return input.replace(/\s+/g, "").replace(/[^0-9+]/g, "");
}
exports.cleanPhoneNumber = cleanPhoneNumber;
