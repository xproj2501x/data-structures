////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Stack from '../../src/data-structures/stack';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const CHAI = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Stack', () => {
  describe('push an element', () => {
    let stack = new Stack();
    stack.push(1);

    it('should have a length of 1', () => {
      chai.expect(stack.length).to.equal(1);
    });
  });

  describe('pop an element', () => {
    let stack = new Stack();
    stack.push(1);
    stack.pop();

    it('should have a length of 0', () => {
      chai.expect(stack.length).to.equal(0);
    });
  });

  describe('pop the last element added', () => {
    let stack = new Stack();
    stack.push(1);
    stack.push(2);
    let data = stack.pop();

    it('should pop an element with a value of 2 and have a length of 1', () => {
      chai.expect(stack.length).to.equal(1);
      chai.expect(data).to.equal(2);
    });
  });
});