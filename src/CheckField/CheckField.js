import React from 'react';
import { FastField, Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiCheckbox from '@material-ui/core/Checkbox/Checkbox';
import useCheckErrorStyles from '../styles/useCheckErrorStyles';
import { getErrorFromField } from '../utils/functions';

const Component = ({
  field,
  field: { value },
  form,
  helperText,
  label,
  ...props
}) => {
  const checkClasses = useCheckErrorStyles({ field, form });
  const [errorShown, errorText] = getErrorFromField({ field, form });
  return (
    <FormControl error={errorShown} {...props}>
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox classes={checkClasses} checked={value} {...field} />
        }
      />
      {(helperText || errorShown) && (
        <FormHelperText>{errorShown ? errorText : helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

const CheckField = ({ fastFieldUsed, ...props }) => {
  const similarProps = { ...props, component: Component };
  return fastFieldUsed ? (
    <FastField {...similarProps} />
  ) : (
    <Field {...similarProps} />
  );
};

CheckField.baseProps = {
  fullWidth: true,
  margin: 'normal',
};

export default CheckField;
