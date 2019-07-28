import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InboxTwoTone from '@material-ui/icons/InboxTwoTone';
import Typography from '@material-ui/core/Typography';
import Option from '../Option';
import { useContainerStyles } from '../styles/useMultiSelectStyles';

const OptionMenu = ({
  options,
  menuId,
  itemToValue,
  onClickItem,
  paperProps,
  renderEmpty,
  getMenuProps,
  getItemProps,
  ...props
}) => {
  const containerClasses = useContainerStyles(props);
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
    <Paper classes={containerClasses} {...getMenuProps()}>
      {options.map((item, index) => (
        <Option
          id={`${menuId}${itemToValue(item)}`}
          key={itemToValue(item)}
          {...getItemProps({ item, index })}
        />
      ))}
      {options.length === 0 && empty()}
    </Paper>
  );
};

OptionMenu.propTypes = {};
OptionMenu.defaultProps = {
  options: [],
  menuId: '__menu__',
  itemToValue: item => (item ? item.value : ''),
  onClickItem: () => {},
  getMenuProps: () => ({}),
  renderEmpty: undefined,
};

export default OptionMenu;
