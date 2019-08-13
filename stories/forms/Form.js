import React, { useState } from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useSubmitStyles from '../../src/styles/useSubmitStyles';

const Form = ({ children, title, ...props }) => {
  const submitClasses = useSubmitStyles();
  const [state, setState] = useState({});
  return (
    <Box maxWidth={375} mt={2} mx={'auto'}>
      <Paper>
        <Box p={2}>
          {title && (
            <Typography variant={'h6'} gutterBottom>
              {title}
            </Typography>
          )}
          <Formik
            onSubmit={values => setState(values)}
            onReset={() => setState({})}
            {...props}
          >
            {({ handleSubmit, handleReset, ...rest }) => (
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
                <Button
                  classes={submitClasses}
                  style={{ marginLeft: 16 }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Paper>
      <Box mt={2} py={1} px={2} bgcolor={'grey.100'} borderRadius={8}>
        <Typography variant={'subtitle2'}>Values</Typography>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Box>
    </Box>
  );
};

Form.propTypes = {};
Form.defaultProps = {};

export default Form;
