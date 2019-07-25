import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { FieldArray } from 'formik';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Form from './Form';
import TextField from '../../src/TextField';

const schema = Yup.object().shape({
  friends: Yup.array()
    .of(Yup.string().required('Required'))
    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
    .min(3, 'Minimum of 3 friends'),
});

const ArrayForm = () => (
  <Form
    initialValues={{ friends: [] }}
    validationSchema={schema}
    onSubmit={values => console.log('values', values)}
  >
    {({ values, errors, touched }) => {
      console.log('values', values);
      console.log('touched', touched);
      console.log('errors', errors);
      return (
        <FieldArray name={'friends'}>
          {arrayHelpers => (
            <>
              {values.friends && values.friends.length > 0 ? (
                values.friends.map((friend, index) => (
                  <Box
                    key={index}
                    display={'inline-flex'}
                    alignItems={'center'}
                    width={'100%'}
                    mt={2}
                    mb={1}
                  >
                    <TextField
                      {...TextField.baseProps}
                      margin={'none'}
                      name={`friends.${index}`}
                      label={'Name'}
                    />
                    <IconButton
                      style={{ marginLeft: 8 }}
                      type="button"
                      onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                    >
                      <Add/>
                    </IconButton>
                    <IconButton
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      <Delete/>
                    </IconButton>
                  </Box>
                ))
              ) : (
                <button type="button" onClick={() => arrayHelpers.push('')}>
                  {/* show this when user has removed all friends from the list */}
                  Add a friend
                </button>
              )}
            </>
          )}
        </FieldArray>
      );
    }}
  </Form>
);

ArrayForm.propTypes = {};
ArrayForm.defaultProps = {};

export default ArrayForm;
