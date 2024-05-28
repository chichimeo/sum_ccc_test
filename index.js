const areObjects = require('are-objects');
const areArrays = require('are-arrays');

/**
 * Adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The sum of the two numbers.
 */
function sum(a, b) {
    return a + b;
}
exports.sum = sum;

/**
 * Subtracts two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The difference between the two numbers.
 */
function sub(a, b) {
    return a - b;
}
exports.sub = sub;

/**
 * Multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The product of the two numbers.
 */
function mul(a, b) {
    return a * b;
}
exports.mul = mul;

/**
 * Divides two numbers.
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {number} - The quotient of the two numbers.
 */
function div(a, b) {
    return a / b;
}
exports.div = div;

/**
 * Adds two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {string} - The sum of the two big numbers.
 */
function addBigNumbers(a, b) {    let result = "";
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry > 0) {
        let digitA = i >= 0 ? parseInt(a[i]) : 0;
        let digitB = j >= 0 ? parseInt(b[j]) : 0;
        let sum = digitA + digitB + carry;
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }

    return result;
}
exports.addBigNumbers = addBigNumbers;
