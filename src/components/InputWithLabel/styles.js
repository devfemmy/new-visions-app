import { StyleSheet } from 'react-native';
import { calcWidth, calcHeight } from '../../config/metrics';
import { config } from '../../config/appConfig';
// import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    width: calcWidth(345),
    height: calcHeight(50),
    backgroundColor: config.colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
    justifyContent: 'space-between',
  },
  lebel: {
    fontSize: 10,
    fontFamily: config.fontStyle.fonts.regular,
    color: 'rgb(59,63,73)',
  },
  label: {
    fontSize: 10,
    fontFamily: config.fontStyle.fonts.regular,
    color: 'rgb(59,63,73)',
  },
  valueText: {
    paddingVertical: 1,
    fontSize: 12,
    fontFamily: config.fontStyle.fonts.regular,
    // color: config.colors.black,
    color: 'rgb(59,63,73)',
    marginTop: 3,
    width: calcWidth(220),
    height: calcHeight(18),
    textAlign: 'left',
  },
});

export default styles;
