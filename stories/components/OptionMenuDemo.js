import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Demo from './Demo';
import OptionMenu from '../../src/OptionMenu';
import { antOptionStyles } from '../../src/styles/OptionStyles';
import { antOptionMenuStyles } from '../../src/styles/OptionMenuStyles';

const useAntStyles = makeStyles(theme => ({
  ...antOptionStyles(theme),
  ...antOptionMenuStyles(theme),
}));

const OptionMenuDemo = props => {
  const antStyles = useAntStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <OptionMenu {...props} />],
        ['Ant Design', <OptionMenu overrides={antStyles} {...props} />],
      ]}
      getItemProps={() => ({ height: 260 })}
    />
  );
};

OptionMenuDemo.propTypes = {};
OptionMenuDemo.defaultProps = {};

export default OptionMenuDemo;
