import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Field } from 'formik';
import InputBase from '@material-ui/core/InputBase';
import { getErrorFromField } from '../utils/functions';

const Component = ({ field, form, renderHelperText, ...props }) => {
  const [errorShown, errorText] = getErrorFromField({ field, form });
  return (
    <>
      <InputBase error={errorShown} {...props} {...field} />
      {renderHelperText(errorShown, errorText)}
    </>
  );
};

const InputBaseField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

InputBaseField.propTypes = {
  renderHelperText: PropTypes.func,
};
InputBaseField.defaultProps = {
  renderHelperText: () => null,
};

export default InputBaseField;
