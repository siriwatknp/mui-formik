import { useEffect, useState } from 'react';

export default ref => {
  const [size, setSize] = useState({});
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSize(rect);
    }
  }, [ref]);

  return size;
};
