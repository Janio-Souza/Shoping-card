const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se saveCartItems é uma função',async () => {
    expect(typeof saveCartItems).toBe('function');
 });
});
