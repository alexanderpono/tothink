import { sum } from './index.js';

describe('sum', () => {
    it('1+2=3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
