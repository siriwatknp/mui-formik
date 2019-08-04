import React from 'react';
import cx from 'clsx';
import { FastField, Field } from 'formik';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiCheckbox from '@material-ui/core/Checkbox/Checkbox';
import styles from './styles';
import { getErrorFromField, pick } from '../utils/functions';

const Component = withStyles(styles, { name: 'CheckLabelField' })(
  ({
    field,
    field: { value },
    form,
    helperText,
    label,
    FormControlProps,
    formControlClasses,
    FormControlLabelProps,
    formControlLabelClasses,
    CheckboxProps,
    checkboxClasses,
    FormHelperTextProps,
    formHelperTextClasses,
    classes,
    overrides,
  }) => {
    const css = overrides || classes;
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
            classes={formHelperTextClasses}
            {...FormHelperTextProps}
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

CheckLabelField.pickClasses = classes => pick(classes, styles.traits);
CheckLabelField.getProps = ({
  FormControlProps,
  formControlClasses,
  FormControlLabelProps,
  formControlLabelClasses,
  CheckboxProps,
  checkboxClasses,
  FormHelperTextProps,
  formHelperTextClasses,
  classes,
  checkLabelFieldClasses,
  overrides,
  checkLabelFieldOverrides,
}) => {
  const resultClasses = CheckLabelField.pickClasses(
    checkLabelFieldClasses || classes,
  );
  const resultOverrides = CheckLabelField.pickClasses(
    checkLabelFieldOverrides || overrides,
  );
  return {
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
    classes: resultClasses,
    overrides: resultOverrides,
  };
};
CheckLabelField.baseProps = {
  fullWidth: true,
  margin: 'normal',
};

export default CheckLabelField;
