import { makeStyles } from '@material-ui/styles';

export const antIconBtnStyles = () => ({
  iconBtn: {
    padding: 0,
    color: 'rgba(0,0,0,0.25)',
  },
  iconBtnLabel: {},
  clearBtn: {
    padding: '4px 5px 4px 3px',
    '& $iconBtnLabel': {
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
  },
});

export const useAntIconBtnStyles = makeStyles(antIconBtnStyles);
