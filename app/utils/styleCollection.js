export default {
  algaeGreenColor: 'rgba(43, 214, 101, 1)',
  shamrockGreen: '#07c748',
  disabledGreen: '#07c74855',
  headerGreen: '#66D6D1',
  bannerGreen: '#93E5CB',
  cardBackgroundColor: '#12C2AC',
  AMYellow: '#FFFF00',
  grayText: '#95989A',
  titleText: '#393939',
  pointGreen: '#06BEB6',
  backgroundGreen: '#2ABB9B',
  textFieldBackgroundColor: 'rgba(255, 255, 255, 0.8)',
  whiteColor: '#fff',
  whiteRiceColor: '#F5F5DC',
  dartBlack: '#4A4A4A',
  hbGray: '#E5E5E5',
  hbLightGray: '#A9A9A9',
  hbTextGray: '#A5A7AA',
  hbTransparentBlack: 'rgba(0, 0, 0, 0.9)',
  AMTransparentBlack: 'rgba(0, 0, 0, 0.7)',
  hbRed: '#DA3944',
  darkerGray: '#757575',
  hbYellow: '#FDDA3B',
  hbOrange: '#FF8A0A',
  blackTwo54: '#000000D4',
  transparentColor: 'rgba(0, 0, 0, 0)',
  modalGreyOut: '#00000080',
  grayBackgroundColor: '#212121',
  grayBorderColor: '#ddd',
  transparentBlack: '#000000A0'
};

/* eslint-disable no-bitwise */
export const hexToRGB = hex => {
  const h = parseInt(hex.slice(1), 16);
  const r = h >> 16;
  const g = (h >> 8) & 0xff;
  const b = h & 0xff;
  return `rgb(${r},${g},${b})`;
};
