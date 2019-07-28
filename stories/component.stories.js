import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, select, text } from '@storybook/addon-knobs';

import matchSorter from 'match-sorter';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import Option from '../src/Option';
import MultipleSelect from '../src/MultipleSelect';
import OptionMenu from '../src/OptionMenu/OptionMenu';
import DownshiftSelect from '../src/DownshiftSelect';
import DownshiftMultiSelect from '../src/DownshiftMultiSelect';

import { filterByInputValue } from '../src/utils/functions';
import { OPTIONS, COUNTRIES, HEROES } from './mock/options';
import { useAntChipStyles } from '../src/styles/ChipStyles';
import { useAntInputBaseStyles } from '../src/styles/InputBaseStyles';

const StateProvider = ({ initialState, children }) => {
  const [state, setState] = useState(initialState);
  return children([state, setState]);
};

const log = string => (...args) => console.log(string, ...args);

const AntMultipleSelect = props => {
  const antChipClasses = useAntChipStyles();
  const antInputBaseClasses = useAntInputBaseStyles();
  return (
    <MultipleSelect
      {...props}
      label={''}
      chipClasses={antChipClasses}
      chipProps={{ deleteIcon: <Close /> }}
      inputBaseClasses={antInputBaseClasses}
    />
  );
};

const getOptions = (items, inputValue) =>
  inputValue
    ? matchSorter(items, inputValue, {
        keys: ['label'],
      })
    : items;

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
  .add('Multiple Select', () => {
    const matchSorter = boolean('Use match sorter to get options', true);
    const filterOption = boolean('Use filter by input value', false);
    const selectedItemExcluded = boolean('Exclude selected item', true);
    const maxOutput = select('Max option output', [false, 5, 10, 25], false);
    const variant = select(
      'variant',
      ['standard', 'outlined', 'filled'],
      'outlined',
    );
    return (
      <StateProvider initialState={[]}>
        {([value, onChange]) => {
          const props = {
            options: OPTIONS,
            fullWidth: true,
            label: 'Select',
            placeholder: 'Type option',
            value,
            onChange,
            onBlur: onChange,
            variant,
            selectedItemExcluded,
            maxOptionOutput: maxOutput,
            filterOption: filterOption ? filterByInputValue : false,
            getOptions: matchSorter ? getOptions : false,
          };
          return (
            <Box m={2} maxWidth={500}>
              <Typography variant={'subtitle2'}>
                Mui Formik
              </Typography>
              <br />
              <MultipleSelect {...props} />
              <br />
              <br />
              <Typography gutterBottom variant={'subtitle2'}>
                Ant Design
              </Typography>

              <AntMultipleSelect {...props} />
            </Box>
          );
        }}
      </StateProvider>
    );
  })
  .add('MuiDownshift', () => {
    const label = text('label', 'Label');
    const placeholder = text('placeholder', 'Type here');
    const fullOptionReturned = boolean('Full option returned', false);
    const matchSorter = boolean('Use match sorter to get options', true);
    const filterOption = boolean('Use filter by input value', false);
    const selectedItemExcluded = boolean('Exclude selected item', true);
    const maxOutput = select('Max option output', [false, 5, 10, 25]);
    const menuClosed = boolean('Menu closed after clicked', true);
    const variant = select(
      'variant',
      ['standard', 'outlined', 'filled'],
      'outlined',
    );
    return (
      <Box p={3} maxWidth={400}>
        <DownshiftSelect
          label={label}
          placeholder={placeholder}
          variant={variant}
          options={COUNTRIES}
          onChange={log('changed')}
          onBlur={log('blurred')}
          selectedItemExcluded={selectedItemExcluded}
          fullOptionReturned={fullOptionReturned}
          maxOptionOutput={maxOutput}
          menuClosedAfterClicked={menuClosed}
          filterOption={filterOption ? filterByInputValue : false}
          getOptions={matchSorter ? getOptions : false}
        />
      </Box>
    );
  })
  .add('Downshift MultiSelect', () => {
    const label = text('label', 'Label');
    const placeholder = text('placeholder', 'Type here');
    const fullOptionReturned = boolean('Full option returned', false);
    const matchSorter = boolean('Use match sorter to get options', true);
    const filterOption = boolean('Use filter by input value', false);
    const selectedItemExcluded = boolean('Exclude selected item', true);
    const maxOutput = select('Max option output', [false, 5, 10, 25]);
    const variant = select(
      'variant',
      ['standard', 'outlined', 'filled'],
      'outlined',
    );
    return (
      <Box p={3} maxWidth={400}>
        <DownshiftMultiSelect
          label={label}
          placeholder={placeholder}
          variant={variant}
          fullWidth
          options={HEROES}
          itemToValue={item => (item ? item.id : '')}
          itemToLabel={item => (item ? item.name : '')}
          onChange={log('changed')}
          onBlur={log('blurred')}
          selectedItemExcluded={selectedItemExcluded}
          fullOptionReturned={fullOptionReturned}
          maxOptionOutput={maxOutput}
          filterOption={filterOption ? filterByInputValue : false}
          getOptions={matchSorter ? getOptions : false}
        />
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
