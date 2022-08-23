import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

// Based on iPhone 11 scale
const widthBaseScale = width / 414;
const heightBaseScale = height / 896;

export function normalize(size: number, based: 'width' | 'height' = 'width') {
  // const newSize = size * scale;
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size: number) => {
  return normalize(size, 'width');
};

//for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, 'height');
};

//for font  pixel
const fontPixel = (size: number) => {
  return heightPixel(size);
};

//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};

//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};

export default {
  width,
  height,
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  heightPixel,
  widthPixel,
};
