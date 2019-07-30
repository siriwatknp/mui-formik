import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Color from 'color';
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
      }
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

const useAntStyles = makeStyles(theme => ({
  ...antOptionStyles(theme),
  ...antOptionMenuStyles(theme),
}));

const OptionMenuDemo = props => {
  const antStyles = useAntStyles();
  const customStyles = useCustomStyles();
  return (
    <Demo
      type={'grid'}
      demos={[
        ['Default', <OptionMenu {...props} />],
        [
          'Custom styles',
          <OptionMenu
            {...props}
            classes={OptionMenu.pickClasses(customStyles)}
            optionClasses={customStyles}
            PaperProps={{ square: true }}
          />,
        ],
        ['Ant Design', <OptionMenu overrides={antStyles} {...props} />],
      ]}
      getItemProps={() => ({ height: 260 })}
    />
  );
};

OptionMenuDemo.propTypes = {};
OptionMenuDemo.defaultProps = {};

export default OptionMenuDemo;
