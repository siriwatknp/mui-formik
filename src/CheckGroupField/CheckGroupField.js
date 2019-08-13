import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { FastField, Field } from 'formik';
import { withStyles } from 'mui-styling';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import createStyles from './CheckGroupField.styles';
import { defaultItemToLabel, defaultItemToValue } from '../logics/select';
import { getErrorFromField } from '../utils/functions';

const Component = withStyles(createStyles, { name: 'CheckGroupField' })(
  ({
    field,
    field: { value, onChange },
    form,
    options,
    helperText,
    label,
    fullOptionReturned,
    valueType,
    css,
    itemToLabel,
    itemToValue,
    FormLabelProps,
    formLabelClasses,
    FormGroupProps,
    formGroupClasses,
    FormControlProps,
    formControlClasses,
    getControlLabelProps,
    FormControlLabelProps,
    formControlLabelClasses,
    getCheckboxProps,
    CheckboxProps,
    checkboxClasses,
    FormHelperTextProps,
    formHelperTextClasses,
  }) => {
    const [errorShown, errorText] = getErrorFromField({ field, form });
    const isChecked = item => {
      if (valueType === 'array') {
        if (fullOptionReturned) {
          return value.some(
            valueItem => itemToValue(valueItem) === itemToValue(item),
          );
        }
        return value.some(valueItem => valueItem === itemToValue(item));
      }
      if (valueType === 'object') {
        return Object.keys(value).some(
          valueItem => valueItem === itemToValue(item),
        );
      }
      return false;
    };
    const handleChange = item => () => {
      // val will always be string
      const changes = { name: field.name };
      if (isChecked(item)) {
        // remove this item from value
        if (valueType === 'array') {
          changes.value = value.filter(
            valueItem =>
              itemToValue(item) !==
              (fullOptionReturned ? itemToValue(valueItem) : valueItem),
          );
        }
        if (valueType === 'object') {
          const newValue = Object.assign({}, value);
          delete newValue[itemToValue(item)]; // remove that key from value
          changes.value = newValue;
        }
      } else {
        // add this item from value
        if (valueType === 'array') {
          changes.value = [
            ...value,
            fullOptionReturned ? item : itemToValue(item),
          ];
        }
        if (valueType === 'object') {
          changes.value = {
            ...value,
            [itemToValue(item)]: fullOptionReturned ? item : true,
          };
        }
      }
      onChange({ target: changes });
    };
    return (
      <FormControl
        {...FormControlProps}
        error={errorShown}
        classes={formControlClasses}
      >
        <FormLabel
          {...FormLabelProps}
          classes={{
            ...formLabelClasses,
            root: cx(css.fieldLabel, formLabelClasses.root),
          }}
        >
          {label}
        </FormLabel>
        <FormGroup {...FormGroupProps} classes={formGroupClasses}>
          {options.map(item => (
            <FormControlLabel
              {...FormControlLabelProps}
              {...getControlLabelProps(item)}
              classes={formControlLabelClasses}
              key={itemToValue(item)}
              control={
                <Checkbox
                  {...CheckboxProps}
                  {...getCheckboxProps(item)}
                  classes={checkboxClasses}
                  checked={isChecked(item)}
                  onChange={handleChange(item)}
                  value={itemToValue(item)}
                />
              }
              label={itemToLabel(item)}
            />
          ))}
        </FormGroup>
        {(helperText || errorShown) && (
          <FormHelperText
            {...FormHelperTextProps}
            classes={formHelperTextClasses}
          >
            {errorShown ? errorText : helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);

const CheckGroupField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

CheckGroupField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  ),
  getControlLabelProps: PropTypes.func,
  getCheckboxProps: PropTypes.func,
  valueType: PropTypes.oneOf(['object', 'array']),
  fullOptionReturned: PropTypes.bool,
  itemToLabel: PropTypes.func,
  itemToValue: PropTypes.func,
  FormGroupProps: PropTypes.shape({}),
  formGroupClasses: PropTypes.shape({}),
  FormLabelProps: PropTypes.shape({}),
  formLabelClasses: PropTypes.shape({}),
  FormControlProps: PropTypes.shape({}),
  formControlClasses: PropTypes.shape({}),
  FormControlLabelProps: PropTypes.shape({}),
  formControlLabelClasses: PropTypes.shape({}),
  CheckboxProps: PropTypes.shape({}),
  checkboxClasses: PropTypes.shape({}),
  FormHelperTextProps: PropTypes.shape({}),
  formHelperTextClasses: PropTypes.shape({}),
};
CheckGroupField.defaultProps = {
  options: [],
  getControlLabelProps: () => ({}),
  getCheckboxProps: () => ({}),
  valueType: 'array',
  fullOptionReturned: false,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  FormGroupProps: {},
  formGroupClasses: {},
  formLabelClasses: {},
  FormLabelProps: {},
  FormControlProps: {},
  formControlClasses: {},
  FormControlLabelProps: {},
  formControlLabelClasses: {},
  CheckboxProps: {},
  checkboxClasses: {},
  FormHelperTextProps: {},
  formHelperTextClasses: {},
};
CheckGroupField.getProps = ({
  getControlLabelProps,
  getCheckboxProps,
  FormGroupProps,
  formGroupClasses,
  FormControlProps,
  formControlClasses,
  FormControlLabelProps,
  formControlLabelClasses,
  CheckboxProps,
  checkboxClasses,
  FormHelperTextProps,
  formHelperTextClasses,
  checkLabelFieldClasses,
  checkLabelFieldOverrides,
}) => ({
  getControlLabelProps,
  getCheckboxProps,
  FormGroupProps,
  formGroupClasses,
  FormControlProps,
  formControlClasses,
  FormControlLabelProps,
  formControlLabelClasses,
  CheckboxProps,
  checkboxClasses,
  FormHelperTextProps,
  formHelperTextClasses,
  checkLabelFieldClasses,
  checkLabelFieldOverrides,
});
CheckGroupField.baseProps = {
  FormControlProps: {
    fullWidth: true,
    margin: 'normal',
  },
};

export default CheckGroupField;
