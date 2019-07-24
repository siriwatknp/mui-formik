import { makeStyles } from '@material-ui/styles';
import { getErrorFromField } from '../utils/functions';

const useCheckErrorStyles = makeStyles(({ palette }) => ({
  root: ({ field, form }) => {
    const [errorShown] = getErrorFromField({ field, form });
    return errorShown
      ? {
          color: palette.error.main,
        }
      : {};
  },
}));

export default useCheckErrorStyles;
