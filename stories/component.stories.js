import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, select, text } from '@storybook/addon-knobs';

import matchSorter from 'match-sorter';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import OptionDemo from './components/OptionDemo';
import OptionMenuDemo from './components/OptionMenuDemo';
import MultiSelectDemo from './components/MultiSelectDemo';
import DownshiftDemo from './components/DownshiftDemo';
import MultiDownshiftDemo from './components/MultiDownshiftDemo';
import DownshiftMultiSelect from '../src/DownshiftMultiSelect';

import { filterByInputValue } from '../src/utils/functions';
import { OPTIONS, COUNTRIES, HEROES } from './mock/options';

const StateProvider = ({ initialState, children }) => {
  const [state, setState] = useState(initialState);
  return children([state, setState]);
};

const log = string => (...args) => console.log(string, ...args);

const getOptions = (items, inputValue) =>
  inputValue
    ? matchSorter(items, inputValue, {
        keys: ['name', 'label'],
      })
    : items;

storiesOf('Components', module)
  .add('Single Option', () => (
    <OptionDemo
      highlighted={boolean('highlighted', false)}
      selected={boolean('selected', false)}
      hoverless={boolean('hoverless', false)}
    />
  ))
  .add('Option Menu', () => (
    <OptionMenuDemo
      options={OPTIONS}
      selectedItems={[OPTIONS[1], OPTIONS[3]]}
    />
  ))
  .add('Multiple Select', () => {
    const matchSorter = boolean('Use match sorter to get options', false);
    const filterOption = boolean('Use filter by input value', true);
    const selectedItemExcluded = boolean('Exclude selected item', false);
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
            <MultiSelectDemo {...props} />
          );
        }}
      </StateProvider>
    );
  })
  .add('Downshift', () => {
    const label = text('label', 'Label');
    const placeholder = text('placeholder', 'Type here');
    const fullOptionReturned = boolean('Full option returned', false);
    const matchSorter = boolean('Use match sorter to get options', false);
    const filterOption = boolean('Use filter by input value', true);
    const selectedItemExcluded = boolean('Exclude selected item', false);
    const maxOutput = select('Max option output', [false, 5, 10, 25]);
    const menuClosed = boolean('Menu closed after clicked', true);
    const variant = select(
      'variant',
      ['standard', 'outlined', 'filled'],
      'outlined',
    );
    return (
      <DownshiftDemo
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
    );
  })
  .add('Downshift MultiSelect', () => {
    const label = text('label', 'Label');
    const placeholder = text('placeholder', 'Type here');
    const fullOptionReturned = boolean('Full option returned', false);
    const matchSorter = boolean('Use match sorter to get options', false);
    const filterOption = boolean('Use filter by input value', true);
    const selectedItemExcluded = boolean('Exclude selected item', false);
    const maxOutput = select('Max option output', [false, 5, 10, 25]);
    const variant = select(
      'variant',
      ['standard', 'outlined', 'filled'],
      'outlined',
    );
    return (
      <MultiDownshiftDemo
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
