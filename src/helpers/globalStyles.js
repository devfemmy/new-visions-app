import {StyleSheet} from 'react-native';
import { heightp, widthp } from '../utils/responsiveDesign';
import colors from './colors';

export const globalStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: widthp(15),
    flexGrow: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBetweenNoCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  horizontal: {
    borderBottomColor: 'rgba(112, 112, 112, 0.5)',
    borderBottomWidth: 1,
    marginHorizontal: heightp(100)
  },
  horizontalMargin: {
    borderBottomColor: 'rgba(112, 112, 112, 0.5)',
    borderBottomWidth: 1,
    marginVertical: heightp(20)
  },
  subBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingVertical: 2,
    marginBottom: 10
  },
  subBtn2: {
    backgroundColor: 'rgba(67, 72, 84, 1)',
    paddingHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingVertical: 2,
    marginBottom: 10
  },
  btnColor: {
    color: colors.white,
    fontWeight: 'bold'
  }
});
