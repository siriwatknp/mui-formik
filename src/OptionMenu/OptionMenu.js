import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'mui-styling';
import Paper from '@material-ui/core/Paper';
import InboxTwoTone from '@material-ui/icons/InboxTwoTone';
import Typography from '@material-ui/core/Typography';
import createStyles from './OptionMenu.styles';
import Option from '../Option';
import { defaultItemToLabel, defaultItemToValue } from '../logics/select';

const OptionMenu = withStyles(createStyles, { name: 'OptionMenu' })(props => {
  const {
    css, // from mui-styling withStyles
    options,
    selectedItems,
    itemToValue,
    itemToLabel,
    renderEmpty,
    getMenuProps,
    getItemProps,
    PaperProps,
  } = props;
  const { menuContainer, emptyRoot, emptyIcon, emptyText } = css;
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
      {options.map((item, index) => {
        const { highlighted, ...MenuItemProps } = getItemProps({ item, index });
        return (
          <Option
            key={itemToValue(item)}
            selected={selectedItems.includes(item)}
            highlighted={highlighted}
            MenuItemProps={MenuItemProps}
            {...Option.getOverrides(css, props)}
            {...Option.getProps(props)}
          >
            {itemToLabel(item)}
          </Option>
        );
      })}
      {options.length === 0 && empty()}
    </Paper>
  );
});

OptionMenu.propTypes = {
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
  options: [],
  selectedItems: [],
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  getMenuProps: () => ({}),
  getItemProps: () => ({}),
  renderEmpty: undefined,
  classes: {},
  overrides: undefined,
  PaperProps: undefined,
};
OptionMenu.getProps = ({ PaperProps }) => ({
  // use this fn when this component render as nested component
  PaperProps,
});

export default OptionMenu;
