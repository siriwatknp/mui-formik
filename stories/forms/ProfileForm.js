import React from 'react';
import * as Yup from 'yup';
import Link from '@material-ui/core/Link';
import Form from './Form';
import TabsForm from '../../src/TabsForm';
import TextField from '../../src/TextField';
import CheckField from '../../src/CheckField';

const validationSchema = Yup.object().shape({
  profile: Yup.object().shape({
    basicInfo: Yup.object().shape({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
    }),
    favorite: Yup.object().shape({
      food: Yup.string().required('Required'),
      juice: Yup.string().required('Required'),
      liked: Yup.boolean().oneOf([true], 'I think you need to like it'),
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
          food: '',
          juice: '',
          liked: false,
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
              <TextField
                {...TextField.baseProps}
                name={`profile.${tab}.food`}
                label={'Food'}
                required
              />
              <TextField
                {...TextField.baseProps}
                name={`profile.${tab}.juice`}
                label={'Juice'}
              />
              <CheckField
                {...CheckField.baseProps}
                name={`profile.${tab}.liked`}
                label={'I like this form'}
              />
            </>
          )}
        </>
      )}
    </TabsForm>
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

ProfileForm.propTypes = {};
ProfileForm.defaultProps = {};

export default ProfileForm;
