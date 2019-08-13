import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { withStyles } from 'mui-styling';
import MenuItem from '@material-ui/core/MenuItem';
import CheckRounded from '@material-ui/icons/CheckRounded';
import createStyles from './Option.styles';

const Option = withStyles(createStyles, { name: 'Option' })(
  ({
    css,
    highlighted,
    selected,
    children,
    MenuItemProps,
    menuItemClasses,
    // svg icon start
    renderIconStart,
    // svg icon end
    renderIconEnd,
    renderOption,
  }) => {
    if (typeof renderOption === 'function') {
      return renderOption({ children, highlighted, selected });
    }
    return (
      <MenuItem
        {...MenuItemProps}
        selected={selected}
        classes={{
          ...menuItemClasses,
          root: cx(
            css.option,
            highlighted && css.optionHighlighted,
            menuItemClasses.root,
          ),
          selected: cx(css.optionSelected, menuItemClasses.selected),
        }}
      >
        {typeof renderIconStart === 'function' &&
          renderIconStart({
            highlighted,
            selected,
            className: cx(
              css.icon,
              css.iconStart,
              highlighted && css.iconHighlighted,
              highlighted && css.iconStartHighlighted,
              selected && css.iconSelected,
              selected && css.iconStartSelected,
            ),
          })}
        {children}
        {typeof renderIconEnd === 'function' &&
          renderIconEnd({
            highlighted,
            selected,
            className: cx(
              css.icon,
              css.iconEnd,
              highlighted && css.iconHighlighted,
              highlighted && css.iconEndHighlighted,
              selected && css.iconSelected,
              selected && css.iconEndSelected,
            ),
          })}
      </MenuItem>
    );
  },
);

Option.propTypes = {
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
  classes: PropTypes.shape({}),
  overrides: PropTypes.shape({}),
  MenuItemProps: PropTypes.shape({}),
  menuItemClasses: PropTypes.shape({}),
  renderIconStart: PropTypes.func,
  renderIconEnd: PropTypes.func,
  renderOption: PropTypes.func,
};
Option.defaultProps = {
  highlighted: false,
  selected: false,
  classes: {},
  overrides: undefined,
  MenuItemProps: {},
  menuItemClasses: {},
  renderIconStart: undefined,
  renderIconEnd: ({ className }) => <CheckRounded className={className} />,
  renderOption: undefined,
};
Option.getProps = ({
  MenuItemProps,
  menuItemClasses,
  svgIconClasses,
  SvgIconProps,
  renderIconStart,
  renderIconEnd,
  renderOption,
}) => {
  return {
    // use this fn when this component render as nested component
    ...MenuItemProps,
    menuItemClasses,
    svgIconClasses,
    SvgIconProps,
    renderIconStart,
    renderIconEnd,
    renderOption,
  };
};

export default Option;
