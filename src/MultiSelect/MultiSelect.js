import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import styles from './styles';
import OptionMenu from '../OptionMenu';
import {
  injectMenuProps,
  injectTextFieldProps,
  getMultiSelectLogic,
  defaultItemToLabel,
  defaultItemToValue,
} from '../logics/select';
import {
  filterByInputValue,
  getMultiSelectOptions,
  pick,
} from '../utils/functions';
import Collection from '../utils/collection';

const MultiSelect = withStyles(styles, { name: 'MultiSelect' })(props => {
  const {
    options,
    menuId,
    chipId,
    variant,
    fullWidth,
    onChangeInput,
    onChange,
    onFocus,
    onBlur,
    itemToLabel,
    itemToValue,
    fullOptionReturned,
    // props for nested components
    InputProps,
    inputProps,
    inputClasses,
    ChipProps,
    chipClasses,
    classes,
    overrides,
  } = props;
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
            ...inputClasses,
            root: cx(css.field, inputClasses.root),
            input: cx(css.fieldInput, inputClasses.input),
            focused: cx(css.fieldFocused, inputClasses.focused),
            ...(variant === 'outlined' && {
              notchedOutline: cx(
                css.fieldNotchedOutline,
                inputClasses.notchedOutline,
              ),
            }),
          },
          startAdornment: selectedItems.map(item => (
            <Chip
              key={itemToValue(item)}
              id={`${chipId}${itemToValue(item)}`}
              {...ChipProps}
              classes={{
                ...chipClasses,
                root: cx(css.chipRoot, chipClasses.root),
                label: cx(css.chipLabel, chipClasses.label),
                deleteIcon: cx(css.chipDeleteIcon, chipClasses.deleteIcon),
                deletable: cx(css.chipDeletable, chipClasses.deletable),
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
                onClick: e => {
                  e.stopPropagation();
                  if (!selectedItems.includes(item)) {
                    setInputValue('');
                  }
                  handleSelection(item);
                },
              }),
            },
          )}
          {...OptionMenu.getProps(props)}
        />
      )}
    </div>
  );
});

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeInput: PropTypes.func,
  selectedItemExcluded: PropTypes.bool,
  fullOptionReturned: PropTypes.bool,
  filterOption: PropTypes.func,
  itemToLabel: PropTypes.func,
  itemToValue: PropTypes.func,
  classes: PropTypes.shape({}),
  overrides: PropTypes.shape({}),
  inputClasses: PropTypes.shape({}),
  InputProps: PropTypes.shape({}),
  chipClasses: PropTypes.shape({}),
  ChipProps: PropTypes.shape({}),
};
MultiSelect.defaultProps = {
  options: [],
  menuId: '__menu__',
  chipId: '__chip__',
  value: [],
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onChangeInput: () => {},
  fullOptionReturned: false,
  selectedItemExcluded: false,
  filterOption: filterByInputValue,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  classes: {},
  overrides: undefined,
  inputClasses: {},
  InputProps: {},
  chipClasses: {},
  ChipProps: {},
};
MultiSelect.pickClasses = classes => pick(classes, styles.traits);
MultiSelect.getProps = ({
  // use this fn when this component render as nested component
  multiSelectClasses,
  classes,
  multiSelectOverrides,
  overrides,
  InputProps,
  inputProps,
  inputClasses,
  ChipProps,
  chipClasses,
  ...props
}) => {
  const resultClasses = MultiSelect.pickClasses(multiSelectClasses || classes);
  const resultOverrides = MultiSelect.pickClasses(
    multiSelectOverrides || overrides,
  );
  return {
    ...OptionMenu.getProps({ classes, overrides, ...props }),
    InputProps,
    inputProps,
    inputClasses,
    ChipProps,
    chipClasses,
    classes: resultClasses,
    overrides: resultOverrides,
    multiSelectClasses: resultClasses,
    multiSelectOverrides: resultOverrides,
  };
};

export default MultiSelect;
