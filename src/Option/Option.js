import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useOptionStyles } from '../styles/useMultiSelectStyles';

const Option = ({ hoverless, highlighted, ...props }) => {
  const classes = useOptionStyles({ hoverless, highlighted, ...props });
  return <MenuItem {...props} classes={classes} />;
};

export default Option;
