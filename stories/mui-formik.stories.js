import React from 'react';

import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import useSubmitStyles from '../src/styles/useSubmitStyles';
import TextField from '../src/TextField';
import CheckField from '../src/CheckField';

const Form = ({ children, ...props }) => {
  const submitClasses = useSubmitStyles();
  return (
    <Paper style={{ maxWidth: 375, padding: 16, margin: 'auto' }}>
      <Formik onSubmit={values => console.log(values)} {...props}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {children}
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

const createSchema = shape => Yup.object().shape(shape);

storiesOf('Mui Formik', module)
  .add('TextField', () => (
    <Form
      initialValues={{ email: '' }}
      validationSchema={createSchema({
        email: Yup.string()
          .email('Invalid email')
          .required('This field is required'),
      })}
    >
      <TextField
        {...TextField.baseProps}
        name={'email'}
        label={'Email'}
        required
      />
    </Form>
  ))
  .add('Checkbox', () => (
    <Form
      initialValues={{ checked: false }}
      validationSchema={createSchema({
        checked: Yup.boolean().oneOf(
          [true],
          'You must accept terms of service',
        ),
      })}
    >
      <CheckField
        {...CheckField.baseProps}
        name={'checked'}
        label={
          <>
            {' '}
            I accept the <Link color={'secondary'}>new Terms of Service</Link>
          </>
        }
      />
    </Form>
  ));
