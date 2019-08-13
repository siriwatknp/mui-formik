import React from 'react';
import { Field, FastField } from 'formik';
import { getErrorFromField } from '../utils/functions';
import DownshiftMultiSelect from '../DownshiftMultiSelect';

const Component = ({ field, form, helperText, ...props }) => {
  const [errorShown, errorText] = getErrorFromField({ field, form });
  const handleChange = value =>
    field.onChange({ target: { value, name: field.name, id: field.id } });
  return (
    <DownshiftMultiSelect
      error={errorShown}
      helperText={errorShown ? errorText : helperText}
      {...field}
      onChange={handleChange}
      onBlur={handleChange}
      {...props}
    />
  );
};

const DsMultiSelectField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

DsMultiSelectField.baseProps = {
  margin: 'normal',
  fullWidth: true,
  variant: 'outlined',
};

export default DsMultiSelectField;
