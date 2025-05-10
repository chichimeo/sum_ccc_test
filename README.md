# BigMath.js

BigMath.js is a JavaScript library providing precise arithmetic operations for large integers not limited by JavaScript's number precision constraints. The library represents large numbers as strings and performs calculations through basic arithmetic algorithms.

## Installation

```bash
npm install bigmath-js
```

## Dependencies

This library depends on:

```
"are-objects": "^1.1.1",
"are-arrays": "^1.0.1"
```

## Usage

```javascript
const bigMath = require('bigmath-js');

// Perform addition with large numbers
const sum = bigMath.addBigNumbers("12345678901234567890", "98765432109876543210");
console.log(sum); // "111111111011111111100"

// Calculate powers
const power = bigMath.powBigNumbers("2", 256);
console.log(power); // "115792089237316195423570985008687907853269984665640564039457584007913129639936"
```

## API

### Basic Operations

#### `sum(a, b)` 
Adds two regular numbers.
```javascript
bigMath.sum(5, 3); // 8
```

#### `sub(a, b)` 
Subtracts two regular numbers.
```javascript
bigMath.sub(10, 4); // 6
```

#### `mul(a, b)` 
Multiplies two regular numbers.
```javascript
bigMath.mul(6, 7); // 42
```

#### `div(a, b)` 
Divides two regular numbers.
```javascript
bigMath.div(20, 5); // 4
```

### Big Number Operations

#### `addBigNumbers(a, b)` 
Adds two large numbers represented as strings.
```javascript
bigMath.addBigNumbers("999999999999999", "1"); // "1000000000000000"
```

#### `subBigNumbers(a, b)` 
Subtracts two large numbers represented as strings.
```javascript
bigMath.subBigNumbers("1000000000000000", "1"); // "999999999999999"
```

#### `mulBigNumbers(a, b)` 
Multiplies two large numbers represented as strings.
```javascript
bigMath.mulBigNumbers("12345", "67890"); // "838102050"
```

#### `divBigNumbers(a, b)` 
Divides two large numbers represented as strings.
```javascript
bigMath.divBigNumbers("9876543210", "42"); // "235155790"
```

#### `modBigNumbers(a, b)` 
Calculates the modulus of two large numbers.
```javascript
bigMath.modBigNumbers("9876543210", "42"); // "30"
```

#### `compareBigNumbers(a, b)` 
Compares two large numbers. Returns 1 if a > b, -1 if a < b, and 0 if a = b.
```javascript
bigMath.compareBigNumbers("10000", "9999"); // 1
bigMath.compareBigNumbers("10000", "10000"); // 0
bigMath.compareBigNumbers("9999", "10000"); // -1
```

### Advanced Math

#### `powBigNumbers(base, exponent)` 
Calculates the power of a large number.
```javascript
bigMath.powBigNumbers("2", 128); // "340282366920938463463374607431768211456"
```

#### `factorial(n)` 
Calculates the factorial of a number.
```javascript
bigMath.factorial(20); // "2432902008176640000"
```

#### `gcdBigNumbers(a, b)` 
Finds the greatest common divisor (GCD) of two large numbers.
```javascript
bigMath.gcdBigNumbers("123456789", "987654321"); // "9"
```

#### `lcmBigNumbers(a, b)` 
Finds the least common multiple (LCM) of two large numbers.
```javascript
bigMath.lcmBigNumbers("12", "18"); // "36"
```

#### `sqrtBigNumbers(n, precision)` 
Calculates the square root of a large number with optional precision.
```javascript
bigMath.sqrtBigNumbers("1000000", 2); // "1000.00"
```

#### `powModBigNumbers(base, exponent, modulus)` 
Calculates (base^exponent) % modulus efficiently for large numbers.
```javascript
bigMath.powModBigNumbers("2", "20", "1000"); // "576"
```

### Utilities

#### `formatBigNumber(n)` 
Formats a large number with commas for readability.
```javascript
bigMath.formatBigNumber("1234567890123456789"); // "1,234,567,890,123,456,789"
```

#### `convertBase(number, fromBase, toBase)` 
Converts a number between different bases (2-36).
```javascript
bigMath.convertBase("FF", 16, 10); // "255"
bigMath.convertBase("255", 10, 16); // "FF"
bigMath.convertBase("11111111", 2, 16); // "FF"
```

#### `isPrimeBigNumber(n, k)` 
Checks if a large number is prime (using the Miller-Rabin primality test).
```javascript
bigMath.isPrimeBigNumber("997"); // true
bigMath.isPrimeBigNumber("999"); // false
```

## Examples

### Calculate 2^1000
```javascript
const result = bigMath.powBigNumbers("2", 1000);
console.log(result);
// "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376"
```

### Find 100!
```javascript
const result = bigMath.factorial(100);
console.log(result);
// "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"
```

### Check if a large number is prime
```javascript
const isPrime = bigMath.isPrimeBigNumber("100000000000000000000000000000000000000000000000000031");
console.log(isPrime); // true
```

## Performance Notes

- The library is designed to handle large numbers accurately with reasonable performance.
- For very large numbers (thousands of digits), some operations may take longer to complete.
- For smaller numbers that can be accurately represented by regular JavaScript numbers, it's recommended to use the standard arithmetic functions (`sum`, `sub`, `mul`, `div`).

## License

MIT
