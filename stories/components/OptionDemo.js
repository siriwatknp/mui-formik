import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Demo from './Demo';
import Option from '../../src/Option';
import { useAntOptionStyles } from '../../src/styles/OptionStyles';

const OptionDemo = props => {
  const antStyles = useAntOptionStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <Option {...props}>Option A</Option>],
        [
          'Ant Design',
          <Option overrides={antStyles} {...props}>
            Option B
          </Option>,
        ],
      ]}
    />
  );
};

OptionDemo.propTypes = {};
OptionDemo.defaultProps = {};

export default OptionDemo;
