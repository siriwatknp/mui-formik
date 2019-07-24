import { useEffect } from 'react';
import { findFirstErrorKey } from '../utils/functions';

export default ({ keys, value, setValue, field, form }) => {
  useEffect(() => {
    const errorKey = findFirstErrorKey({ field, form });
    if (
      errorKey !== value && // error is not in current tab
      keys.includes(errorKey) // errorTab must include in tabs
    ) {
      // move to that tab
      setValue(errorKey);
    }
  }, [form.submitCount]);
};
