const areObjects = require('are-objects');
const areArrays = require('are-arrays');

// =============================================================================
// BASIC ARITHMETIC OPERATIONS
// =============================================================================

/**
 * Adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The sum of the two numbers.
 */
function sum(a, b) {
    return a + b;
}

/**
 * Subtracts two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The difference between the two numbers.
 */
function sub(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The product of the two numbers.
 */
function mul(a, b) {
    return a * b;
}

/**
 * Divides two numbers.
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {number} - The quotient of the two numbers.
 */
function div(a, b) {
    return a / b;
}

// =============================================================================
// BIG NUMBER ARITHMETIC OPERATIONS
// =============================================================================

/**
 * Adds two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {string} - The sum of the two big numbers.
 */
function addBigNumbers(a, b) {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry > 0) {
        const digitA = i >= 0 ? parseInt(a[i], 10) : 0;
        const digitB = j >= 0 ? parseInt(b[j], 10) : 0;
        const sum = digitA + digitB + carry;
        
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }

    return result;
}

/**
 * Subtracts two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {string} - The difference between the two big numbers.
 */
function subBigNumbers(a, b) {
    if (a === b) return '0';
    
    let negative = false;
    if (a.length < b.length || (a.length === b.length && a < b)) {
        [a, b] = [b, a];
        negative = true;
    }
    
    const digitArrayA = a.split('').reverse();
    const digitArrayB = b.split('').reverse();
    const result = [];
    let borrow = 0;

    for (let i = 0; i < digitArrayA.length; i++) {
        const digitA = parseInt(digitArrayA[i], 10);
        const digitB = i < digitArrayB.length ? parseInt(digitArrayB[i], 10) : 0;
        let difference = digitA - digitB - borrow;
        
        if (difference < 0) {
            difference += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        
        result.push(difference);
    }

    // Remove leading zeros
    while (result[result.length - 1] === 0 && result.length > 1) {
        result.pop();
    }

    const finalResult = result.reverse().join('');
    return negative ? '-' + finalResult : finalResult;
}

/**
 * Multiplies two big numbers represented as strings.
 * @param {string} a - The first big number.
 * @param {string} b - The second big number.
 * @returns {string} - The product of the two big numbers.
 */
function mulBigNumbers(a, b) {
    if (a === '0' || b === '0') return '0';
    
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
    
    const result = new Array(a.length + b.length).fill(0);
    
    // Perform multiplication digit by digit
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            const product = parseInt(a[i], 10) * parseInt(b[j], 10);
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
    
    return (negative ? '-' : '') + result.join('');
}

/**
 * Divides two big numbers represented as strings.
 * @param {string} a - The dividend.
 * @param {string} b - The divisor.
 * @returns {string} - The quotient of the division.
 * @throws {Error} - If the divisor is "0".
 */
function divBigNumbers(a, b) {
    if (b === '0') throw new Error('Division by zero is not allowed.');
    if (a === '0') return '0';

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

    // Quick comparison check
    if (a.length < b.length || (a.length === b.length && a < b)) {
        return '0';
    }

    let quotient = '';
    let remainder = '';

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
    quotient = quotient.replace(/^0+/, '') || '0';

    return (negative ? '-' : '') + quotient;
}

/**
 * Calculates the modulus of two big numbers represented as strings.
 * @param {string} a - The dividend.
 * @param {string} b - The divisor.
 * @returns {string} - The remainder after division.
 * @throws {Error} - If the divisor is "0".
 */
function modBigNumbers(a, b) {
    if (b === '0') throw new Error('Modulus by zero is not allowed.');
    if (a === '0') return '0';
    
    let isNegative = false;
    if (a[0] === '-') {
        isNegative = true;
        a = a.slice(1);
    }
    
    if (b[0] === '-') {
        b = b.slice(1);
    }
    
    if (compareBigNumbers(a, b) < 0) {
        return isNegative ? '-' + a : a;
    }
    
    let remainder = '';
    
    for (let i = 0; i < a.length; i++) {
        remainder += a[i];
        remainder = remainder.replace(/^0+/, '') || '0';
        
        while (compareBigNumbers(remainder, b) >= 0) {
            remainder = subBigNumbers(remainder, b);
        }
    }
    
    return isNegative && remainder !== '0' ? '-' + remainder : remainder;
}

// =============================================================================
// COMPARISON AND UTILITY FUNCTIONS
// =============================================================================

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
    
    const bothNegative = a[0] === '-' && b[0] === '-';
    
    // Remove negative signs
    if (a[0] === '-') a = a.slice(1);
    if (b[0] === '-') b = b.slice(1);
    
    // Compare lengths
    if (a.length > b.length) return bothNegative ? -1 : 1;
    if (a.length < b.length) return bothNegative ? 1 : -1;
    
    // Compare digit by digit
    for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) return bothNegative ? -1 : 1;
        if (a[i] < b[i]) return bothNegative ? 1 : -1;
    }
    
    return 0;
}

/**
 * Formats a big number with commas for readability.
 * @param {string} n - The big number as a string.
 * @returns {string} - Formatted number with commas.
 */
function formatBigNumber(n) {
    if (!n || n === '0') return '0';
    
    const isNegative = n[0] === '-';
    if (isNegative) {
        n = n.slice(1);
    }
    
    const parts = n.split('.');
    const integerPart = parts[0];
    
    let formatted = '';
    for (let i = 0; i < integerPart.length; i++) {
        if (i > 0 && (integerPart.length - i) % 3 === 0) {
            formatted += ',';
        }
        formatted += integerPart[i];
    }
    
    if (parts.length > 1) {
        formatted += '.' + parts[1];
    }
    
    return isNegative ? '-' + formatted : formatted;
}

// =============================================================================
// ADVANCED MATHEMATICAL OPERATIONS
// =============================================================================

/**
 * Calculates the power of a big number raised to an exponent.
 * @param {string} base - The base.
 * @param {number} exponent - The exponent (non-negative integer).
 * @returns {string} - The result of the power operation.
 */
function powBigNumbers(base, exponent) {
    if (exponent < 0) {
        throw new Error('Negative exponents not supported');
    }
    
    if (exponent === 0) return '1';
    if (exponent === 1) return base;
    if (base === '0') return '0';
    if (base === '1') return '1';
    
    let result = '1';
    for (let i = 0; i < exponent; i++) {
        result = mulBigNumbers(result, base);
    }
    
    return result;
}

/**
 * Calculates the factorial of a number.
 * @param {number} n - A non-negative integer.
 * @returns {string} - The factorial result as a string.
 * @throws {Error} - If input is negative or not an integer.
 */
function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Input must be a non-negative integer');
    }
    
    if (n <= 1) return '1';
    
    let result = '1';
    for (let i = 2; i <= n; i++) {
        result = mulBigNumbers(result, i.toString());
    }
    
    return result;
}

/**
 * Calculates the greatest common divisor (GCD) of two big numbers.
 * @param {string} a - First big number as a string.
 * @param {string} b - Second big number as a string.
 * @returns {string} - The GCD as a string.
 */
function gcdBigNumbers(a, b) {
    // Remove negative signs
    if (a[0] === '-') a = a.slice(1);
    if (b[0] === '-') b = b.slice(1);
    
    if (b === '0') return a;
    
    return gcdBigNumbers(b, modBigNumbers(a, b));
}

/**
 * Calculates the least common multiple (LCM) of two big numbers.
 * @param {string} a - First big number as a string.
 * @param {string} b - Second big number as a string.
 * @returns {string} - The LCM as a string.
 */
function lcmBigNumbers(a, b) {
    // Remove negative signs
    if (a[0] === '-') a = a.slice(1);
    if (b[0] === '-') b = b.slice(1);
    
    const product = mulBigNumbers(a, b);
    const gcd = gcdBigNumbers(a, b);
    
    return divBigNumbers(product, gcd);
}

/**
 * Calculates the square root of a big number using the Babylonian method.
 * @param {string} n - A non-negative big number as a string.
 * @param {number} precision - Number of decimal places (default: 0).
 * @returns {string} - The square root result as a string.
 * @throws {Error} - If input is negative.
 */
function sqrtBigNumbers(n, precision = 0) {
    if (n[0] === '-') {
        throw new Error('Cannot calculate square root of a negative number');
    }
    
    if (n === '0' || n === '1') return n;
    
    // Scale for decimal precision
    let scaledN = n;
    for (let i = 0; i < 2 * precision; i++) {
        scaledN += '0';
    }
    
    // Initial guess
    let x = '1';
    for (let i = 0; i < Math.floor(scaledN.length / 2); i++) {
        x += '0';
    }
    
    // Babylonian method
    let prevX = '0';
    while (compareBigNumbers(subBigNumbers(x, prevX), '1') > 0) {
        prevX = x;
        const quotient = divBigNumbers(scaledN, x);
        const sum = addBigNumbers(x, quotient);
        x = divBigNumbers(sum, '2');
    }
    
    // Format result with decimal point
    if (precision > 0) {
        const integerPart = x.slice(0, -precision);
        const decimalPart = x.slice(-precision);
        return integerPart + (decimalPart ? '.' + decimalPart : '');
    }
    
    return x;
}

// =============================================================================
// NUMBER CONVERSION AND SPECIALIZED FUNCTIONS
// =============================================================================

/**
 * Converts a number between different bases.
 * @param {string} number - The number to convert.
 * @param {number} fromBase - The base of the input number (2-36).
 * @param {number} toBase - The base to convert to (2-36).
 * @returns {string} - The converted number.
 */
function convertBase(number, fromBase, toBase) {
    if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
        throw new Error('Bases must be between 2 and 36');
    }
    
    const isNegative = number[0] === '-';
    if (isNegative) {
        number = number.slice(1);
    }
    
    let decimal = '0';
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Convert to decimal
    for (let i = 0; i < number.length; i++) {
        const digit = number[i].toUpperCase();
        const value = digits.indexOf(digit);
        
        if (value === -1 || value >= fromBase) {
            throw new Error(`Invalid digit "${number[i]}" for base ${fromBase}`);
        }
        
        decimal = addBigNumbers(mulBigNumbers(decimal, fromBase.toString()), value.toString());
    }
    
    // Convert to target base
    if (decimal === '0') return '0';
    
    let result = '';
    while (decimal !== '0') {
        const remainder = modBigNumbers(decimal, toBase.toString());
        const value = parseInt(remainder, 10);
        result = digits[value] + result;
        decimal = divBigNumbers(decimal, toBase.toString());
    }
    
    return isNegative ? '-' + result : result;
}

/**
 * Calculates (base^exponent) % modulus efficiently for big numbers.
 * @param {string} base - The base.
 * @param {string} exponent - The exponent.
 * @param {string} modulus - The modulus.
 * @returns {string} - The result of the modular exponentiation.
 */
function powModBigNumbers(base, exponent, modulus) {
    if (modulus === '1') return '0';
    if (exponent === '0') return '1';
    
    if (exponent[0] === '-') {
        throw new Error('Negative exponents not supported in modular exponentiation');
    }
    
    // Convert exponent to binary
    const binaryExp = [];
    let exp = exponent;
    while (exp !== '0') {
        binaryExp.push(modBigNumbers(exp, '2'));
        exp = divBigNumbers(exp, '2');
    }
    
    let result = '1';
    let baseMod = modBigNumbers(base, modulus);
    
    for (let i = 0; i < binaryExp.length; i++) {
        if (binaryExp[i] === '1') {
            result = modBigNumbers(mulBigNumbers(result, baseMod), modulus);
        }
        baseMod = modBigNumbers(mulBigNumbers(baseMod, baseMod), modulus);
    }
    
    return result;
}

/**
 * Checks if a big number is prime using the Miller-Rabin primality test.
 * @param {string} n - The number to check.
 * @param {number} k - Number of iterations for the test (default: 10).
 * @returns {boolean} - True if the number is probably prime, false otherwise.
 */
function isPrimeBigNumber(n, k = 10) {
    if (n === '0' || n === '1') return false;
    if (n === '2' || n === '3') return true;
    
    // Check if even
    if (parseInt(n[n.length - 1], 10) % 2 === 0) return false;
    
    // Write n-1 as 2^r * d
    let d = subBigNumbers(n, '1');
    let r = 0;
    
    while (modBigNumbers(d, '2') === '0') {
        d = divBigNumbers(d, '2');
        r++;
    }
    
    // Predefined test bases for deterministic testing
    const testBases = ['2', '3', '5', '7', '11', '13', '17', '19', '23', '29'];
    const nMinus2 = subBigNumbers(n, '2');
    
    // Witness loop
    witnessLoop: for (let i = 0; i < Math.min(k, testBases.length); i++) {
        let a = testBases[i];
        
        if (compareBigNumbers(a, nMinus2) >= 0) {
            a = subBigNumbers(a, '1');
        }
        
        let x = powModBigNumbers(a, d, n);
        
        if (x === '1' || x === subBigNumbers(n, '1')) continue;
        
        for (let j = 0; j < r - 1; j++) {
            x = powModBigNumbers(x, '2', n);
            if (x === subBigNumbers(n, '1')) continue witnessLoop;
            if (x === '1') return false;
        }
        
        return false;
    }
    
    return true;
}

// =============================================================================
// EXPORTS
// =============================================================================

module.exports = {
    // Basic operations
    sum,
    sub,
    mul,
    div,
    
    // Big number operations
    addBigNumbers,
    subBigNumbers,
    mulBigNumbers,
    divBigNumbers,
    modBigNumbers,
    compareBigNumbers,
    
    // Advanced operations
    powBigNumbers,
    factorial,
    gcdBigNumbers,
    lcmBigNumbers,
    sqrtBigNumbers,
    
    // Utility functions
    formatBigNumber,
    convertBase,
    
    // Specialized functions
    powModBigNumbers,
    isPrimeBigNumber
};
