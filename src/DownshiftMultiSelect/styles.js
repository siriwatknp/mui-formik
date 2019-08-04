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
    flexWrap: 'wrap',
    padding: '12px 0 8px 12px',
    paddingRight: spacing(6.5),
  },
  fieldInput: {
    padding: '8px 8px 9px 4px',
    width: 'auto',
    flexGrow: 1,
  },
  fieldFocused: {},
  fieldNotchedOutline: {},
  chipRoot: {
    marginRight: spacing(1),
    marginBottom: spacing(0.5),
  },
  // Toggle & Clear Btn
  iconBtn: {
    position: 'absolute',
    top: '50%',
    right: 4,
    transform: 'translateY(-50%)',
  },
  iconBtnLabel: {},
  // Toggle Btn
  toggleBtn: {},
  // Clear Btn
  clearBtn: {},
  // the rest is OptionMenu CSS API
});

styles.traits = [
  'container',
  'containerFullWidth',
  'field',
  'fieldInput',
  'fieldFocused',
  'fieldNotchedOutline',
  'chipRoot',
  'iconBtn',
  'iconBtnLabel',
  'toggleBtn',
  'clearBtn',
];

export default styles;
