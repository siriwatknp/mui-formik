const styles = ({ palette }) => ({
  option: {},
  optionHighlighted: {
    backgroundColor: palette.divider,
    '&:hover': {
      backgroundColor: palette.divider,
    },
  },
  optionHoverless: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  optionSelected: {
    '&$option': {
      backgroundColor: palette.primary.main,
      color: palette.common.white,
      '&:hover': {
        backgroundColor: palette.primary.light,
      },
    },
  },
  icon: {
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
});

styles.traits = [
  'option',
  'optionHighlighted',
  'optionHoverless',
  'optionSelected',
  'icon',
  'iconHighlighted',
  'iconSelected',
];

export default styles;
