import React, { useRef, useState } from 'react';
import cx from 'clsx';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpRounded';
import OptionMenu from '../OptionMenu';
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
    flexWrap: 'wrap',
    padding: '12px 0 8px 12px',
    paddingRight: spacing(6.5),
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
  // Toggle & Clear Btn
  iconBtn: {
    position: 'absolute',
    top: '50%',
    right: 4,
    transform: 'translateY(-50%)',
  },
  iconBtnLabel: {},
  // Toggle Btn
  toggleBtn: {},
  // Clear Btn
  clearBtn: {},
  // the rest is OptionMenu CSS API
});

const DownshiftMultiSelect = props => {
  const {
    fullWidth,
    chipProps,
    classes,
    overrides,
    itemToValue,
    itemToLabel,
    fullOptionReturned,
    onChange: onChangeDS,
    onBlur: onBlurDS,
  } = props;
  const css = overrides || classes;
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
          <div
            className={cx(css.container, fullWidth && css.containerFullWidth)}
          >
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
              onClick={() => {
                openMenu();
              }}
              required={false}
              InputProps={{
                classes: {
                  ...css,
                  root: css.field,
                  input: css.fieldInput,
                },
                startAdornment: selectedItems.map(item => {
                  return (
                    <Chip
                      key={itemToValue(item)}
                      {...chipProps}
                      onClick={() => {
                        openMenu();
                      }}
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
                  );
                }),
                endAdornment: (
                  <IconButton
                    {...toggleBtnProps}
                    classes={{
                      root: cx(css.iconBtn, css.toggleBtn),
                      label: css.iconBtnLabel,
                    }}
                  >
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

export default withStyles(styles, { name: 'MultiDownshift' })(
  DownshiftMultiSelect,
);
