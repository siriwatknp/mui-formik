import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ClearRounded from '@material-ui/icons/ClearRounded';
import Demo from './Demo';
import DownshiftSelect from '../../src/DownshiftSelect';
import { useAntSelectStyles } from '../../src/styles/SelectStyles';

const useCustomStyles = makeStyles(({ spacing, palette }) => ({
  field: {
    padding: 0,
    paddingBottom: 4,
  },
  iconBtn: {
    padding: spacing(1),
  },
  svgIcon: {
    fontSize: 20,
  },
  option: {
    minHeight: 40,
    fontSize: 15,
    '&:hover': {
      backgroundColor: palette.grey[100],
    },
  },
  optionSelected: {
    fontWeight: 500,
    '&$option': {
      backgroundColor: palette.grey[100],
    },
  },
}));

const DownshiftDemo = props => {
  const antStyles = useAntSelectStyles();
  const customStyles = useCustomStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <DownshiftSelect {...props} />],
        [
          'Custom styles',
          <DownshiftSelect
            {...props}
            variant={'standard'}
            classes={customStyles}
            SvgClearIcon={ClearRounded}
          />,
        ],
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
