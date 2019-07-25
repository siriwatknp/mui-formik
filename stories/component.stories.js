import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Box from '@material-ui/core/Box';
import MultipleSelect from '../src/MultipleSelect';
import OptionMenu from '../src/MultipleSelect/OptionMenu';

const StateProvider = ({ initialState, children }) => {
  const [state, setState] = useState(initialState);
  return children([state, setState]);
};

const OPTIONS = [
  { label: 'Option1', value: 1 },
  { label: 'Option2', value: 2 },
  { label: 'Option3', value: 3 },
  { label: 'Option4', value: 4 },
  { label: 'Option5', value: 5 },
  { label: 'Option6', value: 6 },
  { label: 'Option7', value: 7 },
  { label: 'Option8', value: 8 },
  { label: 'Option9', value: 9 },
  { label: 'Option10', value: 10 },
];

storiesOf('Components', module)
  .add('Option Menu', () => (
    <OptionMenu options={OPTIONS} selectedItems={[1, 3]} />
  ))
  .add('Multiple Select', () => (
    <StateProvider initialState={[]}>
      {([value, onChange]) => {
        return (
          <Box m={2} width={300}>
            <MultipleSelect
              label={'Select'}
              placeholder={'type option'}
              fullWidth
              options={OPTIONS}
              value={value}
              onChange={onChange}
            />
          </Box>
        );
      }}
    </StateProvider>
  ));

// import { Button, Welcome } from '@storybook/react/demo';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
//
// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
