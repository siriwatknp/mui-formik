import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, select, text } from '@storybook/addon-knobs';
import { makeStyles } from '@material-ui/styles';

import Root from '../src/__test__/Root';
import Parent, { styles as parentStyles } from '../src/__test__/Parent';
import Child from '../src/__test__/Child';

const useCustomStyles = makeStyles(({ palette }) => ({
  parentRoot: {
    '&:hover': {
      '& $parentLabel, $childDot': {
        color: palette.primary.main,
      },
    },
  },
  parentLabel: {},
  childDot: {},
}));

const useOverrideStyles = makeStyles(theme => ({
  root: {
    boxShadow: '0 0 4px 0 rgba(0,0,0,0.32)',
  },
  parentRoot: {
    ...parentStyles(theme).parentRoot,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& $parentLabel, $childDot': {
        color: '#fff',
      },
    },
  },
  parentLabel: {},
  childRoot: {
    marginLeft: 'auto',
  },
  childDot: {},
  test: {},
}));

const ITEMS = ['Siriwat', 'Kotchakorn', 'Hello World', 'Programming'];

const CustomRoot1 = () => {
  const styles = useCustomStyles();
  return <Root items={ITEMS} classes={styles} />;
};

const OverrideRoot1 = () => {
  const styles = useOverrideStyles();
  return <Root items={ITEMS} overrides={styles} />;
};

storiesOf('Test', module)
  .add('Parent', () => <Parent label={'Option'} />)
  .add('Root', () => <Root items={ITEMS} />)
  .add('CustomRoot1', () => <CustomRoot1 />)
  .add('OverrideRoot1', () => <OverrideRoot1 />);
