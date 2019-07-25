import { makeStyles } from '@material-ui/styles';

export const useChipStyles = makeStyles(({ spacing }) => ({
  root: {
    marginRight: spacing(1),
    marginBottom: spacing(0.5),
  },
}));

export const useInputBaseStyles = makeStyles(() => ({
  root: {
    flexWrap: 'wrap',
    padding: '12px 0 8px 12px',
  },
  input: {
    padding: '8px 8px 9px 4px',
    width: 'auto',
    flexGrow: 1,
  },
}));

export const useContainerStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(4px)',
    maxHeight: 256,
    overflow: 'auto',
    zIndex: 1,
  },
}));

export const useRootStyles = makeStyles(() => ({
  root: ({ fullWidth }) => ({
    position: 'relative',
    display: fullWidth ? 'block' : 'inline-block',
  }),
}));

export const useOptionStyles = makeStyles(({ palette }) => ({
  root: ({ highlighted, hoverless }) => ({
    '&:hover': {
      ...(hoverless && {
        backgroundColor: 'transparent',
      }),
    },
    ...(highlighted && {
      backgroundColor: palette.divider,
      '&:hover': {
        backgroundColor: palette.divider,
      },
    }),
  }),

  selected: {
    '&$root': {
      backgroundColor: palette.primary.main,
      color: palette.common.white,
      '&:hover': {
        backgroundColor: palette.primary.light,
      },
    },
  },
}));
