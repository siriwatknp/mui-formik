import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Demo from './Demo';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import Option from '../../src/Option';
import { useAntOptionStyles } from '../../src/styles/OptionStyles';

const useIconStyles = makeStyles(theme => {
  const { palette } = theme;
  return {
    option: {
      '&:hover $icon': {
        opacity: 1,
      },
    },
    optionSelected: {
      '&$option': {
        color: palette.common.white,
        backgroundColor: palette.secondary.main,
        '&:hover': {
          backgroundColor: palette.secondary.light,
        },
      },
    },
    icon: {
      color: palette.text.secondary,
    },
    iconSelected: {
      color: palette.common.white,
    },
  };
});

const useOverrideStyles = makeStyles(theme => {
  const { palette } = theme;
  return {
    option: {
      fontSize: 14,
      minHeight: 40,
      color: palette.text.secondary,
    },
    optionSelected: {
      '&$option': {
        color: palette.text.primary,
        fontWeight: 'bold',
      },
    },
    optionHighlighted: {
      backgroundColor: palette.grey[100],
    },
    icon: {
      fontSize: 18,
      marginLeft: 'auto',
    },
  };
});

const OptionDemo = props => {
  const iconStyles = useIconStyles();
  const overrideStyles = useOverrideStyles();
  const antStyles = useAntOptionStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <Option {...props}>Option A</Option>],
        [
          'Custom styles (classes)',
          <Option
            {...props}
            classes={iconStyles}
            svgIcon={props.selected ? CheckBox : CheckBoxOutlined}
          >
            Option A
          </Option>,
        ],
        [
          'Custom styles (overrides)',
          <Option {...props} overrides={overrideStyles}>
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
