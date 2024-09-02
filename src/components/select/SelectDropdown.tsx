import * as React from 'react';
import { SelectOption } from './Select';
import styles from './select.module.css';

type Props = {
  isMultiple: boolean;
  options: SelectOption[];
  selected: SelectOption | SelectOption[] | undefined;
  filter: string;
  filteredOptions: SelectOption[];
  highlightedIndex: number;
  setHighlightedIndex: (value: React.SetStateAction<number>) => void;
  isOptionSelected: (option: SelectOption) => boolean;
  toggleOption: (option: SelectOption) => void;
  toggleAll: VoidFunction;
  isOpen: boolean;
};

const SelectDropdown = ({
  isMultiple,
  options,
  selected,
  filter,
  filteredOptions,
  highlightedIndex,
  setHighlightedIndex,
  isOptionSelected,
  toggleOption,
  toggleAll,
  isOpen,
}: Props) => {
  return (
    <div
      className={`${styles['select-dropdown']} ${isOpen ? styles.open : ''}`}
    >
      {filteredOptions.length ? (
        <ul role='listbox' className={styles['select-options']}>
          {filteredOptions.map((option, index) => (
            <li
              className={`${styles.option} ${
                index === highlightedIndex ? styles.highlighted : ''
              }`}
              key={option.value}
              role='option'
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {isMultiple ? (
                <>
                  <input
                    id={option.value.toString()}
                    type='checkbox'
                    checked={isOptionSelected(option)}
                    onChange={() => toggleOption(option)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <label
                    htmlFor={option.value.toString()}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleOption(option);
                    }}
                  >
                    {option.label}
                  </label>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleOption(option);
                  }}
                >
                  {option.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles['empty-options']}>No options</span>
      )}
      {isMultiple && filter === '' ? (
        <div
          className={`${styles['toggle-all']} ${
            highlightedIndex === options.length ? styles.highlighted : ''
          }`}
          onMouseEnter={() => setHighlightedIndex(options.length)}
        >
          <button
            className={`${styles['toggle-all-btn']}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleAll();
            }}
          >
            {Array.isArray(selected) && selected.length === options.length
              ? 'Deselect All'
              : 'Select All'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SelectDropdown;
