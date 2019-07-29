import React, { useState, useRef } from 'react';
import cx from 'clsx';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import OptionMenu from '../OptionMenu';
import { filterByInputValue, getMultiSelectOptions } from '../utils/functions';
import {
  injectMenuProps,
  injectTextFieldProps,
  getMultiSelectLogic,
  defaultItemToLabel,
  defaultItemToValue,
} from '../logics/select';
import Collection from '../utils/collection';

const styles = ({ spacing }) => ({
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  containerFullWidth: {
    display: 'block',
  },
  field: {
    flexWrap: 'wrap',
    padding: '12px 0 8px 12px',
  },
  fieldInput: {
    padding: '8px 8px 9px 4px',
    width: 'auto',
    flexGrow: 1,
  },
  chipRoot: {
    marginRight: spacing(1),
    marginBottom: spacing(0.5),
  },
  // chipLabel: {},
  // chipDeletable: {},
  // chipDeleteIcon: {},
  // the rest is OptionMenu CSS API
});

const MultipleSelect = props => {
  const {
    options,
    menuId,
    chipId,
    fullWidth,
    onChangeInput,
    onChange,
    onFocus,
    onBlur,
    InputProps,
    inputProps,
    itemToLabel,
    itemToValue,
    chipProps,
    fullOptionReturned,
    classes,
    overrides,
    // rootClasses: extRootClasses,
    // chipClasses: extChipClasses,
    // inputBaseClasses: extInputBaseClasses,
  } = props;
  // const rootClasses = useRootStyles({ ...props, classes: extRootClasses });
  // const chipClasses = useChipStyles({ classes: extChipClasses });
  // const inputBaseClasses = useMultiSelectInputBaseStyles({
  //   classes: extInputBaseClasses,
  // });
  const css = overrides || classes;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const returnValue = cb => (items, ...args) => {
    return fullOptionReturned ? cb(items, ...args) : cb(items.map(itemToValue));
  };
  const handleChange = returnValue(onChange);
  const handleBlur = returnValue(onBlur);
  const stateUpdater = newItems => {
    setSelectedItems(newItems);
    handleChange(newItems);
  };
  const { removeItem, handleSelection, handleKeyDown } = getMultiSelectLogic(
    Collection(selectedItems, itemToValue),
    stateUpdater,
  );
  return (
    <div className={cx(css.container, fullWidth && css.containerFullWidth)}>
      <TextField
        {...injectTextFieldProps({ ...props, inputRef })}
        required={false}
        autoComplete={'off'}
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          onChangeInput(e);
        }}
        onFocus={e => {
          setOpen(true);
          onFocus(e);
        }}
        onBlur={e => {
          e.persist();
          setTimeout(() => {
            const target = document.activeElement;
            if (
              target.id &&
              (target.id.includes(menuId) || target.id.includes(chipId))
            ) {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            } else {
              setOpen(false);
              handleBlur(selectedItems, e);
            }
          }, 1);
        }}
        InputProps={{
          ...InputProps,
          classes: {
            ...css,
            root: css.field,
            input: css.fieldInput,
          },
          startAdornment: selectedItems.map(item => (
            <Chip
              key={itemToValue(item)}
              id={`${chipId}${itemToValue(item)}`}
              {...chipProps}
              classes={{
                root: css.chipRoot,
                label: css.chipLabel,
                deleteIcon: css.chipDeleteIcon,
                deletable: css.chipDeletable,
              }}
              label={itemToLabel(item)}
              onDelete={e => {
                e.stopPropagation();
                removeItem(item);
              }}
            />
          )),
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          ...inputProps,
          onKeyDown: handleKeyDown(inputValue),
        }}
      />
      {open && (
        <OptionMenu
          {...injectMenuProps(
            {
              ...props,
              menuId,
              inputValue,
              options,
              selectedItems,
              getSelectOptions: getMultiSelectOptions,
            },
            {
              getItemProps: ({ item }) => ({
                selected: selectedItems.includes(item),
                onClick: () => {
                  if (!selectedItems.includes(item)) {
                    setInputValue('');
                  }
                  handleSelection(item);
                },
              }),
            },
          )}
        />
      )}
    </div>
  );
};

MultipleSelect.propTypes = {};
MultipleSelect.defaultProps = {
  options: [],
  menuId: '__menu__',
  chipId: '__chip__',
  value: [],
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onChangeInput: () => {},
  selectedItemExcluded: false,
  filterOption: filterByInputValue,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
};

export default withStyles(styles, { name: 'MultiSelect' })(MultipleSelect);
