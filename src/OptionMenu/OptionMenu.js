import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InboxTwoTone from '@material-ui/icons/InboxTwoTone';
import Typography from '@material-ui/core/Typography';
import Option from '../Option';
import styles from './OptionMenu.styles';
import { defaultItemToLabel, defaultItemToValue } from '../logics/select';
import { pick } from '../utils/functions';

const OptionMenu = withStyles(styles, { name: 'FmkOptionMenu' })(props => {
  const {
    options,
    menuId,
    selectedItems,
    itemToValue,
    itemToLabel,
    renderEmpty,
    PaperProps,
    getMenuProps,
    getItemProps,
    classes,
    overrides,
  } = props;
  const { menuContainer, emptyRoot, emptyIcon, emptyText } =
    overrides || classes;
  const empty = () => {
    if (renderEmpty === false) return null;
    if (typeof renderEmpty === 'function') return renderEmpty();
    return (
      <div className={emptyRoot}>
        <InboxTwoTone className={emptyIcon} />
        <Typography className={emptyText} variant={'body2'} color={'inherit'}>
          Empty data
        </Typography>
      </div>
    );
  };
  return (
    <Paper className={menuContainer} {...PaperProps} {...getMenuProps()}>
      {options.map((item, index) => (
        <Option
          id={`${menuId}${itemToValue(item)}`}
          key={itemToValue(item)}
          // eslint-disable-next-line react/no-children-prop
          children={itemToLabel(item)}
          selected={selectedItems.includes(item)}
          {...getItemProps({ item, index })}
          {...Option.getProps(props)}
        />
      ))}
      {options.length === 0 && empty()}
    </Paper>
  );
});

OptionMenu.propTypes = {
  menuId: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  ),
  selectedItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  ),
  itemToLabel: PropTypes.func,
  itemToValue: PropTypes.func,
  getMenuProps: PropTypes.func,
  getItemProps: PropTypes.func,
  renderEmpty: PropTypes.func,
  classes: PropTypes.shape({}),
  overrides: PropTypes.shape({}),
  PaperProps: PropTypes.shape({}),
};
OptionMenu.defaultProps = {
  menuId: '__menu__',
  options: [],
  selectedItems: [],
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  getMenuProps: () => {},
  getItemProps: () => {},
  renderEmpty: undefined,
  classes: {},
  overrides: undefined,
  PaperProps: undefined,
};
OptionMenu.pickClasses = classes => pick(classes, styles.traits);
OptionMenu.getProps = ({
  optionMenuClasses,
  classes,
  optionMenuOverrides,
  overrides,
  PaperProps,
  ...props
}) => {
  const resultClasses = OptionMenu.pickClasses(optionMenuClasses || classes);
  const resultOverrides = OptionMenu.pickClasses(
    optionMenuOverrides || overrides,
  );
  return {
    // use this fn when this component render as nested component
    ...Option.getProps({ classes, overrides, ...props }),
    classes: resultClasses,
    overrides: resultOverrides,
    optionMenuClasses: resultClasses,
    optionMenuOverrides: resultOverrides,
    PaperProps,
  };
};

export default OptionMenu;
