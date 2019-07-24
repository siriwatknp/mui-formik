import React from 'react';
import { Field, FastField } from 'formik';
import MuiCheckbox from '@material-ui/core/Checkbox';
import useCheckErrorStyles from '../styles/useCheckErrorStyles';

const Component = ({ field: { value, ...field }, form, ...props }) => {
  const classes = useCheckErrorStyles({
    touched: form.touched,
    errors: form.errors,
    name: field.name,
  });
  return (
    <MuiCheckbox classes={classes} checked={value} {...field} {...props} />
  );
};

const Checkbox = ({ fastField, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastField ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

Checkbox.propTypes = {};
Checkbox.defaultProps = {};

export default Checkbox;
