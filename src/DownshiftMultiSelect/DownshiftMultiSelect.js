import React, { useRef, useState } from 'react';
import Downshift from 'downshift';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpRounded';
import OptionMenu from '../OptionMenu';
import {
  useRootStyles,
  useChipStyles,
  useMultiSelectInputBaseStyles,
  useToggleStyles,
} from '../styles/useMultiSelectStyles';
import { filterByInputValue, getMultiSelectOptions } from '../utils/functions';
import { createStateReducer } from '../logics/downshift';
import {
  injectMenuProps,
  injectTextFieldProps,
  getMultiSelectLogic,
  defaultItemToLabel,
  defaultItemToValue,
} from '../logics/select';
import Collection from '../utils/collection';

const DownshiftMultiSelect = props => {
  const {
    itemToValue,
    itemToLabel,
    fullOptionReturned,
    onChange: onChangeDS,
    onBlur: onBlurDS,
  } = props;
  const rootClasses = useRootStyles(props);
  const chipClasses = useChipStyles();
  const inputBaseClasses = useMultiSelectInputBaseStyles();
  const toggleClasses = useToggleStyles();
  const inputRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const returnValue = cb => (items, ...args) => {
    return fullOptionReturned ? cb(items, ...args) : cb(items.map(itemToValue));
  };
  const handleChange = returnValue(onChangeDS);
  const handleBlur = returnValue(onBlurDS);
  const stateUpdater = newItems => {
    setSelectedItems(newItems);
    handleChange(newItems);
  };
  const { removeItem, handleSelection, handleKeyDown } = getMultiSelectLogic(
    Collection(selectedItems, itemToValue),
    stateUpdater,
  );
  return (
    <Downshift
      id="downshift-multiple"
      itemToString={itemToValue}
      stateReducer={createStateReducer({ multipleSelect: true })}
      onChange={handleSelection}
      selectedItem={null}
    >
      {downshift => {
        const {
          getInputProps,
          getToggleButtonProps,
          openMenu,
          isOpen,
          inputValue,
          highlightedIndex,
        } = downshift;
        const { value, onChange, onBlur, ...inputProps } = getInputProps({
          onClick: () => {
            openMenu();
          },
          onKeyDown: handleKeyDown(inputValue),
          onBlur: () => handleBlur(selectedItems),
        });
        const toggleBtnProps = getToggleButtonProps({
          onClick: e => {
            e.stopPropagation();
            if (inputRef.current && !isOpen) {
              inputRef.current.focus();
            }
          },
        });
        return (
          <div className={rootClasses.root}>
            <TextField
              {...injectTextFieldProps({
                ...props,
                ...downshift,
                inputProps,
                inputRef,
                value,
                onChange,
                onBlur,
              })}
              required={false}
              InputProps={{
                classes: inputBaseClasses,
                startAdornment: selectedItems.map(item => {
                  return (
                    <Chip
                      key={itemToValue(item)}
                      classes={chipClasses}
                      label={itemToLabel(item)}
                      onDelete={e => {
                        e.stopPropagation();
                        removeItem(item);
                      }}
                    />
                  );
                }),
                endAdornment: (
                  <IconButton {...toggleBtnProps} classes={toggleClasses}>
                    {isOpen ? <ArrowUp /> : <ArrowDown />}
                  </IconButton>
                ),
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
            />
            {isOpen && (
              <OptionMenu
                {...injectMenuProps(
                  {
                    ...props,
                    ...downshift,
                    selectedItems,
                    getSelectOptions: getMultiSelectOptions,
                  },
                  {
                    getItemProps: ({ item, index }) => ({
                      selected: !!selectedItems.includes(item),
                      highlighted: highlightedIndex === index,
                      hoverless: true,
                    }),
                  },
                )}
              />
            )}
          </div>
        );
      }}
    </Downshift>
  );
};

DownshiftMultiSelect.propTypes = {};
DownshiftMultiSelect.defaultProps = {
  options: [],
  maxOptionOutput: 5,
  getOptions: false,
  filterOption: filterByInputValue,
  fullOptionReturned: false,
  selectedItemExcluded: true,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  onChange: () => {},
  onBlur: () => {},
};

export default DownshiftMultiSelect;
