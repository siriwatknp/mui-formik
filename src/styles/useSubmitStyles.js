import { makeStyles } from '@material-ui/styles';
import { createMediaQueries } from '../utils/functions';

const useSubmitStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: ({ mt = 2, width }) => ({
    ...createMediaQueries(breakpoints, [
      ['marginTop', mt, val => spacing(val)],
      ['width', width],
    ]),
  }),
}));

export default useSubmitStyles;
