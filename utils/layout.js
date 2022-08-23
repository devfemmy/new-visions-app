import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

// Based on iPhone 11 scale
const widthBaseScale = width / 414;
const heightBaseScale = height / 896;

export function normalize(size, based) {
  // const newSize = size * scale;
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size) => {
  return normalize(size, 'width');
};

//for height  pixel
const heightPixel = (size) => {
  return normalize(size, 'height');
};

//for font  pixel
const fontPixel = (size) => {
  return heightPixel(size);
};

//for Margin and Padding vertical pixel
const pixelSizeVertical = (size) => {
  return heightPixel(size);
};

//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size) => {
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
