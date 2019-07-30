import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Demo from './Demo';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import Option from '../../src/Option';
import { useAntOptionStyles } from '../../src/styles/OptionStyles';

const useIconStyles = makeStyles(({ palette }) => ({
  option: {
    '&:hover $icon': {
      opacity: 1,
    },
  },
  icon: {
    color: palette.text.secondary,
  },
  iconSelected: {
    color: palette.common.white,
  },
}));

const OptionDemo = props => {
  const iconStyles = useIconStyles();
  const antStyles = useAntOptionStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <Option {...props}>Option A</Option>],
        [
          'Custom styles',
          <Option
            {...props}
            classes={iconStyles}
            svgIcon={props.selected ? CheckBox : CheckBoxOutlined}
          >
            Option A
          </Option>,
        ],
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
