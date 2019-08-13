import React from 'react';
import { makeStyles } from '@material-ui/styles';
import cx from 'clsx';
import Color from 'color';
import CheckBoxOutlineBlankRounded from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckBoxRounded from '@material-ui/icons/CheckBoxRounded';
import Demo from './Demo';
import OptionMenu from '../../src/OptionMenu';
import { antOptionStyles } from '../../src/styles/OptionStyles';
import { antOptionMenuStyles } from '../../src/styles/OptionMenuStyles';

const useCustomStyles = makeStyles(({ palette }) => {
  const accentColor = Color(palette.primary.main)
    .rotate(-10)
    .lighten(0.76)
    .toString();
  return {
    menuContainer: {
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.38)',
    },
    option: {
      minHeight: 36,
      color: palette.text.secondary,
      fontSize: 15,
      '&:hover': {
        backgroundColor: palette.grey[100],
      },
    },
    optionSelected: {
      '&$option': {
        color: palette.text.primary,
        backgroundColor: accentColor,
        '&:hover': {
          backgroundColor: palette.grey[100],
        },
      },
    },
  };
});

const useCustomStyles2 = makeStyles(theme => {
  const { palette } = theme;
  return {
    option: {},
    optionSelected: {
      color: palette.secondary.main,
      '&$option': {
        backgroundColor: '#fff0f5',
      },
    },
    iconStart: {
      fontSize: 24,
      marginRight: 8,
    },
    iconStartSelected: {
      color: palette.secondary.main,
    },
  };
});

const useAntStyles = makeStyles(theme => ({
  ...antOptionStyles(theme),
  ...antOptionMenuStyles(theme),
}));

const OptionMenuDemo = props => {
  const antStyles = useAntStyles();
  const customStyles = useCustomStyles();
  const customStyles2 = useCustomStyles2();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <OptionMenu {...props} />],
        [
          'Custom styles',
          <OptionMenu
            {...props}
            classes={customStyles}
            PaperProps={{ square: true }}
          />,
        ],
        [
          'Custom icon',
          <OptionMenu
            {...props}
            classes={customStyles2}
            renderIconStart={({ selected, className }) => {
              if (selected) return <CheckBoxRounded className={className} />;
              return (
                <CheckBoxOutlineBlankRounded
                  className={className}
                  color={'action'}
                />
              );
            }}
            renderIconEnd={null}
          />,
        ],
        ['Ant Design', <OptionMenu {...props} overrides={antStyles} />],
      ]}
      getItemProps={() => ({ height: 260 })}
    />
  );
};

OptionMenuDemo.propTypes = {};
OptionMenuDemo.defaultProps = {};

export default OptionMenuDemo;
