"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var tests = [
    "+91 98765 43210",
    "0919876543210",
    "9876543210",
    "+4915123456789",
];
tests.forEach(function (num) {
    console.log((0, index_1.validatePhoneNumber)(num));
});
