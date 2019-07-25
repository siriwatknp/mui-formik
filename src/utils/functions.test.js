import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {
  createMediaQueries,
  isPairs,
  getErrorFromField,
  findFirstErrorKey,
  getMaxItems,
} from './functions';

const breakpoints = createBreakpoints({});

describe('functions', () => {
  it('should check if it is pairs', () => {
    expect(isPairs({})).toBeFalsy();
    expect(isPairs([])).toBeTruthy();
    expect(isPairs([[1, 2]])).toBeTruthy();
    expect(isPairs([[1, 2, 3]])).toBeTruthy();
    expect(isPairs([[1, 2, 3, 4]])).toBeFalsy();
    expect(isPairs([[1, 2], ''])).toBeFalsy();
    expect(isPairs([[1, 2], {}])).toBeFalsy();
    expect(isPairs([[1, 2], ['test']])).toBeFalsy();
    expect(isPairs([[1, 2], ['test', 'test']])).toBeTruthy();
  });

  it('should return correct queries', () => {
    expect(() => createMediaQueries()).toThrow();
    const value1 = 1;
    const value2 = '#fff';
    const value3 = { xs: 1, md: 3 };
    const value4 = { sm: 1, xl: 3 };
    const testCases = [
      [[['margin', value1]], { margin: 1 }],
      [[['color', value2]], { color: '#fff' }],
      [[['color', value2, val => `${val}000`]], { color: '#fff000' }],
      [
        [['padding', value3]],
        {
          [breakpoints.up('xs')]: { padding: 1 },
          [breakpoints.up('md')]: { padding: 3 },
        },
      ],
      [
        [
          ['padding', value4],
          ['margin', '3em'],
          ['color', { xs: '#fff', lg: '#000' }],
        ],
        {
          margin: '3em',
          [breakpoints.up('xs')]: { color: '#fff' },
          [breakpoints.up('sm')]: { padding: 1 },
          [breakpoints.up('lg')]: { color: '#000' },
          [breakpoints.up('xl')]: { padding: 3 },
        },
      ],
      [
        [['padding', { xs: 1, md: 3 }, val => val + 1]],
        {
          [breakpoints.up('xs')]: { padding: 2 },
          [breakpoints.up('md')]: { padding: 4 },
        },
      ],
    ];
    testCases.forEach(([pairs, output]) => {
      expect(createMediaQueries(breakpoints, pairs)).toEqual(output);
    });
  });

  it('should return correct error', () => {
    expect(() => getErrorFromField()).toThrow();
    const field1 = { name: 'email' };
    const form1 = { errors: {}, touched: {} };
    expect(getErrorFromField({ field: field1, form: form1 })).toEqual([
      false,
      '',
    ]);
  });

  it('should return the first error key', () => {
    expect(() => findFirstErrorKey()).toThrow();
    const form1 = { errors: { name: { en: 'Required' } } };
    const form2 = { errors: { name: { th: 'Required' } } };
    const field = { name: 'name' };
    expect(findFirstErrorKey({ field, form: form1 })).toEqual('en');
    expect(findFirstErrorKey({ field, form: form2 })).toEqual('th');
  });

  it('should return correct items', () => {
    const items = [0, 1, 2, 3, 4, 5];
    expect(getMaxItems(items, false)).toEqual(items);
    expect(getMaxItems(items, null)).toEqual(items);
    expect(getMaxItems(items, {})).toEqual(items);
    expect(getMaxItems(items, 4)).toEqual([0, 1, 2, 3]);
  });

});
