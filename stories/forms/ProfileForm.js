import React from 'react';
import * as Yup from 'yup';
import Link from '@material-ui/core/Link';
import Form from './Form';
import TabsForm from '../../src/TabsForm';
import TextField from '../../src/TextField';
import CheckLabelField from '../../src/CheckLabelField';
import DsSelectField from '../../src/DsSelectField';
import DsMultiSelectField from '../../src/DsMultiSelectField';
import { HEROES, COUNTRIES } from '../mock/options';

const validationSchema = Yup.object().shape({
  profile: Yup.object().shape({
    basicInfo: Yup.object().shape({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
    }),
    favorite: Yup.object().shape({
      hero: Yup.string().required('Hero is required'),
      countries: Yup.array()
        .of(Yup.string())
        .required('You must have countries')
        .min(3, 'Minimum of 3 countries'),
      // food: Yup.string().required('Required'),
      // juice: Yup.string().required('Required'),
      // liked: Yup.boolean().oneOf([true], 'I think you need to like it'),
    }),
  }),
  accepted: Yup.boolean().oneOf([true], 'You must accept our terms of service'),
});

const ProfileForm = () => (
  <Form
    initialValues={{
      profile: {
        basicInfo: {
          firstName: '',
          lastName: '',
        },
        favorite: {
          hero: '',
          countries: [],
          // food: '',
          // juice: '',
          // liked: false,
        },
      },
      accepted: false,
    }}
    validationSchema={validationSchema}
    onSubmit={values => console.log(values)}
  >
    <TabsForm
      name={'profile'}
      tabs={[
        { label: 'Basic info', value: 'basicInfo' },
        { label: 'Favorite', value: 'favorite' },
      ]}
    >
      {tab => (
        <>
          {tab === 'basicInfo' && (
            <>
              <TextField
                {...TextField.baseProps}
                name={`profile.${tab}.firstName`}
                label={'First name'}
                required
              />
              <TextField
                {...TextField.baseProps}
                name={`profile.${tab}.lastName`}
                label={'Last name'}
                required
              />
            </>
          )}
          {tab === 'favorite' && (
            <>
              <DsSelectField
                {...DsSelectField.baseProps}
                name={`profile.${tab}.hero`}
                options={HEROES}
                itemToValue={item => (item ? item.id : '')}
                itemToLabel={item => (item ? item.name : '')}
                label={'Hero'}
                required
              />
              <DsMultiSelectField
                {...DsMultiSelectField.baseProps}
                options={COUNTRIES}
                name={`profile.${tab}.countries`}
                label={'Countries'}
                placeholder={'Type a name'}
              />
            </>
          )}
        </>
      )}
    </TabsForm>
    <CheckLabelField
      {...CheckLabelField.baseProps}
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

ProfileForm.propTypes = {};
ProfileForm.defaultProps = {};

export default ProfileForm;
