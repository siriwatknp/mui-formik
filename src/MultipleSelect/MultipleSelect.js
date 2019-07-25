import React, { useState, useRef } from 'react';
import without from 'lodash/without';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import OptionMenu from './OptionMenu';
import {
  useChipStyles,
  useInputBaseStyles,
  useRootStyles,
} from '../styles/useMultiSelectStyles';

const MultipleSelect = ({
  options,
  value,
  menuId,
  chipId,
  onChangeInput,
  onChange,
  onFocus,
  onBlur,
  selectedItemExcluded,
  filterOption,
  renderEmpty,
  fullWidth,
  InputProps,
  inputProps,
  ...props
}) => {
  const chipClasses = useChipStyles();
  const inputBaseClasses = useInputBaseStyles(InputProps);
  const rootClasses = useRootStyles({ fullWidth, ...props });
  const inputEl = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const getLabel = itemValue => {
    const item = options.find(option => option.value === itemValue);
    return item ? item.label : '';
  };
  const handleKeyDown = e => {
    if (value.length && !inputValue.length && e.key === 'Backspace') {
      onChange(value.slice(0, value.length - 1));
    }
  };
  return (
    <div className={rootClasses.root}>
      <TextField
        fullWidth={fullWidth}
        inputRef={inputEl}
        {...props}
        autoComplete={'off'}
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          onChangeInput(e);
        }}
        onFocus={e => {
          setOpen(true);
          onFocus(e);
        }}
        onBlur={e => {
          e.persist();
          setTimeout(() => {
            const target = document.activeElement;
            if (
              target.id &&
              (target.id.includes(menuId) || target.id.includes(chipId))
            ) {
              if (inputEl.current) {
                inputEl.current.focus();
              }
            } else {
              setOpen(false);
              onBlur(e);
            }
          }, 1);
        }}
        InputProps={{
          ...InputProps,
          startAdornment: value.map(itemValue => (
            <Chip
              key={itemValue}
              id={`${chipId}${itemValue}`}
              classes={chipClasses}
              label={getLabel(itemValue)}
              onDelete={() => onChange(without(value, itemValue))}
            />
          )),
          classes: inputBaseClasses,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          ...inputProps,
          onKeyDown: handleKeyDown,
        }}
      />
      {open && (
        <OptionMenu
          selectedItems={value}
          options={options}
          selectedItemExcluded={selectedItemExcluded}
          filterOption={optionValue => filterOption(inputValue, optionValue)}
          renderEmpty={renderEmpty}
          menuId={menuId}
          onClickItem={(_, val) => {
            if (!value.includes(val)) {
              setInputValue('');
            }
            onChange(
              value.includes(val)
                ? without(value, val) // remove this item from value
                : [...value, val], // add selected item to value
            );
          }}
        />
      )}
    </div>
  );
};

MultipleSelect.propTypes = {};
MultipleSelect.defaultProps = {
  options: [],
  menuId: '__menu__',
  chipId: '__chip__',
  value: [],
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onChangeInput: () => {},
  filterOption: (inputValue, optionValue) =>
    !inputValue || optionValue.toLowerCase().includes(inputValue.toLowerCase()),
};

export default MultipleSelect;
