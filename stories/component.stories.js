import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, select, text } from '@storybook/addon-knobs';

import matchSorter from 'match-sorter';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Option from '../src/Option';
import MultipleSelect from '../src/MultipleSelect';
import OptionMenu from '../src/MultipleSelect/OptionMenu';
import MuiDownshift from '../src/MuiDownshift';

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

const SUGGESTIONS = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(({ label }) => ({
  label,
  value: label.toLowerCase(),
}));

function getItems(filter) {
  return filter
    ? matchSorter(SUGGESTIONS, filter, {
        keys: ['label'],
      })
    : SUGGESTIONS;
}

storiesOf('Components', module)
  .add('Single Option', () => (
    <Option
      highlighted={boolean('highlighted', false)}
      selected={boolean('selected', false)}
      hoverless={boolean('hoverless', false)}
    >
      Option
    </Option>
  ))
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
  ))
  .add('MuiDownshift', () => {
    const label = text('label', 'Label');
    const placeholder = text('placeholder', 'Type here');
    const fullOptionReturned = boolean('Full option returned', false);
    const maxOutput = select('Max option output', [false, 5, 10, 25], false);
    const optionHidden = boolean('Option hidden after clicked', false);
    const filterOption = boolean('Use match sorter as filterOption', false);
    const matchSorter = boolean('Use match sorter to get options', false);
    const variants = ['standard', 'outlined', 'filled'];
    return (
      <Box p={3}>
        <Grid container spacing={3}>
          {variants.map(v => (
            <Grid item key={v}>
              <MuiDownshift
                label={label}
                placeholder={placeholder}
                variant={v}
                options={SUGGESTIONS}
                onChange={console.log}
                onBlur={console.log}
                fullOptionReturned={fullOptionReturned}
                maxOptionOutput={maxOutput}
                optionHiddenAfterClicked={optionHidden}
                filterOption={
                  filterOption ? MuiDownshift.utils.filterByInputValue : false
                }
                getOptions={matchSorter ? getItems : false}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  });

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
