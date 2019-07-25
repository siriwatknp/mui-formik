import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useOptionStyles } from '../styles/useMultiSelectStyles';

const Option = props => {
  const classes = useOptionStyles(props);
  return <MenuItem {...props} classes={classes} />;
};

export default Option;
