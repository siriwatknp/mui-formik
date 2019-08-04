import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpRounded';
import Backspace from '@material-ui/icons/Backspace';
import styles from './styles';
import OptionMenu from '../OptionMenu';
import { filterByInputValue, getSelectOptions, pick } from '../utils/functions';
import { createStateReducer } from '../logics/downshift';
import {
  defaultItemToLabel,
  defaultItemToValue,
  injectMenuProps,
  injectTextFieldProps,
} from '../logics/select';

const DownshiftSelect = withStyles(styles, { name: 'Downshift' })(props => {
  const {
    variant,
    fullWidth,
    itemToValue,
    menuClosedAfterClicked,
    fullOptionReturned,
    onChange: onChangeDS,
    onBlur: onBlurDS,
    // props for nested components
    classes,
    overrides,
    inputClasses,
    InputProps,
    InputLabelProps,
    FormHelperTextProps,
    iconButtonClasses,
    IconButtonProps,
    svgIconClasses,
    SvgClearIcon,
    SvgToggleUpIcon,
    SvgToggleDownIcon,
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
              InputLabelProps={InputLabelProps}
              FormHelperTextProps={FormHelperTextProps}
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
                endAdornment: (
                  <>
                    {selectedItem ? (
                      <IconButton
                        {...IconButtonProps}
                        classes={{
                          ...iconButtonClasses,
                          root: cx(
                            css.iconBtn,
                            css.clearBtn,
                            iconButtonClasses.root,
                          ),
                          label: cx(css.iconBtnLabel, iconButtonClasses.label),
                        }}
                        onClick={handleClear}
                      >
                        <Backspace
                          classes={{
                            ...svgIconClasses,
                            root: cx(css.svgIcon, svgIconClasses.root),
                          }}
                          component={SvgClearIcon}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        {...IconButtonProps}
                        classes={{
                          ...iconButtonClasses,
                          root: cx(
                            css.iconBtn,
                            css.toggleBtn,
                            iconButtonClasses.root,
                          ),
                          label: cx(css.iconBtnLabel, iconButtonClasses.label),
                        }}
                        {...toggleBtnProps}
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
                {...OptionMenu.getProps(props)}
              />
            )}
          </div>
        );
      }}
    </Downshift>
  );
});

DownshiftSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  menuClosedAfterClicked: PropTypes.bool,
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
  InputLabelProps: PropTypes.shape({}),
  FormHelperTextProps: PropTypes.shape({}),
  svgIconClasses: PropTypes.shape({}),
  SvgClearIcon: PropTypes.elementType,
  SvgToggleUpIcon: PropTypes.elementType,
  SvgToggleDownIcon: PropTypes.elementType,
};
DownshiftSelect.defaultProps = {
  options: [],
  maxOptionOutput: 5,
  menuClosedAfterClicked: true,
  getOptions: false,
  fullOptionReturned: false,
  selectedItemExcluded: true,
  filterOption: filterByInputValue,
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
  InputLabelProps: {},
  FormHelperTextProps: {},
  svgIconClasses: {},
  SvgClearIcon: undefined,
  SvgToggleUpIcon: undefined,
  SvgToggleDownIcon: undefined,
};
DownshiftSelect.pickClasses = classes => pick(classes, styles.traits);
DownshiftSelect.getProps = ({
  // use this fn when this component render as nested component
  downshiftClasses,
  classes,
  downshiftOverrides,
  overrides,
  inputClasses,
  InputProps,
  iconButtonClasses,
  IconButtonProps,
  svgIconClasses,
  SvgClearIcon,
  SvgToggleUpIcon,
  SvgToggleDownIcon,
  ...props
}) => {
  const resultClasses = DownshiftSelect.pickClasses(
    downshiftClasses || classes,
  );
  const resultOverrides = DownshiftSelect.pickClasses(
    downshiftOverrides || overrides,
  );
  return {
    ...OptionMenu.getProps({ classes, overrides, ...props }),
    inputClasses,
    InputProps,
    iconButtonClasses,
    IconButtonProps,
    svgIconClasses,
    SvgClearIcon,
    SvgToggleUpIcon,
    SvgToggleDownIcon,
    classes: resultClasses,
    overrides: resultOverrides,
    downshiftClasses: resultClasses,
    downshiftOverrides: resultOverrides,
  };
};

export default DownshiftSelect;
