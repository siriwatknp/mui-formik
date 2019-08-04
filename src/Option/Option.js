import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CheckRounded from '@material-ui/icons/CheckRounded';
import styles from './styles';
import { pick } from '../utils/functions';

const Option = withStyles(styles, { name: 'FmkOption' })(
  ({
    hoverless,
    highlighted,
    selected,
    classes,
    overrides,
    children,
    MenuItemProps,
    menuItemClasses,
    svgIcon,
    svgIconClasses,
    SvgIconProps,
  }) => {
    const css = overrides || classes;
    console.log('classes', classes);
    return (
      <MenuItem
        {...MenuItemProps}
        selected={selected}
        classes={{
          ...menuItemClasses,
          root: cx(
            css.option,
            highlighted && css.optionHighlighted,
            hoverless && css.optionHoverless,
            menuItemClasses.root,
          ),
          selected: cx(css.optionSelected, menuItemClasses.selected),
        }}
      >
        {children}
        <CheckRounded
          component={svgIcon}
          {...SvgIconProps}
          classes={{
            ...svgIconClasses,
            root: cx(
              css.icon,
              highlighted && css.iconHighlighted,
              selected && css.iconSelected,
              svgIconClasses.root,
            ),
          }}
        />
      </MenuItem>
    );
  },
);

Option.propTypes = {
  hoverless: PropTypes.bool,
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
  classes: PropTypes.shape({}),
  overrides: PropTypes.shape({}),
  MenuItemProps: PropTypes.shape({}),
  menuItemClasses: PropTypes.shape({}),
  svgIcon: PropTypes.node,
  svgIconClasses: PropTypes.shape({}),
  SvgIconProps: PropTypes.shape({}),
};
Option.defaultProps = {
  hoverless: false,
  highlighted: false,
  selected: false,
  classes: {},
  overrides: undefined,
  MenuItemProps: {},
  menuItemClasses: {},
  svgIcon: undefined,
  svgIconClasses: {},
  SvgIconProps: {},
};
Option.pickClasses = classes => pick(classes, styles.traits);
Option.getProps = ({
  optionClasses,
  classes,
  optionOverrides,
  overrides,
  MenuItemProps,
  menuItemClasses,
  svgIconClasses,
  SvgIconProps,
}) => {
  const resultClasses = Option.pickClasses(optionClasses || classes);
  const resultOverrides = Option.pickClasses(optionOverrides || overrides);
  return {
    // use this fn when this component render as nested component
    classes: resultClasses,
    overrides: resultOverrides,
    optionClasses: resultClasses,
    optionOverrides: resultOverrides,
    ...MenuItemProps,
    menuItemClasses,
    svgIconClasses,
    SvgIconProps,
  };
};

export default Option;
