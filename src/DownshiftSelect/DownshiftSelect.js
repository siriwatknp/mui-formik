import React, { useRef } from 'react';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpRounded';
import Backspace from '@material-ui/icons/Backspace';
import OptionMenu from '../OptionMenu';
import {
  useRootStyles,
  useSelectInputBaseStyles,
} from '../styles/useMultiSelectStyles';
import { filterByInputValue, getSelectOptions } from '../utils/functions';
import { createStateReducer } from '../logics/downshift';
import {
  defaultItemToLabel,
  defaultItemToValue,
  injectMenuProps,
  injectTextFieldProps,
} from '../logics/select';

const DownshiftSelect = props => {
  const {
    itemToValue,
    menuClosedAfterClicked,
    fullOptionReturned,
    onChange: onChangeDS,
    onBlur: onBlurDS,
  } = props;
  const rootClasses = useRootStyles(props);
  const inputBaseClasses = useSelectInputBaseStyles();
  const inputRef = useRef(null);
  const returnValue = cb => (option, ...args) => {
    return fullOptionReturned
      ? cb(option || '', ...args)
      : cb(option ? itemToValue(option) : '');
  };
  const handleChange = returnValue(onChangeDS);
  const handleBlur = returnValue(onBlurDS);
  return (
    <Downshift
      id="downshift"
      itemToString={itemToValue}
      stateReducer={createStateReducer({ menuClosedAfterClicked })}
      onChange={handleChange}
    >
      {downshift => {
        const {
          getInputProps,
          getToggleButtonProps,
          openMenu,
          isOpen,
          highlightedIndex,
          selectedItem,
          clearSelection,
        } = downshift;
        const { value, onChange, onBlur, ...inputProps } = getInputProps({
          onClick: () => {
            openMenu();
          },
          onChange: e => {
            if (e.target.value === '') {
              clearSelection();
            }
          },
          onBlur: () => {
            handleBlur(selectedItem);
          },
        });
        const toggleBtnProps = getToggleButtonProps({
          onClick: e => {
            e.stopPropagation();
            if (inputRef.current && !isOpen) {
              inputRef.current.focus();
            }
          },
        });
        const handleClear = e => {
          e.stopPropagation();
          clearSelection();
          setTimeout(openMenu, 10);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        };
        return (
          <div className={rootClasses.root}>
            <TextField
              {...injectTextFieldProps({
                ...props,
                ...downshift,
                inputProps,
                onBlur,
                inputRef,
                value,
                onChange,
              })}
              InputProps={{
                classes: inputBaseClasses,
                endAdornment: (
                  <InputAdornment position="end">
                    {selectedItem ? (
                      <IconButton onClick={handleClear}>
                        <Backspace />
                      </IconButton>
                    ) : (
                      <IconButton {...toggleBtnProps}>
                        {isOpen ? <ArrowUp /> : <ArrowDown />}
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {isOpen && (
              <OptionMenu
                {...injectMenuProps(
                  {
                    ...props,
                    ...downshift,
                    getSelectOptions,
                  },
                  {
                    getItemProps: ({ item, index }) => ({
                      selected:
                        selectedItem &&
                        itemToValue(selectedItem) === itemToValue(item),
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

DownshiftSelect.propTypes = {};
DownshiftSelect.defaultProps = {
  options: [],
  maxOptionOutput: 5,
  menuClosedAfterClicked: true,
  getOptions: false,
  filterOption: filterByInputValue,
  fullOptionReturned: false,
  selectedItemExcluded: true,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  onChange: () => {},
  onBlur: () => {},
};

export default DownshiftSelect;
