import React, { useRef } from 'react';
import cx from 'clsx';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpRounded';
import Backspace from '@material-ui/icons/Backspace';
import OptionMenu from '../OptionMenu';
import { filterByInputValue, getSelectOptions } from '../utils/functions';
import { createStateReducer } from '../logics/downshift';
import {
  defaultItemToLabel,
  defaultItemToValue,
  injectMenuProps,
  injectTextFieldProps,
} from '../logics/select';

const styles = ({ spacing }) => ({
  // Root CSS
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  containerFullWidth: {
    display: 'block',
  },
  // TextField CSS
  field: {
    paddingRight: spacing(0.5),
  },
  fieldInput: {},
  // Toggle & Clear Btn
  iconBtn: {},
  iconBtnLabel: {},
  // Toggle Btn
  toggleBtn: {},
  // Clear Btn
  clearBtn: {},
  // the rest is OptionMenu CSS API
});

const DownshiftSelect = props => {
  const {
    fullWidth,
    classes,
    overrides,
    itemToValue,
    menuClosedAfterClicked,
    fullOptionReturned,
    onChange: onChangeDS,
    onBlur: onBlurDS,
  } = props;
  const css = overrides || classes;
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
          <div
            className={cx(css.container, fullWidth && css.containerFullWidth)}
          >
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
                classes: {
                  ...css,
                  root: css.field,
                  input: css.fieldInput,
                },
                endAdornment: (
                  <>
                    {selectedItem ? (
                      <IconButton
                        classes={{
                          root: cx(css.iconBtn, css.clearBtn),
                          label: css.iconBtnLabel,
                        }}
                        onClick={handleClear}
                        disableRipple
                      >
                        <Backspace />
                      </IconButton>
                    ) : (
                      <IconButton
                        classes={{
                          root: cx(css.iconBtn, css.toggleBtn),
                          label: css.iconBtnLabel,
                        }}
                        disableRipple
                        {...toggleBtnProps}
                      >
                        {isOpen ? <ArrowUp /> : <ArrowDown />}
                      </IconButton>
                    )}
                  </>
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

export default withStyles(styles, { name: 'Downshift' })(DownshiftSelect);
