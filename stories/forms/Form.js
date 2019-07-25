import React from 'react';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useSubmitStyles from '../../src/styles/useSubmitStyles';

const Form = ({ children, ...props }) => {
  const submitClasses = useSubmitStyles();
  return (
    <Paper style={{ maxWidth: 375, padding: 16, margin: 'auto' }}>
      <Formik onSubmit={values => console.log(values)} {...props}>
        {({ handleSubmit, ...rest }) => (
          <form onSubmit={handleSubmit}>
            {typeof children === 'function' ? children(rest) : children}
            <Button
              classes={submitClasses}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

Form.propTypes = {};
Form.defaultProps = {};

export default Form;
