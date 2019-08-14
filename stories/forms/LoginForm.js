import React from 'react';
import * as Yup from 'yup';
import Form from './Form';
import TextField from '../../src/TextField';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required'),
});

const LoginForm = () => (
  <Form
    validationSchema={validationSchema}
    initialValues={{ email: '', password: '' }}
  >
    <TextField {...TextField.baseProps} name="email" label="Email" required />
    <TextField
      {...TextField.baseProps}
      name="password"
      label="Password"
      type="password"
      required
    />
  </Form>
);

LoginForm.propTypes = {};
LoginForm.defaultProps = {};

export default LoginForm;
