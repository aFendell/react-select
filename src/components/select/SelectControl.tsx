import * as React from 'react';
import styles from './select.module.css';
import { SelectOption } from './Select';

type Props = {
  isMultiple: boolean;
  selected: SelectOption | SelectOption[] | undefined;
  placeholder: string | undefined;
  toggleOption: (option: SelectOption) => void;
  isOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  filter: string;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectControl = ({
  isMultiple,
  selected,
  toggleOption,
  isOpen,
  filter,
  onFilterChange,
  inputRef,
  placeholder,
}: Props) => {
  return isMultiple ? (
    <div className={styles.control}>
      {Array.isArray(selected) && selected.length ? (
        <ul className={styles['badge-list']}>
          {selected?.map((s) => (
            <li className={styles.badge} key={s.value}>
              <span>{s.label}</span>
              <button
                tabIndex={0}
                aria-label={`remove ${s.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(s);
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {isOpen || (Array.isArray(selected) && selected.length < 1) ? (
        <input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
          value={filter}
          onChange={onFilterChange}
          aria-label='Search options'
          className={styles['select-input']}
        />
      ) : null}
    </div>
  ) : (
    <div className={styles.control}>
      <input
        ref={inputRef}
        type='text'
        placeholder={placeholder}
        value={filter}
        onChange={onFilterChange}
        aria-label='Search options'
        className={styles['select-input']}
      />
    </div>
  );
};

export default SelectControl;
