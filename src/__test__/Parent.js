import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Child, { styles as childStyles } from './Child';
import { getStyleAttrs, pick } from '../utils/styles';

export const styles = theme => ({
  ...childStyles(theme),
  parentRoot: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 32,
    padding: '0 16px',
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  parentLabel: {
    margin: '0 auto 0 0',
  },
});

styles.attrs = getStyleAttrs(styles);

const Parent = withStyles(styles, { name: 'Parent' })(props => {
  const { classes, overrides, label } = props;
  const css = overrides || classes;
  // console.log('css', css);
  return (
    <div className={css.parentRoot}>
      <p className={css.parentLabel}>{label}</p>
      <Child {...Child.getOverrides(css, props)} />
    </div>
  );
});

Parent.propTypes = {
  label: PropTypes.string,
  overrides: PropTypes.shape({}),
  classes: PropTypes.shape({}),
  childOverrides: PropTypes.shape({}),
};
Parent.defaultProps = {
  label: '',
  overrides: undefined,
  classes: undefined,
  childOverrides: undefined,
};
Parent.pickClasses = classes => pick(classes, styles.attrs);
Parent.getOverrides = (css, props = {}) => {
  const { parentOverrides } = props;
  return {
    overrides: Parent.pickClasses(parentOverrides || css),
  };
};

export default Parent;
