import Collection from './collection';

const INITIAL = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];
const NEW_ITEM = { label: 'Option 4', value: 'option4' };

describe('Collection', () => {
  let emptyCollection;
  let collection;
  beforeEach(() => {
    emptyCollection = Collection([]);
    collection = Collection(INITIAL);
  });
  it('should add new item to collection', () => {
    expect(collection.addToLast(NEW_ITEM)).toEqual([...INITIAL, NEW_ITEM]);
  });

  it('should remove item from index', () => {
    expect(() => collection.removeIndex(INITIAL)).toThrow();
    expect(collection.removeIndex(1)).toEqual([INITIAL[0], INITIAL[2]]);
  });

});
