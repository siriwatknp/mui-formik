import Color from 'color';
import { makeStyles } from '@material-ui/styles';
import { antChipStyles } from './ChipStyles';
import { antInputBaseStyles } from './InputBaseStyles';
import { antOptionStyles } from './OptionStyles';
import { antOptionMenuStyles } from './OptionMenuStyles';
import { antIconBtnStyles } from './IconButtonStyles';

export const antSelectStyles = theme => {
  return {
    container: {
      position: 'relative',
      display: 'inline-block',
    },
    containerFullWidth: {
      display: 'block',
    },
    optionHighlighted: {},
    optionSelected: {},
    ...antInputBaseStyles(theme),
    ...antIconBtnStyles(theme),
    ...antChipStyles(theme),
    ...antOptionMenuStyles(theme),
    ...antOptionStyles(theme),
  };
};

export const useAntSelectStyles = makeStyles(antSelectStyles);

export const useAntMultiSelectStyles = makeStyles(theme => {
  const { spacing, palette } = theme;
  return {
    ...antSelectStyles(theme),
    field: {
      flexWrap: 'wrap',
      padding: '4px 8px',
      paddingRight: spacing(3.5),
      '&:hover $notchedOutline': {
        borderColor: palette.primary.main,
      },
      '&$focused $notchedOutline': {
        borderWidth: 1,
        boxShadow: `0 0 0 2px ${Color(palette.primary.main)
          .fade(0.72)
          .toString()}`,
      },
      '& .MuiChip-root': {
        margin: '2px 8px 2px 0',
      },
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
