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

/**
 * Subtracts two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {string} - The difference between the two big numbers.
 */
function subBigNumbers(a, b) {
    if (a === b) return "0";
    let negative = false;
    if (a.length < b.length || (a.length === b.length && a < b)) {
        [a, b] = [b, a];
        negative = true;
    }
    a = a.split('').reverse();
    b = b.split('').reverse();

    let result = [];
    let borrow = 0;

    for (let i = 0; i < a.length; i++) {
        let digitA = parseInt(a[i], 10);
        let digitB = i < b.length ? parseInt(b[i], 10) : 0;
        let sub = digitA - digitB - borrow;
        if (sub < 0) {
            sub += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        result.push(sub);
    }

    while (result[result.length - 1] === 0) {
        result.pop();
    }

    let finalResult = result.reverse().join('');
    return negative ? '-' + finalResult : finalResult;
}

exports.subBigNumbers = subBigNumbers;

/**
 * Divides two big numbers represented as strings.
 * @param {string} a - The dividend (large number as a string).
 * @param {string} b - The divisor (large number as a string).
 * @returns {string} - The quotient of the division.
 * @throws {Error} - If the divisor is "0".
 */
function divBigNumbers(a, b) {
  if (b === "0") throw new Error("Division by zero is not allowed.");
  if (a === "0") return "0";

  let negative = false;

  // Handle negative numbers
  if (a[0] === '-') {
    negative = !negative;
    a = a.slice(1);
  }
  if (b[0] === '-') {
    negative = !negative;
    b = b.slice(1);
  }

  // Compare magnitude of numbers
  if (a.length < b.length || (a.length === b.length && a < b)) {
    return "0";
  }

  let quotient = "";
  let remainder = "";

  for (let i = 0; i < a.length; i++) {
    remainder += a[i];
    let currentQuotient = 0;

    while (compareBigNumbers(remainder, b) >= 0) {
      remainder = subBigNumbers(remainder, b);
      currentQuotient++;
    }

    quotient += currentQuotient;
  }

  // Remove leading zeros
  quotient = quotient.replace(/^0+/, "");

  return (negative ? "-" : "") + quotient;
}
exports.divBigNumbers = divBigNumbers;
