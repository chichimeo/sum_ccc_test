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
