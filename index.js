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
function addBigNumbers(a, b) {    
    let result = "";
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

    while (result[result.length - 1] === 0 && result.length > 1) {
        result.pop();
    }

    let finalResult = result.reverse().join('');
    return negative ? '-' + finalResult : finalResult;
}
exports.subBigNumbers = subBigNumbers;

/**
 * Compares two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {number} - Returns 1 if a > b, -1 if a < b, and 0 if a === b.
 */
function compareBigNumbers(a, b) {
    // Handle negative numbers
    if (a[0] === '-' && b[0] !== '-') return -1;
    if (a[0] !== '-' && b[0] === '-') return 1;
    
    // Both negative or both positive
    const bothNegative = a[0] === '-' && b[0] === '-';
    
    // Remove negative signs if present
    if (a[0] === '-') a = a.slice(1);
    if (b[0] === '-') b = b.slice(1);
    
    // Compare lengths first
    if (a.length > b.length) return bothNegative ? -1 : 1;
    if (a.length < b.length) return bothNegative ? 1 : -1;
    
    // Same length, compare digit by digit
    for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) return bothNegative ? -1 : 1;
        if (a[i] < b[i]) return bothNegative ? 1 : -1;
    }
    
    // Equal
    return 0;
}
exports.compareBigNumbers = compareBigNumbers;

/**
 * Multiplies two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {string} - The product of the two big numbers.
 */
function mulBigNumbers(a, b) {
    if (a === "0" || b === "0") return "0";
    
    // Handle negative numbers
    let negative = false;
    if (a[0] === '-') {
        negative = !negative;
        a = a.slice(1);
    }
    if (b[0] === '-') {
        negative = !negative;
        b = b.slice(1);
    }
    
    // Initialize result array with zeros
    const result = new Array(a.length + b.length).fill(0);
    
    // Perform multiplication digit by digit
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            const product = parseInt(a[i]) * parseInt(b[j]);
            const position = i + j + 1;
            const sum = result[position] + product;
            
            result[position] = sum % 10;
            result[position - 1] += Math.floor(sum / 10);
        }
    }
    
    // Remove leading zeros
    while (result[0] === 0 && result.length > 1) {
        result.shift();
    }
    
    return (negative ? "-" : "") + result.join('');
}
exports.mulBigNumbers = mulBigNumbers;

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
    quotient = quotient.replace(/^0+/, "") || "0";

    return (negative ? "-" : "") + quotient;
}
exports.divBigNumbers = divBigNumbers;

/**
 * Calculates the modulus of two big numbers represented as strings.
 * @param {string} a - The dividend.
 * @param {string} b - The divisor.
 * @returns {string} - The remainder after division.
 * @throws {Error} - If the divisor is "0".
 */
function modBigNumbers(a, b) {
    if (b === "0") throw new Error("Modulus by zero is not allowed.");
    if (a === "0") return "0";
    
    // Handle negative dividend
    let isNegative = false;
    if (a[0] === '-') {
        isNegative = true;
        a = a.slice(1);
    }
    
    // Handle negative divisor
    if (b[0] === '-') {
        b = b.slice(1);
    }
    
    // Simple case: a < b
    if (compareBigNumbers(a, b) < 0) {
        return isNegative ? "-" + a : a;
    }
    
    let remainder = "";
    
    for (let i = 0; i < a.length; i++) {
        remainder += a[i];
        
        // Remove leading zeros
        remainder = remainder.replace(/^0+/, "") || "0";
        
        while (compareBigNumbers(remainder, b) >= 0) {
            remainder = subBigNumbers(remainder, b);
        }
    }
    
    // Apply sign to the result
    return isNegative && remainder !== "0" ? "-" + remainder : remainder;
}
exports.modBigNumbers = modBigNumbers;

/**
 * Calculates the power of a big number raised to an exponent.
 * @param {string} base - The base (large number as a string).
 * @param {number} exponent - The exponent (must be a non-negative integer).
 * @returns {string} - The result of the power operation.
 */
function powBigNumbers(base, exponent) {
    if (exponent < 0) {
        throw new Error("Negative exponents not supported");
    }
    
    if (exponent === 0) return "1";
    if (exponent === 1) return base;
    if (base === "0") return "0";
    if (base === "1") return "1";
    
    let result = "1";
    for (let i = 0; i < exponent; i++) {
        result = mulBigNumbers(result, base);
    }
    
    return result;
}
exports.powBigNumbers = powBigNumbers;

/**
 * Calculates the factorial of a number.
 * @param {number} n - A non-negative integer.
 * @returns {string} - The factorial result as a string.
 * @throws {Error} - If input is negative or not an integer.
 */
function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Input must be a non-negative integer");
    }
    
    if (n <= 1) return "1";
    
    let result = "1";
    for (let i = 2; i <= n; i++) {
        result = mulBigNumbers(result, i.toString());
    }
    
    return result;
}
exports.factorial = factorial;

/**
 * Calculates the greatest common divisor (GCD) of two big numbers.
 * @param {string} a - First big number as a string.
 * @param {string} b - Second big number as a string.
 * @returns {string} - The GCD as a string.
 */
function gcdBigNumbers(a, b) {
    // Remove negative signs if present
    if (a[0] === '-') a = a.slice(1);
    if (b[0] === '-') b = b.slice(1);
    
    // Base case
    if (b === "0") return a;
    
    // Recursive Euclidean algorithm
    return gcdBigNumbers(b, modBigNumbers(a, b));
}
exports.gcdBigNumbers = gcdBigNumbers;

/**
 * Calculates the least common multiple (LCM) of two big numbers.
 * @param {string} a - First big number as a string.
 * @param {string} b - Second big number as a string.
 * @returns {string} - The LCM as a string.
 */
function lcmBigNumbers(a, b) {
    // Remove negative signs if present
    if (a[0] === '-') a = a.slice(1);
    if (b[0] === '-') b = b.slice(1);
    
    // LCM calculation: |a*b|/gcd(a,b)
    const product = mulBigNumbers(a, b);
    const gcd = gcdBigNumbers(a, b);
    
    return divBigNumbers(product, gcd);
}
exports.lcmBigNumbers = lcmBigNumbers;

/**
 * Calculates the square root of a big number using the Babylonian method.
 * @param {string} n - A non-negative big number as a string.
 * @param {number} precision - Number of decimal places (default: 0 for integer result).
 * @returns {string} - The square root result as a string.
 * @throws {Error} - If input is negative.
 */
function sqrtBigNumbers(n, precision = 0) {
    if (n[0] === '-') {
        throw new Error("Cannot calculate square root of a negative number");
    }
    
    if (n === "0" || n === "1") return n;
    
    // Scale the number by 10^(2*precision) to handle decimals
    let scaledN = n;
    for (let i = 0; i < 2 * precision; i++) {
        scaledN += "0";
    }
    
    // Initial guess: half the number of digits in n
    let x = "1";
    for (let i = 0; i < Math.floor(scaledN.length / 2); i++) {
        x += "0";
    }
    
    // Babylonian method iterations
    let prevX = "0";
    while (compareBigNumbers(subBigNumbers(x, prevX), "1") > 0) {
        prevX = x;
        // x = (x + n/x) / 2
        const div = divBigNumbers(scaledN, x);
        const sum = addBigNumbers(x, div);
        x = divBigNumbers(sum, "2");
    }
    
    // Insert decimal point if precision > 0
    if (precision > 0) {
        const integerPart = x.slice(0, -precision);
        const decimalPart = x.slice(-precision);
        return integerPart + (decimalPart ? "." + decimalPart : "");
    }
    
    return x;
}
exports.sqrtBigNumbers = sqrtBigNumbers;

/**
 * Formats a big number with commas for readability.
 * @param {string} n - The big number as a string.
 * @returns {string} - Formatted number with commas.
 */
function formatBigNumber(n) {
    if (!n || n === "0") return "0";
    
    // Handle negative numbers
    const isNegative = n[0] === '-';
    if (isNegative) {
        n = n.slice(1);
    }
    
    // Split into integer and decimal parts if there's a decimal point
    const parts = n.split('.');
    const integerPart = parts[0];
    
    // Add commas to the integer part
    let formatted = "";
    for (let i = 0; i < integerPart.length; i++) {
        if (i > 0 && (integerPart.length - i) % 3 === 0) {
            formatted += ",";
        }
        formatted += integerPart[i];
    }
    
    // Add decimal part if it exists
    if (parts.length > 1) {
        formatted += "." + parts[1];
    }
    
    return isNegative ? "-" + formatted : formatted;
}
exports.formatBigNumber = formatBigNumber;

/**
 * Converts a number between different bases.
 * @param {string} number - The number to convert.
 * @param {number} fromBase - The base of the input number (2-36).
 * @param {number} toBase - The base to convert to (2-36).
 * @returns {string} - The converted number.
 */
function convertBase(number, fromBase, toBase) {
    if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
        throw new Error("Bases must be between 2 and 36");
    }
    
    // Handle negative numbers
    const isNegative = number[0] === '-';
    if (isNegative) {
        number = number.slice(1);
    }
    
    // Convert to decimal first
    let decimal = "0";
    const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // Calculate decimal value
    for (let i = 0; i < number.length; i++) {
        const digit = number[i].toUpperCase();
        const value = digits.indexOf(digit);
        
        if (value === -1 || value >= fromBase) {
            throw new Error(`Invalid digit "${number[i]}" for base ${fromBase}`);
        }
        
        decimal = addBigNumbers(mulBigNumbers(decimal, fromBase.toString()), value.toString());
    }
    
    // Convert from decimal to target base
    if (decimal === "0") return "0";
    
    let result = "";
    while (decimal !== "0") {
        const remainder = modBigNumbers(decimal, toBase.toString());
        const value = parseInt(remainder, 10);
        result = digits[value] + result;
        decimal = divBigNumbers(decimal, toBase.toString());
    }
    
    return isNegative ? "-" + result : result;
}
exports.convertBase = convertBase;

/**
 * Checks if a big number is prime using the Miller-Rabin primality test.
 * @param {string} n - The number to check.
 * @param {number} k - Number of iterations for the test (higher is more accurate).
 * @returns {boolean} - True if the number is probably prime, false otherwise.
 */
function isPrimeBigNumber(n, k = 10) {
    if (n === "0" || n === "1") return false;
    if (n === "2" || n === "3") return true;
    
    // Check if even
    if (parseInt(n[n.length - 1]) % 2 === 0) return false;
    
    // Write n-1 as 2^r * d
    let d = subBigNumbers(n, "1");
    let r = 0;
    
    while (modBigNumbers(d, "2") === "0") {
        d = divBigNumbers(d, "2");
        r++;
    }
    
    // Witness loop
    witnessLoop: for (let i = 0; i < k; i++) {
        // Generate random number between 2 and n-2
        const nMinus2 = subBigNumbers(n, "2");
        let a = "2"; // Use a fixed sequence of bases for simplicity
        
        if (i === 0) a = "2";
        else if (i === 1) a = "3";
        else if (i === 2) a = "5";
        else if (i === 3) a = "7";
        else if (i === 4) a = "11";
        else if (i === 5) a = "13";
        else if (i === 6) a = "17";
        else if (i === 7) a = "19";
        else if (i === 8) a = "23";
        else a = "29";
        
        if (compareBigNumbers(a, nMinus2) >= 0) {
            a = subBigNumbers(a, "1");
        }
        
        // x = a^d mod n
        let x = powModBigNumbers(a, d, n);
        
        if (x === "1" || x === subBigNumbers(n, "1")) continue;
        
        for (let j = 0; j < r - 1; j++) {
            x = powModBigNumbers(x, "2", n);
            if (x === subBigNumbers(n, "1")) continue witnessLoop;
            if (x === "1") return false;
        }
        
        return false;
    }
    
    return true;
}
exports.isPrimeBigNumber = isPrimeBigNumber;

/**
 * Calculates (base^exponent) % modulus efficiently for big numbers.
 * @param {string} base - The base.
 * @param {string} exponent - The exponent.
 * @param {string} modulus - The modulus.
 * @returns {string} - The result of the modular exponentiation.
 */
function powModBigNumbers(base, exponent, modulus) {
    if (modulus === "1") return "0";
    if (exponent === "0") return "1";
    
    // Remove negative signs if present in exponent
    const isNegativeExponent = exponent[0] === '-';
    if (isNegativeExponent) {
        throw new Error("Negative exponents not supported in modular exponentiation");
    }
    
    // Convert exponent to binary for efficient calculation
    let binaryExp = [];
    let exp = exponent;
    while (exp !== "0") {
        binaryExp.push(modBigNumbers(exp, "2"));
        exp = divBigNumbers(exp, "2");
    }
    
    let result = "1";
    let baseMod = modBigNumbers(base, modulus);
    
    for (let i = 0; i < binaryExp.length; i++) {
        if (binaryExp[i] === "1") {
            result = modBigNumbers(mulBigNumbers(result, baseMod), modulus);
        }
        baseMod = modBigNumbers(mulBigNumbers(baseMod, baseMod), modulus);
    }
    
    return result;
}
exports.powModBigNumbers = powModBigNumbers;
