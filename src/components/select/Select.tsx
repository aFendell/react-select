import styles from './select.module.css';
import useSelect from './useSelect';
import SelectControl from './SelectControl';
import SelectDropdown from './SelectDropdown';

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  isMultiple: false;
  selected: SelectOption | undefined;
  onChange: (selected: SelectOption) => void;
};

type MultiSelectProps = {
  isMultiple: true;
  selected: SelectOption[];
  onChange: (selected: SelectOption[]) => void;
};

export type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
} & (SingleSelectProps | MultiSelectProps);

const Select = (props: SelectProps) => {
  const { isMultiple, selected, placeholder, options } = props;
  const {
    filter,
    filteredOptions,
    highlightedIndex,
    isOpen,
    inputRef,
    isOptionSelected,
    onFilterChange,
    setHighlightedIndex,
    toggleAll,
    toggleOption,
    wrapperRef,
    toggleOpen,
  } = useSelect(props);

  return (
    <div
      ref={wrapperRef}
      className={styles['select-wrapper']}
      onClick={toggleOpen}
      tabIndex={0}
      role='combobox'
      aria-expanded={isOpen}
      aria-haspopup='listbox'
      aria-controls='select-options'
    >
      <div className={styles['select-container']}>
        <SelectControl
          isMultiple={isMultiple}
          isOpen={isOpen}
          inputRef={inputRef}
          onFilterChange={onFilterChange}
          selected={selected}
          toggleOption={toggleOption}
          placeholder={placeholder}
          filter={filter}
        />
        <div className={styles.divider}></div>
        <div
          className={`${styles.triangle} ${isOpen ? styles.open : ''}`}
        ></div>
      </div>
      <SelectDropdown
        isMultiple={isMultiple}
        options={options}
        selected={selected}
        filter={filter}
        filteredOptions={filteredOptions}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        isOptionSelected={isOptionSelected}
        toggleOption={toggleOption}
        toggleAll={toggleAll}
        isOpen={isOpen}
      />
    </div>
  );
};

export default Select;
