import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {
  createMediaQueries,
  isPairs,
  getErrorFromField,
  findFirstErrorKey,
  getMaxItems,
  getMultiSelectOptions,
  filterByInputValue,
} from './functions';

export const COUNTRIES = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(({ label }) => ({
  label,
  value: label.toLowerCase(),
}));

const getOptions = (items, inputValue) =>
  inputValue
    ? items.filter(item => filterByInputValue(inputValue, item.value))
    : items;

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
    const field2 = { name: undefined };
    const form1 = { errors: {}, touched: {} };
    expect(() => getErrorFromField({ field: field2, form: form1 })).toThrow();
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
    expect(getMaxItems(false)(items)).toEqual(items);
    expect(getMaxItems(null)(items)).toEqual(items);
    expect(getMaxItems({})(items)).toEqual(items);
    expect(getMaxItems(4)(items)).toEqual([0, 1, 2, 3]);
  });

  it('should return correct result', () => {
    expect(
      getMultiSelectOptions(COUNTRIES, {
        maxOptionOutput: false,
        selectedItemExcluded: false,
        filterOption: false,
        getOptions: false,
        inputValue: '',
        selectedItems: [],
      }),
    ).toEqual(COUNTRIES);
    expect(
      getMultiSelectOptions(COUNTRIES, {
        maxOptionOutput: 5,
        selectedItemExcluded: false,
        filterOption: false,
        getOptions: false,
        inputValue: '',
        selectedItems: [],
      }).length,
    ).toEqual(5);
    expect(
      getMultiSelectOptions(COUNTRIES, {
        maxOptionOutput: false,
        selectedItemExcluded: true,
        filterOption: false,
        getOptions: false,
        inputValue: '',
        selectedItems: [COUNTRIES[0], COUNTRIES[3]],
      }).length,
    ).toEqual(COUNTRIES.length - 2);
    expect(
      getMultiSelectOptions(COUNTRIES, {
        maxOptionOutput: false,
        selectedItemExcluded: false,
        filterOption: filterByInputValue,
        getOptions: false,
        inputValue: 'albania',
        selectedItems: [],
      }).length,
    ).toEqual(1);
    expect(
      getMultiSelectOptions(COUNTRIES, {
        maxOptionOutput: false,
        selectedItemExcluded: false,
        filterOption: false,
        getOptions,
        inputValue: 'albania',
        selectedItems: [],
      }).length,
    ).toEqual(1);
  });
});
