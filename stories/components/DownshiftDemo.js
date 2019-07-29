import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Demo from './Demo';
import DownshiftSelect from '../../src/DownshiftSelect';
import { useAntSelectStyles } from '../../src/styles/SelectStyles';

const DownshiftDemo = props => {
  const antStyles = useAntSelectStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <DownshiftSelect {...props} />],
        [
          'Ant Design',
          <DownshiftSelect
            {...props}
            selectedItemExcluded={false}
            label={''}
            overrides={antStyles}
          />,
        ],
      ]}
    />
  );
};

DownshiftDemo.propTypes = {};
DownshiftDemo.defaultProps = {};

export default DownshiftDemo;
