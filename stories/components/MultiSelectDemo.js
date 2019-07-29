import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Demo from './Demo';
import MultipleSelect from '../../src/MultipleSelect';
import { useAntSelectStyles } from '../../src/styles/SelectStyles';
import Close from '@material-ui/icons/Close';

const MultiSelectDemo = props => {
  const antStyles = useAntSelectStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <MultipleSelect {...props} />],
        [
          'Ant Design?',
          <MultipleSelect
            {...props}
            label={''}
            selectedItemExcluded={false}
            chipProps={{ deleteIcon: <Close /> }}
            overrides={antStyles}
          />,
        ],
      ]}
    />
  );
};

MultiSelectDemo.propTypes = {};
MultiSelectDemo.defaultProps = {};

export default MultiSelectDemo;
