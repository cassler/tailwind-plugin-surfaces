import { hexIsLight } from '../src/index';

describe('blah', () => {
  it('computes light and dark contrasts', () => {
    expect(hexIsLight('#ffffff')).toBeTruthy();
    expect(hexIsLight('#000000')).toBeFalsy();
  });
  it.skip('accepts shorthand hex (ex: #000)', () => {
    expect(hexIsLight('#fff')).toBeTruthy();
  })

});
