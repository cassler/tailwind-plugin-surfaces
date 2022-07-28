import { toRGBA, hexIsLight } from '../src/index';

describe('blah', () => {
  it('Identified light shades', () => {
    expect(hexIsLight('#ddd')).toBeTruthy()
  });
  it('Identified dark shades', () => {
    expect(hexIsLight('#222')).toBeFalsy()
  });
  it('Converts HEX to RGBA', () => {
    expect(toRGBA('#ff0000')).toBe('rgba(255,0,0,1)')
  })
  it('Handles shorthand (#f00)', () => {
    expect(toRGBA('#ff0')).toBe('rgba(255,255,0,1)')
  })
  it('Accepts opacity args', () => {
    expect(toRGBA('#ff0', '0.5')).toBe('rgba(255,255,0,0.5)')
  })
});
