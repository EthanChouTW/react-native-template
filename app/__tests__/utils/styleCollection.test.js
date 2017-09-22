import { hexToRGB } from '../../utils/styleCollection';

describe('style collection function test', () => {
  it('should return black', () => {
    expect(hexToRGB('#000000')).toEqual('rgb(0,0,0)');
  });

  it('should return white', () => {
    expect(hexToRGB('#FFFFFF')).toEqual('rgb(255,255,255)');
  });

  it('should return whatever', () => {
    expect(hexToRGB('#2f4d55')).toEqual('rgb(47,77,85)');
  });
});
