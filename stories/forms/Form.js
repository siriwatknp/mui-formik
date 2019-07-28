import React from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useSubmitStyles from '../../src/styles/useSubmitStyles';

const Form = ({ children, title, ...props }) => {
  const submitClasses = useSubmitStyles();
  return (
    <Box maxWidth={375} mt={2} mx={'auto'}>
      <Paper>
        <Box p={2}>
          {title && (
            <Typography variant={'h6'} gutterBottom>
              {title}
            </Typography>
          )}
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
        </Box>
      </Paper>
    </Box>
  );
};

Form.propTypes = {};
Form.defaultProps = {};

export default Form;
