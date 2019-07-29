import { makeStyles } from '@material-ui/styles';

export const antChipStyles = () => ({
  chipRoot: {
    height: 24,
    backgroundColor: '#fafafa',
    border: '1px solid #e8e8e8',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  chipLabel: {
    padding: '0 10px',
    color: 'rgba(0,0,0,0.65)',
  },
  chipDeleteIcon: {
    fontSize: 16,
    marginLeft: -6,
  },
  chipDeletable: {
    '&:focus': {
      backgroundColor: '#fafafa',
    },
  },
});

export const useAntChipStyles = makeStyles(antChipStyles);
