import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import * as Yup from 'yup';
import Link from '@material-ui/core/Link';

import Form from './forms/Form';
import TextField from '../src/TextField';
import CheckField from '../src/CheckField';
import MultiSelectField from '../src/MultiSelectField';

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
  ))
  .add('MultiSelect Field', () => (
    <Form
      initialValues={{ friends: [] }}
      validationSchema={createSchema({
        friends: Yup.array()
          .of(Yup.string())
          .required('You must have friends')
          .min(3, 'Minimum of 3 friends'),
      })}
      onSubmit={values => console.log('values', values)}
    >
      {() => (
        <MultiSelectField
          {...MultiSelectField.baseProps}
          label={'Friends'}
          placeholder={"Type your friend's name"}
          name={'friends'}
          selectedItemExcluded={boolean('Selected item excluded', false)}
          options={[
            { label: 'Jun', value: 'jun' },
            { label: 'Mike', value: 'mike' },
            { label: 'Tony', value: 'tony' },
            { label: 'Strange', value: 'strange' },
            { label: 'Thor', value: 'thor' },
            { label: 'Steven', value: 'steven' },
            { label: 'Justin', value: 'justin' },
          ]}
        />
      )}
    </Form>
  ));
