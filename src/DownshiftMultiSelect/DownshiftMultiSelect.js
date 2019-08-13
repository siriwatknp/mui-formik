import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Downshift from 'downshift';
import { withStyles } from 'mui-styling';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpRounded';
import createStyles from './DownshiftMultiSelect.styles';
import OptionMenu from '../OptionMenu';
import { filterByInputValue, getMultiSelectOptions } from '../utils/functions';
import { createStateReducer } from '../logics/downshift';
import {
  injectMenuProps,
  injectTextFieldProps,
  getMultiSelectLogic,
  defaultItemToLabel,
  defaultItemToValue,
  getSelectedItems,
} from '../logics/select';
import Collection from '../utils/collection';

const DownshiftMultiSelect = withStyles(createStyles, {
  name: 'MultiDownshift',
})(props => {
  const {
    options,
    forceOpen,
    variant,
    fullWidth,
    itemToValue,
    itemToLabel,
    fullOptionReturned,
    value: valueDS,
    onChange: onChangeDS,
    onBlur: onBlurDS,
    DownshiftProps,
    // props for nested components
    css,
    InputProps,
    inputClasses,
    inputLabelClasses,
    InputLabelProps,
    formHelperTextClasses,
    FormHelperTextProps,
    ChipProps,
    chipClasses,
    IconButtonProps,
    iconButtonClasses,
    svgIconClasses,
    SvgToggleUpIcon,
    SvgToggleDownIcon,
  } = props;
  const inputRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState(
    getSelectedItems(options, valueDS, {
      fullOptionReturned,
      itemToValue,
    }),
  );
  useEffect(() => {
    if (valueDS) {
      setSelectedItems(
        getSelectedItems(options, valueDS, {
          fullOptionReturned,
          itemToValue,
        }),
      );
    }
  }, [valueDS]);
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
      {...DownshiftProps}
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
          ...IconButtonProps,
          onClick: e => {
            e.stopPropagation();
            if (IconButtonProps.onClick) {
              IconButtonProps.onClick(e);
            }
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
              InputLabelProps={{
                ...InputLabelProps,
                classes: inputLabelClasses,
              }}
              FormHelperTextProps={{
                ...FormHelperTextProps,
                classes: formHelperTextClasses,
              }}
              onClick={() => {
                openMenu();
              }}
              required={false}
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
                startAdornment: selectedItems.map(item => {
                  return (
                    <Chip
                      key={itemToValue(item)}
                      {...ChipProps}
                      onClick={() => {
                        openMenu();
                      }}
                      classes={{
                        ...chipClasses,
                        root: cx(css.chipRoot, chipClasses.root),
                        label: cx(css.chipLabel, chipClasses.label),
                        deleteIcon: cx(
                          css.chipDeleteIcon,
                          chipClasses.deleteIcon,
                        ),
                        deletable: cx(css.chipDeletable, chipClasses.deletable),
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
                      ...iconButtonClasses,
                      root: cx(
                        css.iconBtn,
                        css.toggleBtn,
                        iconButtonClasses.root,
                      ),
                      label: cx(css.iconBtnLabel, iconButtonClasses.label),
                    }}
                  >
                    {isOpen ? (
                      <ArrowUp
                        classes={{
                          ...svgIconClasses,
                          root: cx(css.svgIcon, svgIconClasses.root),
                        }}
                        component={SvgToggleUpIcon}
                      />
                    ) : (
                      <ArrowDown
                        classes={{
                          ...svgIconClasses,
                          root: cx(css.svgIcon, svgIconClasses.root),
                        }}
                        component={SvgToggleDownIcon}
                      />
                    )}
                  </IconButton>
                ),
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
            />
            {(forceOpen || isOpen) && (
              <OptionMenu
                {...injectMenuProps(
                  {
                    ...props,
                    ...downshift,
                    selectedItems,
                    getSelectOptions: getMultiSelectOptions,
                  },
                  {
                    getItemProps: ({ index }) => ({
                      highlighted: highlightedIndex === index,
                    }),
                  },
                )}
                {...OptionMenu.getOverrides(css, props)}
                {...OptionMenu.getProps(props)}
              />
            )}
          </div>
        );
      }}
    </Downshift>
  );
});

DownshiftMultiSelect.propTypes = {
  forceOpen: PropTypes.bool,
  DownshiftProps: PropTypes.shape({}),
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
  iconButtonClasses: PropTypes.shape({}),
  IconButtonProps: PropTypes.shape({}),
  inputLabelClasses: PropTypes.shape({}),
  InputLabelProps: PropTypes.shape({}),
  formHelperTextClasses: PropTypes.shape({}),
  FormHelperTextProps: PropTypes.shape({}),
  svgIconClasses: PropTypes.shape({}),
  SvgClearIcon: PropTypes.elementType,
  SvgToggleUpIcon: PropTypes.elementType,
  SvgToggleDownIcon: PropTypes.elementType,
};
DownshiftMultiSelect.defaultProps = {
  forceOpen: false, // for debugging purpose
  DownshiftProps: {},
  options: [],
  maxOptionOutput: false,
  getOptions: false,
  filterOption: filterByInputValue,
  fullOptionReturned: false,
  selectedItemExcluded: false,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  onChange: () => {},
  onBlur: () => {},
  classes: {},
  overrides: undefined,
  inputClasses: {},
  InputProps: {},
  chipClasses: {},
  ChipProps: {},
  iconButtonClasses: {},
  IconButtonProps: {},
  inputLabelClasses: {},
  InputLabelProps: {},
  formHelperTextClasses: {},
  FormHelperTextProps: {},
  svgIconClasses: {},
  SvgClearIcon: undefined,
  SvgToggleUpIcon: undefined,
  SvgToggleDownIcon: undefined,
};
DownshiftMultiSelect.getProps = ({
  // use this fn when this component render as nested component
  inputClasses,
  InputProps,
  ChipProps,
  chipClasses,
  iconButtonClasses,
  IconButtonProps,
  svgIconClasses,
  SvgToggleUpIcon,
  SvgToggleDownIcon,
}) => ({
  InputProps,
  inputClasses,
  ChipProps,
  chipClasses,
  iconButtonClasses,
  IconButtonProps,
  svgIconClasses,
  SvgToggleUpIcon,
  SvgToggleDownIcon,
});

export default DownshiftMultiSelect;
