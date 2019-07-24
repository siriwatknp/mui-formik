import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '../../src/TextField';
import CheckField from '../../src/CheckField';
import useSubmitStyles from '../../src/styles/useSubmitStyles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  accepted: Yup.boolean()
    .oneOf([true], 'You must accept terms of service')
    .required('You must accept terms of service'),
});

const SignUpForm = () => {
  const submitClasses = useSubmitStyles({
    width: '100%',
  });
  return (
    <Paper style={{ maxWidth: 375, padding: 16, margin: 'auto' }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmedPassword: '',
          accepted: false,
        }}
        onSubmit={values => {
          console.log('values', values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting }) => {
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
              <TextField
                {...TextField.baseProps}
                name="confirmedPassword"
                label="Confirm password"
                type="password"
                required
              />
              <CheckField
                {...CheckField.baseProps}
                name={'accepted'}
                label={
                  <>
                    {' '}
                    I accept the{' '}
                    <Link color={'secondary'}>new Terms of Service</Link>
                  </>
                }
              />
              <Button
                classes={submitClasses}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={isSubmitting}
              >
                Sign up
              </Button>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};

SignUpForm.propTypes = {};
SignUpForm.defaultProps = {};

export default SignUpForm;
