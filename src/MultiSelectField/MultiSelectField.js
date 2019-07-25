import React from 'react';
import { Field, FastField } from 'formik';
import { getErrorFromField } from '../utils/functions';
import MultipleSelect from '../MultipleSelect';

const Component = ({ field, form, helperText, ...props }) => {
  const [errorShown, errorText] = getErrorFromField({ field, form });
  return (
    <MultipleSelect
      error={errorShown}
      helperText={errorShown ? errorText : helperText}
      {...field}
      onChange={value =>
        field.onChange({ target: { value, name: field.name, id: field.id } })
      }
      {...props}
    />
  );
};

const MultiSelectField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

MultiSelectField.baseProps = {
  margin: 'normal',
  fullWidth: true,
  variant: 'outlined',
};

export default MultiSelectField;
