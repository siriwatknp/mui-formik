import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import * as Yup from 'yup';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Favorite from '@material-ui/icons/Favorite';

import Form from './forms/Form';
import InputBaseField from '../src/InputBaseField';
import TextField from '../src/TextField';
import CheckLabelField from '../src/CheckLabelField';
import CheckGroupField from '../src/CheckGroupField';
import RadioGroupField from '../src/RadioGroupField';
import MultiSelectField from '../src/MultiSelectField';
import DsSelectField from '../src/DsSelectField';
import DsMultiSelectField from '../src/DsMultiSelectField';

import { COUNTRIES, NAMES, HEROES } from './mock/options';

const createSchema = shape => Yup.object().shape(shape);

storiesOf('Mui Formik', module)
  .add('InputBaseField', () => (
    <Form
      initialValues={{ name: '' }}
      validationSchema={createSchema({
        name: Yup.string()
          .matches(/(Donald)/, {
            excludeEmptyString: true,
            message: 'You must type "Donald"',
          })
          .required('This field is required'),
      })}
    >
      <Box>
        <InputBaseField
          name={'name'}
          placeholder={'type a correct name'}
          renderHelperText={(errorShown, errorText) =>
            errorShown && <FormHelperText>{errorText}</FormHelperText>
          }
        />
      </Box>
    </Form>
  ))
  .add('TextField (Input)', () => (
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
      />
    </Form>
  ))
  .add('TextField (Select)', () => (
    <Form
      initialValues={{ name: '' }}
      validationSchema={createSchema({
        name: Yup.string().required('This field is required'),
      })}
    >
      <TextField {...TextField.baseProps} select name={'name'} label={'Name'}>
        {NAMES.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Form>
  ))
  .add('CheckLabel Field', () => (
    <Form
      initialValues={{ checked: false }}
      validationSchema={createSchema({
        checked: Yup.boolean().oneOf(
          [true],
          'You must accept terms of service',
        ),
      })}
    >
      <CheckLabelField
        FormControlProps={{
          fullWidth: true,
        }}
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
  .add('CheckGroup Field (array)', () => (
    <Form
      initialValues={{ friends: [] }}
      validationSchema={createSchema({
        friends: Yup.array()
          .of(Yup.string())
          .required('You must have friends')
          .min(3, 'Minimum of 3 friends'),
      })}
    >
      <CheckGroupField
        fullOptionReturned={boolean('fullOptionReturned', false)}
        FormControlProps={{
          fullWidth: true,
        }}
        name={'friends'}
        label={'Choose 3 friends'}
        options={NAMES}
      />
    </Form>
  ))
  .add('CheckGroup Field (object)', () => (
    <Form
      initialValues={{ heroes: [] }}
      validate={values => {
        console.log('values', values);
        let errors = {};
        if (Object.keys(values.heroes).length < 3) {
          errors.heroes = 'At least 3 heroes is required!';
        }
        return errors;
      }}
    >
      <CheckGroupField
        valueType={'object'}
        CheckboxProps={{
          checkedIcon: <Favorite />,
        }}
        fullOptionReturned={boolean('fullOptionReturned', false)}
        FormControlProps={{
          fullWidth: true,
        }}
        name={'heroes'}
        label={'Choose 3 heroes'}
        options={HEROES}
        itemToLabel={({ name }) => name}
        itemToValue={({ id }) => id}
      />
    </Form>
  ))
  .add('RadioGroup Field (string)', () => (
    <Form
      initialValues={{ hero: '' }}
      validationSchema={createSchema({
        hero: Yup.string().required('Please choose a hero'),
      })}
    >
      <RadioGroupField
        fullOptionReturned={boolean('fullOptionReturned', false)}
        FormControlProps={{
          fullWidth: true,
        }}
        name={'hero'}
        label={'Choose hero'}
        options={HEROES}
        itemToLabel={({ name }) => name}
        itemToValue={({ id }) => id}
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
    >
      {() => (
        <MultiSelectField
          {...MultiSelectField.baseProps}
          label={'Friends'}
          placeholder={"Type your friend's name"}
          name={'friends'}
          selectedItemExcluded={boolean('Selected item excluded', false)}
          options={NAMES}
        />
      )}
    </Form>
  ))
  .add('Downshift Select Field', () => (
    <Form
      title={'Your home town'}
      initialValues={{ country: '' }}
      validationSchema={createSchema({
        country: Yup.string().required('Country is required.'),
      })}
    >
      {() => {
        return (
          <DsSelectField
            {...DsSelectField.baseProps}
            label={'Country'}
            name={'country'}
            placeholder={'Type a country'}
            options={COUNTRIES}
          />
        );
      }}
    </Form>
  ))
  .add('Downshift MultiSelect Field', () => (
    <Form
      title={'Best friends'}
      initialValues={{ friends: [] }}
      validationSchema={createSchema({
        friends: Yup.array()
          .of(Yup.string())
          .required('You must have friends')
          .min(3, 'Minimum of 3 friends'),
      })}
    >
      {() => {
        return (
          <DsMultiSelectField
            {...DsMultiSelectField.baseProps}
            label={'Friends'}
            name={'friends'}
            placeholder={'Type a name'}
            options={NAMES}
          />
        );
      }}
    </Form>
  ));
