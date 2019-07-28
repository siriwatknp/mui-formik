const defaultIdentifier = item => (item ? item.value : '');

export default (collection, itemToValue = defaultIdentifier) => {
  const addToIndex = (item, index = collection.length) => [
    ...collection.slice(0, index),
    item,
    ...collection.slice(index, collection.length),
  ];

  const removeBy = cb => collection.filter((item, i) => !cb(item, i));

  const removeIndex = index => {
    if (typeof index !== 'number') {
      throw new Error(
        // eslint-disable-next-line max-len
        `collection.removeIndex : index should be a number, received ${typeof index}`,
      );
    }
    return removeBy((_, i) => i === index);
  };

  return {
    get: () => collection,
    addToIndex,
    addToLast: item => addToIndex(item, collection.length),
    addToFirst: item => addToIndex(item, 0),
    removeIndex,
    removeLast: () => removeIndex(collection.length - 1),
    removeItem: selectedItem =>
      removeBy(item => itemToValue(item) === itemToValue(selectedItem)),
  };
};
