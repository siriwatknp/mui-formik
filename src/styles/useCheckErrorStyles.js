import { makeStyles } from '@material-ui/styles';

const useCheckErrorStyles = makeStyles(({ palette }) => ({
  root: ({ name, errors, touched }) => {
    const errorShown = touched[name] && Boolean(errors[name]);
    return errorShown
      ? {
          color: palette.error.main,
        }
      : {};
  },
}));

export default useCheckErrorStyles;
