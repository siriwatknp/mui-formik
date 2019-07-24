import React from 'react';
import * as Yup from 'yup';
import Form from './Form';
import TextField from '../../src/TextField';
import TabsForm from '../../src/TabsForm';

const validationSchema = Yup.object().shape({
  name: Yup.object().shape({
    en: Yup.string().required('English name is required!'),
    th: Yup.string(),
  }),
});

const LanguageForm = () => {
  return (
    <Form
      initialValues={{
        name: {
          en: '',
          th: '',
        },
      }}
      onSubmit={console.log}
      validationSchema={validationSchema}
    >
      <TabsForm
        name={'name'}
        tabs={[
          { label: 'English', value: 'en' },
          { label: 'Thai', value: 'th' },
        ]}
      >
        {tab => (
          <TextField
            {...TextField.baseProps}
            name={`name.${tab}`}
            label={tab}
          />
        )}
      </TabsForm>
    </Form>
  );
};

export default LanguageForm;
