import { getIn } from 'formik';

export const isPairs = pairs =>
  Array.isArray(pairs) &&
  pairs.every(
    pair => Array.isArray(pair) && (pair.length === 2 || pair.length === 3),
  );

export const createMediaQueries = (breakpoints, pairs) => {
  if (!breakpoints || !breakpoints.keys || !breakpoints.up) {
    throw new Error(
      'breakpoints must be a valid object that contains "keys" and "up()"',
    );
  }
  if (!Array.isArray(pairs) || pairs.some(pair => !Array.isArray(pair))) {
    throw new Error('pairs must be an array of pair(2 index array)');
  }

  const mediaQueries = {};
  pairs.forEach(pair => {
    if (typeof pair[1] !== 'object') {
      mediaQueries[pair[0]] = pair[2] ? pair[2](pair[1]) : pair[1];
    } else {
      Object.keys(pair[1]).forEach(screen => {
        mediaQueries[breakpoints.up(screen)] = {
          ...mediaQueries[breakpoints.up(screen)],
          // pair[2] is a function that calculate value
          [pair[0]]: pair[2] ? pair[2](pair[1][screen]) : pair[1][screen],
        };
      });
    }
  });
  return mediaQueries;
};

export const getErrorFromField = formik => {
  const { field, form } = formik;
  if (
    !field ||
    !form ||
    Object.keys(field).length === 0 ||
    Object.keys(form).length === 0
  ) {
    throw new Error(
      // eslint-disable-next-line max-len
      "field & form is required, make sure that it is passed from Formik's Field",
    );
  }
  // use getIn to support name in lodash-like dot paths
  // ex. field.name = 'social.twitter'
  const errorText = getIn(form.errors, field.name) || '';
  const errorShown =
    (getIn(form.touched, field.name) || false) && Boolean(errorText);
  return [errorShown, errorText];
};

export const findFirstErrorKey = formik => {
  const { field, form } = formik;
  if (
    !field ||
    !form ||
    Object.keys(field).length === 0 ||
    Object.keys(form).length === 0
  ) {
    throw new Error(
      // eslint-disable-next-line max-len
      "field & form is required, make sure that it is passed from Formik's Field",
    );
  }
  // use getIn to support name in lodash-like dot paths
  // ex. field.name = 'social.twitter'
  const errorValues = getIn(form.errors, field.name);
  if (!errorValues || typeof errorValues !== 'object') return errorValues;
  return Object.keys(errorValues)[0];
};
