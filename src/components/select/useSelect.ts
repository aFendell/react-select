import * as React from 'react';
import type { SelectOption, SelectProps } from './Select';

const MIN_INDEX = 0;

function useSelect({ options, isMultiple, selected, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setFilter(e.target.value);
    setHighlightedIndex(MIN_INDEX);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleOption = React.useCallback(
    (option: SelectOption) => {
      if (isMultiple) {
        const updatedSelected = selected.some((s) => s.value === option.value)
          ? selected.filter((s) => s.value !== option.value)
          : [...selected, option];

        onChange(updatedSelected);
      } else {
        onChange(option);
        setFilter(option.label);
        setIsOpen(false);
      }
    },
    [isMultiple, onChange, selected]
  );

  const toggleAll = React.useCallback(() => {
    if (!isMultiple) return;
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange(options);
    }
  }, [isMultiple, onChange, options, selected]);

  const isOptionSelected = (option: SelectOption) => {
    if (isMultiple) {
      return selected.some(
        (selectedOption) => selectedOption.value === option.value
      );
    } else {
      return selected?.value === option.value;
    }
  };

  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const inputElement = inputRef.current;
    if (isOpen && inputElement) {
      inputElement.focus();
      inputElement.setSelectionRange(
        inputElement.value.length,
        inputElement.value.length
      );
    } else {
      inputElement?.blur();
      wrapperRef.current?.focus();
      if (isMultiple) setFilter('');
      if (!isMultiple && !selected) {
        setFilter('');
        setHighlightedIndex(MIN_INDEX);
      }
    }
  }, [isMultiple, isOpen, selected]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const maxIndex = isMultiple ? options.length : options.length - 1;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        return;
      switch (e.code) {
        case 'Enter':
          e.preventDefault();
          toggleOpen();
          break;
        case 'Space':
          if (isOpen) {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            highlightedIndex === options.length
              ? toggleAll()
              : toggleOption(filteredOptions[highlightedIndex]);
          }
          break;
        case 'ArrowUp':
          if (isOpen && highlightedIndex >= MIN_INDEX) {
            setHighlightedIndex((prevHighlighted) => prevHighlighted - 1);
          }
          break;
        case 'ArrowDown':
          if (isOpen && highlightedIndex < maxIndex) {
            setHighlightedIndex((prevHighlighted) => prevHighlighted + 1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    const wrapperElement = wrapperRef.current;
    wrapperElement?.addEventListener('keydown', handler);

    return () => {
      wrapperElement?.removeEventListener('keydown', handler);
    };
  }, [
    filteredOptions,
    highlightedIndex,
    isMultiple,
    isOpen,
    options.length,
    toggleAll,
    toggleOption,
  ]);

  return {
    isOpen,
    toggleOpen,
    filter,
    filteredOptions,
    onFilterChange,
    highlightedIndex,
    setHighlightedIndex,
    wrapperRef,
    inputRef,
    toggleAll,
    toggleOption,
    isOptionSelected,
  };
}

export default useSelect;
