import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InboxTwoTone from '@material-ui/icons/InboxTwoTone';
import Typography from '@material-ui/core/Typography';
import {
  useContainerStyles,
  useOptionStyles,
} from '../styles/useMultiSelectStyles';

const OptionMenu = ({
  options,
  menuId,
  selectedItemExcluded,
  filterOption,
  selectedItems,
  onClickItem,
  paperProps,
  renderEmpty,
  ...props
}) => {
  const containerClasses = useContainerStyles(props);
  const optionClasses = useOptionStyles();
  const shouldRenderOption = value => {
    if (typeof filterOption === 'function') return filterOption(value);
    if (selectedItemExcluded) return !selectedItems.includes(value);
    return true;
  };
  const empty = () => {
    if (renderEmpty === false) return null;
    if (typeof renderEmpty === 'function') return renderEmpty();
    return (
      <Box
        minHeight={120}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        color={'text.hint'}
      >
        <InboxTwoTone
          style={{ fontSize: 48, color: 'inherit', marginBottom: 8 }}
        />
        <Typography variant={'body2'} color={'inherit'}>
          Empty data
        </Typography>
      </Box>
    );
  };
  return (
    <Paper classes={containerClasses}>
      {options.map(({ label, value }) =>
        shouldRenderOption(value) ? (
          <MenuItem
            id={`${menuId}${value}`}
            key={value}
            classes={optionClasses}
            selected={selectedItems.includes(value)}
            onClick={e => onClickItem(e, value)}
          >
            {label}
          </MenuItem>
        ) : null,
      )}
      {options.length === selectedItems.length && empty()}
    </Paper>
  );
};

OptionMenu.propTypes = {};
OptionMenu.defaultProps = {
  options: [],
  menuId: '__menu__',
  selectedItems: [],
  onClickItem: () => {},
  filterOption: undefined,
  renderEmpty: undefined,
  selectedItemExcluded: false,
};

export default OptionMenu;
