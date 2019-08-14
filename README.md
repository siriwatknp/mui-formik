# MUI Formik

A toolbox for building sustainable MaterialUI form with formik

### [Storybook Demo](https://siriwatknp.github.io/mui-formik)

## Example

```jsx harmony
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Link } from '@material-ui/core';
import { HEROES, COUNTRIES } from './mock';
import {
  TabsField,
  TextField,
  DownshiftSelectField,
  DownshiftMultiSelectField,
  CheckLabelField,
} from 'mui-formik';

const App = () => {
  const [state, setState] = useState({});
  console.log(state);
  return (
    <Formik
      onSubmit={values => setState(values)}
      onReset={() => setState({})}
      initialValues={{
        email: '',
        password: '',
        name: {
          en: '',
          th: '',
        },
        profile: {
          favorite: {
            hero: '',
            countries: [],
          },
        },
      }}
    >
      {({ handleSubmit, handleReset }) => (
        <form onSubmit={handleSubmit}>
          <TextField {...TextField.baseProps} name="email" label="Email" />
          <TextField
            {...TextField.baseProps}
            name="password"
            label="Password"
            type="password"
          />
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
          <DownshiftSelectField
            {...DownshiftSelectField.baseProps}
            name={`profile.favorite.hero`}
            options={HEROES}
            itemToValue={item => (item ? item.id : '')}
            itemToLabel={item => (item ? item.name : '')}
            label={'Hero'}
            required
          />
          <DownshiftMultiSelectField
            {...DownshiftMultiSelectField.baseProps}
            options={COUNTRIES}
            name={`profile.favorite.countries`}
            label={'Countries'}
            placeholder={'Type a name'}
          />
          <CheckLabelField
            {...CheckLabelField.baseProps}
            name={'accepted'}
            label={
              <>
                {' '}
                I accept the <Link color={'secondary'}>
                  new Terms of Service
                </Link>
              </>
            }
          />
          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Submit
          </Button>
          <Button style={{ marginLeft: 16 }} onClick={handleReset}>
            Reset
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default App;
```

## Components

#### `CheckGroupField`

#### `CheckLabelField`

#### `InputBaseField`

#### `DownshiftSelectField`

#### `DownshiftMultiSelectField`

#### `MultiSelectField`

#### `RadioGroupField`

#### `TextField`

#### `TabsField`

## Styling

#### use [mui-styling](https://github.com/siriwatknp/mui-styling) internally

## License

MIT
