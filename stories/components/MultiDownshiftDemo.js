import React from 'react';
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
            ChipProps={{
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
