import React from 'react';
import cx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import CheckRounded from '@material-ui/icons/CheckRounded';
import { withStyles } from '@material-ui/styles';

export const styles = ({ palette }) => ({
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

const Option = ({
  hoverless,
  highlighted,
  classes,
  overrides,
  children,
  selected,
  ...props
}) => {
  const css = overrides || classes;
  return (
    <MenuItem
      selected={selected}
      {...props}
      classes={{
        root: cx(
          css.option,
          highlighted && css.optionHighlighted,
          hoverless && css.optionHoverless,
        ),
        selected: css.optionSelected,
      }}
    >
      {children}
      <CheckRounded
        className={cx(
          css.icon,
          highlighted && css.iconHighlighted,
          selected && css.iconSelected,
        )}
      />
    </MenuItem>
  );
};

export default withStyles(styles, { name: 'FmkOption' })(Option);
