import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Close from '@material-ui/icons/Close';
import Demo from './Demo';
import DownshiftMultiSelect from '../../src/DownshiftMultiSelect';
import { useAntMultiSelectStyles } from '../../src/styles/SelectStyles';

const DownshiftDemo = props => {
  const antStyles = useAntMultiSelectStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <DownshiftMultiSelect {...props} />],
        [
          'Ant Design',
          <DownshiftMultiSelect
            {...props}
            selectedItemExcluded={false}
            label={''}
            chipProps={{
              deleteIcon: <Close />,
            }}
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
