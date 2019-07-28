import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, select, text } from '@storybook/addon-knobs';
import merge from 'lodash/merge';
import matchSorter from 'match-sorter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';

import { NAMES } from './mock/options';

import { useAntChipStyles } from '../src/styles/ChipStyles';
import { useAntInputBaseStyles } from '../src/styles/InputBaseStyles';

const ChipDemos = () => {
  const antClasses = useAntChipStyles();
  return (
    <Box p={2} bgcolor={'common.white'}>
      <Typography gutterBottom variant={'subtitle2'}>
        Default
      </Typography>
      <Chip label={'Label'} onDelete={() => {}} />
      <br />
      <br />
      <Typography gutterBottom variant={'subtitle2'}>
        Ant Design
      </Typography>
      <Chip
        classes={antClasses}
        label={'Tony Stark'}
        deleteIcon={<Close />}
        onDelete={() => {}}
      />
    </Box>
  );
};

const TextFieldDemos = () => {
  const similarProps = {
    variant: 'outlined',
    placeholder: 'Placeholder',
    label: 'Label',
    fullWidth: true,
  };
  const antClasses = useAntInputBaseStyles();
  return (
    <Box p={2} bgcolor={'common.white'} maxWidth={500}>
      <TextField {...similarProps} />
      <br />
      <br />
      <TextField
        InputProps={{ classes: antClasses }}
        {...similarProps}
        label={''}
      />
    </Box>
  );
};

storiesOf('Material-UI', module)
  .add('Chip', () => <ChipDemos />)
  .add('TextField', () => <TextFieldDemos />);
