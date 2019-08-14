import React from 'react';
import * as Yup from 'yup';
import Form from './Form';
import TextField from '../../src/TextField';
import TabsField from '../../src/TabsField';

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
      validationSchema={validationSchema}
    >
      <TabsField
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
      </TabsField>
    </Form>
  );
};

export default LanguageForm;
