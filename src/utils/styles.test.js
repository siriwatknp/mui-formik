import { getStyleAttrs, pick } from './styles';

const styles = ({ breakpoints, palette }) => ({
  first: {
    [breakpoints.up('sm')]: {
      color: palette.primary.main,
    },
  },
  second: {},
  last: {},
});

describe('styles utils', () => {
  it('should return correct style traits', () => {
    expect(getStyleAttrs(styles)).toEqual(['first', 'second', 'last']);
  });

  it('should return correct format of result', () => {
    expect(pick(undefined)).toBeUndefined();
    expect(pick({ a: '', b: [], c: 'hello' }, ['a', 'b'])).toEqual({
      a: '',
      b: [],
    });
    expect(pick({ a: '', b: [], c: 'hello' }, ['a', 'd'])).toEqual({
      a: '',
    });
  });
});
