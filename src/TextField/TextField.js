import React from 'react';
import { Field, FastField } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import { getErrorFromField } from '../utils/functions';

export const baseProps = {
  margin: 'normal',
  fullWidth: true,
  variant: 'outlined',
};

const Component = ({ field, form, helperText, ...props }) => {
  const [errorShown, errorText] = getErrorFromField({ field, form });
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
