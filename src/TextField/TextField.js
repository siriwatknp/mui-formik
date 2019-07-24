import React from 'react';
import { Field, FastField } from 'formik';
import MuiTextField from '@material-ui/core/TextField';

export const baseProps = {
  margin: 'normal',
  fullWidth: true,
  variant: 'outlined',
};

const Component = ({
  field = {},
  form: { touched, errors } = {},
  helperText,
  ...props
}) => {
  const errorText = errors[field.name];
  const errorShown = touched[field.name] && Boolean(errorText);
  return (
    <MuiTextField
      error={errorShown}
      helperText={errorShown ? errorText : helperText}
      {...field}
      {...props}
    />
  );
};

const TextField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

TextField.baseProps = baseProps;

export default TextField;
