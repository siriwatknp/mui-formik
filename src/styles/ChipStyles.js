import { makeStyles } from '@material-ui/styles';

export const useAntChipStyles = makeStyles(() => ({
  root: {
    height: 24,
    backgroundColor: '#fafafa',
    border: '1px solid #e8e8e8',
    borderRadius: 2,
  },
  label: {
    padding: '0 10px',
    color: 'rgba(0,0,0,0.65)',
  },
  deleteIcon: {
    fontSize: 16,
    marginLeft: -6,
  },
  deletable: {
    '&:focus': {
      backgroundColor: '#fafafa',
    },
  },
}));
