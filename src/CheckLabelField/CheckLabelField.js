import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { FastField, Field } from 'formik';
import { withStyles } from 'mui-styling';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiCheckbox from '@material-ui/core/Checkbox/Checkbox';
import createStyles from './CheckLabelField.styles';
import { getErrorFromField } from '../utils/functions';

const Component = withStyles(createStyles, { name: 'CheckLabelField' })(
  ({
    field,
    field: { value },
    form,
    helperText,
    label,
    css,
    FormControlProps,
    formControlClasses,
    FormControlLabelProps,
    formControlLabelClasses,
    CheckboxProps,
    checkboxClasses,
    FormHelperTextProps,
    formHelperTextClasses,
  }) => {
    const [errorShown, errorText] = getErrorFromField({ field, form });
    return (
      <FormControl
        error={errorShown}
        classes={formControlClasses}
        {...FormControlProps}
      >
        <FormControlLabel
          clasess={formControlLabelClasses}
          {...FormControlLabelProps}
          label={label}
          control={
            <MuiCheckbox
              classes={{
                ...checkboxClasses,
                root: cx(errorShown && css.checkboxError, checkboxClasses.root),
              }}
              checked={value}
              {...CheckboxProps}
              {...field}
            />
          }
        />
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

const CheckLabelField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

CheckLabelField.propTypes = {
  FormControlProps: PropTypes.shape({}),
  formControlClasses: PropTypes.shape({}),
  FormControlLabelProps: PropTypes.shape({}),
  formControlLabelClasses: PropTypes.shape({}),
  CheckboxProps: PropTypes.shape({}),
  checkboxClasses: PropTypes.shape({}),
  FormHelperTextProps: PropTypes.shape({}),
  formHelperTextClasses: PropTypes.shape({}),
};
CheckLabelField.defaultProps = {
  FormControlProps: {},
  formControlClasses: {},
  FormControlLabelProps: {},
  formControlLabelClasses: {},
  CheckboxProps: {},
  checkboxClasses: {},
  FormHelperTextProps: {},
  formHelperTextClasses: {},
};
CheckLabelField.getProps = ({
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
CheckLabelField.baseProps = {
  FormControlProps: {
    fullWidth: true,
    margin: 'normal',
  },
};

export default CheckLabelField;
