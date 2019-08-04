import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import lodashPick from 'lodash/pick';

const baseTheme = createMuiTheme();

export const getStyleAttrs = styles => {
  return Object.keys(styles(baseTheme));
};

export const pick = (object, ...args) =>
  object ? lodashPick(object, ...args) : object;
