import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '../../src/TextField';
import useSubmitStyles from '../../src/styles/useSubmitStyles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required'),
});

const LoginForm = () => {
  const submitClasses = useSubmitStyles({
    width: { xs: '100%', sm: 'auto' },
  });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => {
        console.log('values', values);
        console.log('actions', actions);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, handleSubmit, isSubmitting }) => {
        console.log('errors', errors);
        console.log('touched', touched);
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              {...TextField.baseProps}
              name="email"
              label="Email"
              required
            />
            <TextField
              {...TextField.baseProps}
              name="password"
              label="Password"
              type="password"
              required
            />
            <Button
              classes={submitClasses}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {};
LoginForm.defaultProps = {};

export default LoginForm;
