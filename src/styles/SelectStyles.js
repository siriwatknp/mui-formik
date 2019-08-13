import { mergeStyleCreators } from 'mui-styling';
import { makeStyles } from '@material-ui/styles';
import { antChipStyles } from './ChipStyles';
import { antInputBaseStyles } from './InputBaseStyles';
import { antOptionStyles } from './OptionStyles';
import { antOptionMenuStyles } from './OptionMenuStyles';
import { antIconBtnStyles } from './IconButtonStyles';

export const antSelectStyles = mergeStyleCreators(
  antInputBaseStyles,
  antIconBtnStyles,
  antChipStyles,
  antOptionMenuStyles,
  antOptionStyles,
  {
    container: {
      position: 'relative',
      display: 'inline-block',
    },
    containerFullWidth: {
      display: 'block',
    },
  },
);

export const useAntSelectStyles = makeStyles(antSelectStyles);

export const useAntMultiSelectStyles = makeStyles(theme => {
  const { spacing } = theme;
  const antStyles = antSelectStyles(theme);
  return {
    ...antStyles,
    field: {
      ...antStyles.field,
      paddingRight: spacing(3.5),
    },
    iconBtn: {
      position: 'absolute',
      top: '50%',
      right: 4,
      transform: 'translateY(-50%)',
      padding: 0,
      color: 'rgba(0,0,0,0.25)',
    },
  };
});
