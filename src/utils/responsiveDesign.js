import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';

const customWidth = 375;
const customHeight = 812;

export const widthp = (value) => {
  const dimension = (value / customWidth) * 100;
  return wdp(`${dimension}%`);
};
export const heightp = (value)  => {
  const dimension = (value / customHeight) * 100;
  return hdp(`${dimension}%`);
};
