import React from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InboxTwoTone from '@material-ui/icons/InboxTwoTone';
import Typography from '@material-ui/core/Typography';
import Option from '../Option';
import { defaultItemToLabel } from '../logics/select';

const styles = ({ palette, spacing }) => ({
  menuContainer: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(4px)',
    maxHeight: 256,
    overflow: 'auto',
    zIndex: 5,
  },
  emptyRoot: {
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.text.hint,
  },
  emptyIcon: {
    fontSize: 48,
    color: 'inherit',
    marginBottom: spacing(1),
  },
  emptyText: {},
});

const OptionMenu = ({
  options,
  menuId,
  selectedItems,
  itemToValue,
  renderEmpty,
  getMenuProps,
  getItemProps,
  classes,
  overrides,
}) => {
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
    <Paper className={menuContainer} {...getMenuProps()}>
      {options.map((item, index) => (
        <Option
          id={`${menuId}${itemToValue(item)}`}
          key={itemToValue(item)}
          // eslint-disable-next-line react/no-children-prop
          children={defaultItemToLabel(item)}
          selected={selectedItems.includes(item)}
          overrides={overrides}
          {...getItemProps({ item, index })}
        />
      ))}
      {options.length === 0 && empty()}
    </Paper>
  );
};

OptionMenu.propTypes = {};
OptionMenu.defaultProps = {
  menuId: '__menu__',
  options: [],
  selectedItems: [],
  itemToValue: item => (item ? item.value : ''),
  getMenuProps: () => {},
  getItemProps: () => {},
  renderEmpty: undefined,
};

export default withStyles(styles, { name: 'FmkOptionMenu' })(OptionMenu);
