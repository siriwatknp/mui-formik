export const defaultItemToValue = item => (item ? item.value : '');
export const defaultItemToLabel = item => (item ? item.label : '');

export const injectMenuProps = (
  {
    menuId,
    options = [],
    itemToLabel = defaultItemToLabel,
    itemToValue = defaultItemToValue,
    getMenuProps = arg => arg,
    getItemProps = arg => arg,
    maxOptionOutput = false,
    filterOption = false,
    getOptions = false,
    inputValue = '',
    selectedItem = {},
    selectedItems = [],
    selectedItemExcluded = true,
    getSelectOptions = false,
    renderEmpty = undefined, // show default ui
  },
  extra = {},
) => ({
  getMenuProps,
  itemToLabel,
  itemToValue,
  selectedItems,
  options: getSelectOptions(options, {
    maxOptionOutput,
    filterOption,
    getOptions,
    inputValue,
    selectedItem,
    selectedItems,
    selectedItemExcluded,
    itemToValue,
  }),
  getItemProps: ({ item, index }) =>
    getItemProps({
      key: itemToValue(item),
      id: `${menuId}${itemToValue(item)}`,
      item,
      index,
      ...(extra.getItemProps && extra.getItemProps({ item, index })),
    }),
  renderEmpty,
});

export const injectTextFieldProps = ({
  label = '',
  placeholder = '',
  fullWidth = false,
  variant = 'standard',
  error = false,
  margin = 'none',
  required = false,
  helperText = '',
  getLabelProps = () => {},
  inputProps = {},
  onBlur = () => {},
  inputRef = {},
  value = '',
  onChange = () => {},
}) => ({
  label,
  placeholder,
  fullWidth,
  variant,
  error,
  margin,
  required,
  helperText,
  inputProps,
  InputLabelProps: getLabelProps(),
  onBlur,
  inputRef,
  value,
  onChange,
});

export const getMultiSelectLogic = (collection, stateUpdater) => {
  const wrapFn = (fn, callback) => (...args) => callback(fn(...args));
  const addItem = wrapFn(collection.addToLast, stateUpdater);
  const removeLast = wrapFn(collection.removeLast, stateUpdater);
  const removeItem = wrapFn(collection.removeItem, stateUpdater);
  return {
    addItem,
    removeLast,
    removeItem,
    handleSelection: selectedItem => {
      if (!collection.get().includes(selectedItem)) {
        addItem(selectedItem);
      } else {
        removeItem(selectedItem);
      }
    },
    handleKeyDown: inputValue => e => {
      if (e.key === 'Backspace' && !inputValue) {
        removeLast();
      }
    },
  };
};
