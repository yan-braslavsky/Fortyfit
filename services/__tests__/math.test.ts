// services/math.ts
import { add } from '../math';
import { expect, describe, test } from '@jest/globals';

describe('Math utilities', () => {
    test('adds two numbers correctly', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
        expect(add(5, 5)).toBe(10);
    });
});