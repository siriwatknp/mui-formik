import { makeStyles } from '@material-ui/styles';

export const useChipStyles = makeStyles(({ spacing }) => ({
  root: {
    marginRight: spacing(1),
    marginBottom: spacing(0.5),
  },
}));

export const useSelectInputBaseStyles = makeStyles(({ spacing }) => ({
  adornedEnd: {
    // '&.MuiInputBase-adornedEnd': {
    //   paddingRight: spacing(1),
    // },
    paddingRight: spacing(1),
  },
}));

export const useMultiSelectInputBaseStyles = makeStyles(({ spacing }) => ({
  root: {
    flexWrap: 'wrap',
    padding: '12px 0 8px 12px',
  },
  input: {
    padding: '8px 8px 9px 4px',
    width: 'auto',
    flexGrow: 1,
  },
  adornedEnd: {
    paddingRight: spacing(8),
  },
}));

export const useContainerStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(4px)',
    maxHeight: 256,
    overflow: 'auto',
    zIndex: 5,
  },
}));

export const useRootStyles = makeStyles(() => ({
  root: ({ fullWidth }) => ({
    position: 'relative',
    display: fullWidth ? 'block' : 'inline-block',
  }),
}));

export const useToggleStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 8,
  },
}));