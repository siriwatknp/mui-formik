export default ({ palette }) => ({
  option: {
    '&:hover': {
      backgroundColor: palette.grey[100],
    },
  },
  optionHighlighted: {
    backgroundColor: palette.grey[200],
    '&:hover': {
      backgroundColor: palette.grey[200],
    },
  },
  optionSelected: {
    '&$option': {
      backgroundColor: palette.grey[300],
      fontWeight: 500,
      '&:hover': {
        backgroundColor: palette.grey[200],
      },
    },
    '&$optionHighlighted': {
      backgroundColor: palette.grey[200],
    },
  },
  // apply to both icon (start & end),
  icon: {
    fontSize: 18,
  },
  iconHighlighted: {},
  iconSelected: {},
  // apply to only start icon
  iconStart: {},
  iconStartHighlighted: {},
  iconStartSelected: {},
  // apply to only end icon
  iconEnd: {
    opacity: 0,
    marginLeft: 'auto',
  },
  iconEndHighlighted: {
    opacity: 1,
  },
  iconEndSelected: {
    opacity: 1,
    color: palette.text.primary,
  },
});
