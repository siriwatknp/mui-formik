import { makeStyles } from '@material-ui/styles';

export const antOptionMenuStyles = ({ palette, spacing }) => ({
  menuContainer: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(4px)',
    maxHeight: 250,
    overflow: 'auto',
    zIndex: 5,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  emptyRoot: {
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.text.hint,
  },
  emptyIcon: {
    fontSize: 48,
    color: 'inherit',
    marginBottom: spacing(1),
  },
  emptyText: {},
});

export const useAntOptionMenuStyles = makeStyles(antOptionMenuStyles);
