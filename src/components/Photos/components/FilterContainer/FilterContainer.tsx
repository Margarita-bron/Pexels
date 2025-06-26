// import "./FilterContainer.module.css"

import { useEffect, useRef, useState } from 'react';
import { IPhotoOrientationValues, IPhotoSizeValues } from '../../store/types';

export interface IFiltersProperties {
  orientation: keyof IPhotoOrientationValues | '';
  size: keyof IPhotoSizeValues | '';
  color: string;
}

export const FilterContainer: React.FC<{
  filters: IFiltersProperties;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
}> = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownReference = useRef<HTMLDivElement>(null);

  const options: {
    id: string;
    label: string;
    value: keyof IPhotoOrientationValues | '';
  }[] = [
    { id: 'orientation-item-0', label: 'All orientation options', value: '' },
    { id: 'orientation-item-1', label: 'Horizontal', value: 'landscape' },
    { id: 'orientation-item-2', label: 'Vertical', value: 'portrait' },
    { id: 'orientation-item-3', label: 'Square images', value: 'square' },
  ];

  const handleSelect = (value: keyof IPhotoOrientationValues | ''): void => {
    setFilters((previous) => ({
      ...previous,
      orientation: value,
    }));
    setIsOpen(false);
  };

  const toggleDropdown = (): void => {
    setIsOpen((previous) => !previous);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownReference.current &&
        event.target instanceof Node &&
        !dropdownReference.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="filter-container">
      <div className="filter-block dropdown-wrapper">
        <button
          id="orientation-toggle-button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="orientation-label orientation-toggle-button"
          type="button"
          className="button dropdown-button"
          onClick={toggleDropdown}
        >
          <span className="dropdown-button_content">
            <span className="dropdown-button_title">
              {filters.orientation || 'All orientation options'}
            </span>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
            </svg>
          </span>
        </button>
        {isOpen && (
          <ul
            id="orientation-menu"
            role="listbox"
            aria-labelledby="orientation-label"
            className="dropdown_menu"
            data-select-dropdown="true"
          >
            {options.map(({ id, label, value }) => (
              <li
                key={id}
                role="option"
                aria-selected={filters.orientation === value}
                id={id}
                className={`option ${filters.orientation === value ? 'option_selected' : ''}`}
                tabIndex={0}
                onClick={() => {
                  handleSelect(value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSelect(value);
                  }
                }}
              >
                <span className="option_childTextPrimary">{label}</span>
                {filters.orientation === value && (
                  <svg
                    className="Icon_color-black"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                  >
                    <path d="M6.50916 12.5771c-.27 0-.54065-.0949-.75806-.2854L2 8.99912l1.51609-1.72773L6.46683 9.8617 12.4581 4l1.6071 1.64307-6.75247 6.60633c-.22254.218-.51305.3277-.80357.3277Z" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
