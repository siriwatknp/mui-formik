import Color from 'color';
import { makeStyles } from '@material-ui/styles';

export const antInputBaseStyles = ({ palette }) => ({
  field: {
    flexWrap: 'wrap',
    padding: '4px 8px',
    '&:hover $fieldNotchedOutline': {
      borderColor: palette.primary.main,
    },
    '&$fieldFocused $fieldNotchedOutline': {
      borderWidth: 1,
      boxShadow: `0 0 0 2px ${Color(palette.primary.main)
        .fade(0.72)
        .toString()}`,
    },
    '& $chipRoot': {
      margin: '2px 8px 2px 0',
    },
  },
  fieldInput: {
    padding: '2.5px 2px',
    fontSize: 14,
    height: 'auto',
    color: 'rgba(0,0,0,0.65)',
    width: 'auto',
    flexGrow: 1,
  },
  fieldNotchedOutline: {
    borderColor: '#d9d9d9',
  },
  fieldFocused: {},
});

export const useAntInputBaseStyles = makeStyles(antInputBaseStyles);
