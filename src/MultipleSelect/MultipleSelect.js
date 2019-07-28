import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import OptionMenu from '../OptionMenu';
import {
  useChipStyles,
  useMultiSelectInputBaseStyles,
  useRootStyles,
} from '../styles/useMultiSelectStyles';
import { filterByInputValue, getMultiSelectOptions } from '../utils/functions';
import {
  injectMenuProps,
  injectTextFieldProps,
  getMultiSelectLogic,
  defaultItemToLabel,
  defaultItemToValue,
} from '../logics/select';
import Collection from '../utils/collection';

const MultipleSelect = props => {
  const {
    options,
    menuId,
    chipId,
    onChangeInput,
    onChange,
    onFocus,
    onBlur,
    InputProps,
    inputProps,
    itemToLabel,
    itemToValue,
    fullOptionReturned,
    rootClasses: extRootClasses,
    chipClasses: extChipClasses,
    chipProps,
    inputBaseClasses: extInputBaseClasses,
  } = props;
  const rootClasses = useRootStyles({ ...props, classes: extRootClasses });
  const chipClasses = useChipStyles({ classes: extChipClasses });
  const inputBaseClasses = useMultiSelectInputBaseStyles({
    classes: extInputBaseClasses,
  });
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
    <div className={rootClasses.root}>
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
          classes: inputBaseClasses,
          startAdornment: selectedItems.map(item => (
            <Chip
              key={itemToValue(item)}
              id={`${chipId}${itemToValue(item)}`}
              {...chipProps}
              classes={chipClasses}
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

export default MultipleSelect;
