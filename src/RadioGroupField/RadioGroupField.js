import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { FastField, Field } from 'formik';
import { withStyles } from 'mui-styling';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import createStyles from './RadioGroupField.styles';
import { defaultItemToLabel, defaultItemToValue } from '../logics/select';
import { getErrorFromField } from '../utils/functions';

const Component = withStyles(createStyles, { name: 'RadioGroupField' })(
  ({
    field,
    field: { value, onChange },
    form,
    options,
    helperText,
    label,
    fullOptionReturned,
    css,
    itemToLabel,
    itemToValue,
    FormLabelProps,
    formLabelClasses,
    RadioGroupProps,
    radioGroupClasses,
    FormControlProps,
    getControlLabelProps,
    formControlClasses,
    FormControlLabelProps,
    formControlLabelClasses,
    getRadioProps,
    RadioProps,
    radioClasses,
    FormHelperTextProps,
    formHelperTextClasses,
  }) => {
    const [errorShown, errorText] = getErrorFromField({ field, form });
    const getItem = e => {
      const { value: currentValue } = e.target;
      return {
        target: {
          name: field.name,
          value: options.find(item => itemToValue(item) === currentValue),
        },
      };
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
        <RadioGroup
          {...RadioGroupProps}
          name={field.name}
          classes={radioGroupClasses}
          value={fullOptionReturned ? itemToValue(value) || '' : value}
          onChange={e =>
            fullOptionReturned ? onChange(getItem(e)) : onChange(e)
          }
        >
          {options.map(item => (
            <FormControlLabel
              {...FormControlLabelProps}
              {...getControlLabelProps(item)}
              classes={formControlLabelClasses}
              key={itemToValue(item)}
              control={
                <Radio
                  {...RadioProps}
                  {...getRadioProps(item)}
                  classes={radioClasses}
                  value={itemToValue(item)}
                />
              }
              label={itemToLabel(item)}
            />
          ))}
        </RadioGroup>
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
  getRadioProps: PropTypes.func,
  fullOptionReturned: PropTypes.bool,
  itemToLabel: PropTypes.func,
  itemToValue: PropTypes.func,
  FormLabelProps: PropTypes.shape({}),
  formLabelClasses: PropTypes.shape({}),
  RadioGroupProps: PropTypes.shape({}),
  radioGroupClasses: PropTypes.shape({}),
  FormControlProps: PropTypes.shape({}),
  formControlClasses: PropTypes.shape({}),
  FormControlLabelProps: PropTypes.shape({}),
  formControlLabelClasses: PropTypes.shape({}),
  RadioProps: PropTypes.shape({}),
  radioClasses: PropTypes.shape({}),
  FormHelperTextProps: PropTypes.shape({}),
  formHelperTextClasses: PropTypes.shape({}),
};
CheckGroupField.defaultProps = {
  options: [],
  getControlLabelProps: () => ({}),
  getRadioProps: () => ({}),
  fullOptionReturned: false,
  itemToLabel: defaultItemToLabel,
  itemToValue: defaultItemToValue,
  formLabelClasses: {},
  FormLabelProps: {},
  RadioGroupProps: {},
  radioGroupClasses: {},
  FormControlProps: {},
  formControlClasses: {},
  FormControlLabelProps: {},
  formControlLabelClasses: {},
  RadioProps: {},
  radioClasses: {},
  FormHelperTextProps: {},
  formHelperTextClasses: {},
};
CheckGroupField.getProps = ({
  getControlLabelProps,
  getRadioProps,
  FormControlProps,
  formControlClasses,
  FormControlLabelProps,
  formControlLabelClasses,
  RadioGroupProps,
  radioGroupClasses,
  RadioProps,
  radioClasses,
  FormHelperTextProps,
  formHelperTextClasses,
  checkLabelFieldClasses,
  checkLabelFieldOverrides,
}) => ({
  getControlLabelProps,
  getRadioProps,
  FormControlProps,
  formControlClasses,
  FormControlLabelProps,
  formControlLabelClasses,
  RadioGroupProps,
  radioGroupClasses,
  RadioProps,
  radioClasses,
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
