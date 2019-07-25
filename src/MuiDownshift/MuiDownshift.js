import React, { useRef } from 'react';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Backspace from '@material-ui/icons/Backspace';
import Option from '../Option';
import {
  useContainerStyles,
  useRootStyles,
} from '../styles/useMultiSelectStyles';
import { getMaxItems } from '../utils/functions';

const createStateReducer = ({ optionHiddenAfterClicked }) => (
  state,
  changes,
) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.changeInput:
      return {
        ...changes,
        highlightedIndex: 0,
      };
    case Downshift.stateChangeTypes.clickButton:
      return {
        ...changes,
        isOpen: true,
      };
    case Downshift.stateChangeTypes.clickItem:
    case Downshift.stateChangeTypes.keyDownEnter:
      return {
        ...changes,
        isOpen: !optionHiddenAfterClicked,
        highlightedIndex: optionHiddenAfterClicked
          ? null
          : state.highlightedIndex,
      };
    default:
      return changes;
  }
};

const MuiDownshift = ({
  label,
  placeholder,
  fullWidth,
  options,
  variant,
  filterOption,
  getOptions,
  maxOptionOutput,
  optionHiddenAfterClicked,
  fullOptionReturned,
  onChange: onChangeDS,
  onBlur: onBlurDS,
  ...props
}) => {
  const containerClasses = useContainerStyles();
  const rootClasses = useRootStyles({ fullWidth, ...props });
  const inputEl = useRef(null);
  const itemToString = item => (item ? item.value : '');
  const getItems = inputValue => {
    if (getOptions) return getOptions(inputValue);
    if (filterOption === false) return options;
    return options.filter(({ value: optionValue }) =>
      filterOption(inputValue, optionValue),
    );
  };
  const returnValue = cb => (option, ...args) => {
    return fullOptionReturned
      ? cb(option || '', ...args)
      : cb(option ? option.value : '');
  };
  return (
    <Downshift
      id="downshift-multiple"
      itemToString={itemToString}
      stateReducer={createStateReducer({ optionHiddenAfterClicked })}
      onChange={returnValue(onChangeDS)}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        openMenu,
        isOpen,
        inputValue,
        highlightedIndex,
        setHighlightedIndex,
        selectedItem,
        clearSelection,
      }) => {
        const { value, onChange, onBlur, ...inputProps } = getInputProps({
          onChange: e => {
            if (e.target.value === '') {
              clearSelection();
            }
          },
          onBlur: () => {
            returnValue(onBlurDS)(selectedItem);
          },
        });
        const toggleBtnProps = getToggleButtonProps({
          onClick: () => {
            if (inputEl.current) {
              inputEl.current.focus();
            }
          },
        });
        const handleClear = () => {
          clearSelection();
          openMenu();
          if (inputEl.current) {
            inputEl.current.focus();
          }
        };
        return (
          <div className={rootClasses.root}>
            <TextField
              label={label}
              placeholder={placeholder}
              fullWidth={fullWidth}
              variant={variant}
              inputRef={inputEl}
              value={value}
              onChange={onChange}
              InputLabelProps={getLabelProps()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {selectedItem ? (
                      <IconButton onClick={handleClear}>
                        <Backspace />
                      </IconButton>
                    ) : (
                      <IconButton {...toggleBtnProps}>
                        <ArrowDropDown />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={inputProps}
              onBlur={onBlur}
              onFocus={() => {
                openMenu();
                setHighlightedIndex(0);
              }}
            />
            {isOpen && (
              <Paper classes={containerClasses} {...getMenuProps()}>
                {getMaxItems(getItems(inputValue), maxOptionOutput).map(
                  (item, index) => {
                    const itemProps = getItemProps({
                      key: item.value,
                      index,
                      item,
                      selected:
                        selectedItem && selectedItem.value === item.value,
                      highlighted: highlightedIndex === index,
                      hoverless: true,
                    });
                    return <Option {...itemProps}>{item.label}</Option>;
                  },
                )}
              </Paper>
            )}
          </div>
        );
      }}
    </Downshift>
  );
};

MuiDownshift.propTypes = {};
MuiDownshift.defaultProps = {
  options: [],
  maxOptionOutput: false,
  optionHiddenAfterClicked: false,
  getOptions: false,
  filterOption: false,
  fullOptionReturned: false,
  onChange: () => {},
  onBlur: () => {},
};
MuiDownshift.utils = {
  filterByInputValue: (inputValue, optionValue) =>
    !inputValue || optionValue.toLowerCase().includes(inputValue.toLowerCase()),
};

export default MuiDownshift;
