/**
 * @fileoverview Unit tests for the addBigNumbers function. 
 */
const { addBigNumbers } = require('./index.js');

describe('addBigNumbers', () => {
    /**
     * Test case: should add two big numbers correctly
     */
    test('should add two big numbers correctly', () => {
        const result = addBigNumbers('123456789', '987654321');
        expect(result).toBe('1111111110');
    });

    /**
     * Test case: should handle carry correctly
     */
    test('should handle carry correctly', () => {
        const result = addBigNumbers('999', '1');
        expect(result).toBe('1000');
    });

    /**
     * Test case: should handle different length numbers
     */
    test('should handle different length numbers', () => {
        const result = addBigNumbers('123', '456789');
        expect(result).toBe('456912');
    });

    // Add more test cases as needed
});
