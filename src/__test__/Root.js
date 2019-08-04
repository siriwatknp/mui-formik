import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Parent, { styles as parentStyles } from './Parent';
import { getStyleAttrs, pick } from '../utils/styles';

export const styles = theme => ({
  ...parentStyles(theme),
  root: {},
});

styles.attrs = getStyleAttrs(styles);

const Root = withStyles(styles, { name: 'Root' })(props => {
  const { items, classes, overrides, childOverrides } = props;
  const css = overrides || classes;
  return (
    <div className={css.root}>
      {items.map(label => (
        <Parent
          key={label}
          label={label}
          childOverrides={childOverrides}
          {...Parent.getOverrides(css, props)}
        />
      ))}
    </div>
  );
});

Root.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  overrides: PropTypes.shape({}),
  classes: PropTypes.shape({}),
  parentOverrides: PropTypes.shape({}),
  childOverrides: PropTypes.shape({}),
};
Root.defaultProps = {
  items: [],
  overrides: undefined,
  classes: undefined,
  parentOverrides: undefined,
  childOverrides: undefined,
};
Root.pickClasses = classes => pick(classes, styles.attrs);
Root.getOverrides = (css, props = {}) => {
  const { rootOverrides } = props;
  return {
    overrides: Root.pickClasses(rootOverrides || css),
  };
};

export default Root;
