import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getStyleAttrs, pick } from '../utils/styles';

export const styles = () => ({
  childRoot: {},
  childDot: { fontSize: 32, lineHeight: 1 },
});

styles.attrs = getStyleAttrs(styles);

const Child = withStyles(styles, { name: 'Child' })(
  ({ classes, overrides }) => {
    const css = overrides || classes;
    // console.log('css', css);
    return (
      <div className={css.childRoot}>
        <span className={css.childDot}>•</span>
      </div>
    );
  },
);

Child.propTypes = {
  overrides: PropTypes.shape({}),
  classes: PropTypes.shape({}),
};
Child.defaultProps = {
  overrides: undefined,
  classes: undefined,
};
Child.pickClasses = classes => pick(classes, styles.attrs);
Child.getOverrides = (css, props = {}) => {
  const { childOverrides } = props;
  return {
    overrides: Child.pickClasses(childOverrides || css),
  };
};

export default Child;
