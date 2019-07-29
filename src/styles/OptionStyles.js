import Color from 'color';
import { makeStyles } from '@material-ui/styles';

export const antOptionStyles = ({ palette }) => {
  const accentColor = Color(palette.primary.main)
    .rotate(-10)
    .lighten(0.76)
    .toString();
  return {
    option: {
      color: 'rgba(0,0,0,0.65)',
      fontSize: 14,
      minHeight: 32,
      '&:hover': {
        backgroundColor: accentColor,
      },
      '&:hover $icon': {
        opacity: 1,
      },
    },
    optionHighlighted: {
      backgroundColor: accentColor,
      '&:hover': {
        backgroundColor: accentColor,
      },
    },
    optionHoverless: {},
    optionSelected: {
      '&$option': {
        backgroundColor: '#fafafa',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: accentColor,
        },
      },
      '&$optionHighlighted': {
        backgroundColor: accentColor,
      },
    },
    icon: {
      transition: '0.2s',
      opacity: 0,
      marginLeft: 'auto',
      fontSize: 18,
    },
    iconHighlighted: {
      opacity: 1,
    },
    iconSelected: {
      opacity: 1,
      color: palette.primary.main,
    },
  };
};

export const useAntOptionStyles = makeStyles(antOptionStyles);
