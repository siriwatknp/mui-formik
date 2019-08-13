import { mergeStyleCreators } from 'mui-styling';
import { createStyles } from '../OptionMenu';

export default mergeStyleCreators(createStyles, ({ spacing }) => ({
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
}));
