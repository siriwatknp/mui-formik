import React from 'react';
import * as Yup from 'yup';
import Link from '@material-ui/core/Link';
import Form from './Form';
import TextField from '../../src/TextField';
import CheckField from '../../src/CheckField';

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

const SignUpForm = () => (
  <Form
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
    <TextField {...TextField.baseProps} name="email" label="Email" required />
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
          I accept the <Link color={'secondary'}>new Terms of Service</Link>
        </>
      }
    />
  </Form>
);

SignUpForm.propTypes = {};
SignUpForm.defaultProps = {};

export default SignUpForm;
