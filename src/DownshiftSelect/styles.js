const styles = ({ spacing }) => ({
  // Root CSS
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  containerFullWidth: {
    display: 'block',
  },
  // TextField CSS
  field: {
    paddingRight: spacing(0.5),
  },
  fieldInput: {},
  fieldFocused: {},
  fieldNotchedOutline: {},
  // Toggle & Clear Btn
  iconBtn: {},
  iconBtnLabel: {},
  // Toggle Btn
  toggleBtn: {},
  // Clear Btn
  clearBtn: {},
  svgIcon: {},
  // the rest is OptionMenu CSS API
});

styles.traits = [
  'container',
  'containerFullWidth',
  'field',
  'fieldInput',
  'fieldFocused',
  'fieldNotchedOutline',
  'iconBtn',
  'iconBtnLabel',
  'toggleBtn',
  'clearBtn',
  'svgIcon',
];

export default styles;