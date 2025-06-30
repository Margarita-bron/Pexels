/* eslint-disable unicorn/explicit-length-check */
// import "./FilterContainer.module.css"

import { useEffect, useRef, useState } from 'react';
import { IPhotoOrientationValues, IPhotoSizeValues } from '../../store/types';
import { IFiltersProperties } from './types';

export const FilterContainer: React.FC<{
  filters: IFiltersProperties;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
}> = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState({
    orientation: false,
    size: false,
    color: false,
  });
  const orientationReference = useRef<HTMLDivElement>(null);
  const sizeReference = useRef<HTMLDivElement>(null);
  const colorReference = useRef<HTMLDivElement>(null);

  const optionsOrientation: {
    id: string;
    label: string;
    value: keyof IPhotoOrientationValues | '';
  }[] = [
    { id: 'orientation-item-0', label: 'All orientation options', value: '' },
    { id: 'orientation-item-1', label: 'Horizontal', value: 'landscape' },
    { id: 'orientation-item-2', label: 'Vertical', value: 'portrait' },
    { id: 'orientation-item-3', label: 'Square images', value: 'square' },
  ];

  const optionsSize: {
    id: string;
    label: string;
    value: keyof IPhotoSizeValues | '';
  }[] = [
    { id: 'size-item-0', label: 'All sizes', value: '' },
    { id: 'size-item-1', label: 'Big', value: 'large' },
    { id: 'size-item-2', label: 'Average', value: 'medium' },
    { id: 'size-item-3', label: 'Small', value: 'small' },
  ];

  const optionsColor: {
    id: string;
    label: string;
    value: string;
  }[] = [
    { id: 'color-item-0', label: 'All colors', value: '' },
    { id: 'color-item-1', label: '#FF0000', value: 'red' },
    { id: 'color-item-2', label: '#FFA500', value: 'orange' },
    { id: 'color-item-3', label: '#FFFF00', value: 'yellow' },
    { id: 'color-item-4', label: '#008000', value: 'green' },
    { id: 'color-item-5', label: '#40E0D0', value: 'turquoise' },
    { id: 'color-item-6', label: '#0000FF', value: 'blue' },
    { id: 'color-item-7', label: '#8A2BE2', value: 'violet' },
    { id: 'color-item-8', label: '#FFC0CB', value: 'pink' },
    { id: 'color-item-9', label: '#A52A2A', value: 'brown' },
    { id: 'color-item-10', label: '#000000', value: 'black' },
    { id: 'color-item-11', label: '#808080', value: 'gray' },
    { id: 'color-item-12', label: '#FFFFFF', value: 'white' },
  ];

  const selectedOptionOrientation = optionsOrientation.find(
    (option) => option.value === filters.orientation,
  );
  const selectedOptionSize = optionsSize.find(
    (option) => option.value === filters.size,
  );
  const selectedOptionColor = optionsColor.find(
    (option) => option.value === filters.color,
  );

  const handleOrientationSelect = (
    value: keyof IPhotoOrientationValues | '',
  ): void => {
    setFilters((previous) => ({
      ...previous,
      orientation: value,
    }));
    setIsOpen((previous) => ({ ...previous, orientation: false }));
  };
  const handleSizeSelect = (value: keyof IPhotoSizeValues | ''): void => {
    setFilters((previous) => ({
      ...previous,
      size: value,
    }));
    setIsOpen((previous) => ({ ...previous, size: false }));
  };
  const handleColorSelect = (value: string): void => {
    setFilters((previous) => ({
      ...previous,
      color: value,
    }));
    setIsOpen((previous) => ({ ...previous, color: false }));
  };

  const toggleDropdown = (value: 'orientation' | 'size' | 'color'): void => {
    setIsOpen((previous) => ({ ...previous, [value]: !previous[value] }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        orientationReference.current &&
        event.target instanceof Node &&
        !orientationReference.current.contains(event.target)
      ) {
        setIsOpen((previous) => ({ ...previous, orientation: false }));
      }

      if (
        sizeReference.current &&
        event.target instanceof Node &&
        !sizeReference.current.contains(event.target)
      ) {
        setIsOpen((previous) => ({ ...previous, size: false }));
      }

      if (
        colorReference.current &&
        event.target instanceof Node &&
        !colorReference.current.contains(event.target)
      ) {
        setIsOpen((previous) => ({ ...previous, color: false }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-container">
      <div className="filter-block dropdown-wrapper" ref={orientationReference}>
        <button
          id="orientation-toggle-button"
          aria-haspopup="listbox"
          aria-expanded={isOpen.orientation}
          aria-labelledby="orientation-label orientation-toggle-button"
          type="button"
          className="button filter-block_button button_white-color"
          onClick={() => {
            toggleDropdown('orientation');
          }}
        >
          <span className="dropdown-button_content">
            <span className="dropdown-button_title">
              {selectedOptionOrientation?.label ?? 'All orientation options'}
            </span>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className={isOpen.orientation ? 'arrow_transform-180' : ''}
            >
              <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
            </svg>
          </span>
        </button>
        {isOpen.orientation && (
          <ul
            id="orientation-menu"
            role="listbox"
            aria-labelledby="orientation-label"
            className="dropdown_menu"
            data-select-dropdown="true"
          >
            {optionsOrientation.map(({ id, label, value }) => (
              <li
                key={id}
                role="option"
                aria-selected={filters.orientation === value}
                id={id}
                className={`option ${filters.orientation === value ? 'option_selected' : ''}`}
                tabIndex={0}
                onClick={() => {
                  handleOrientationSelect(value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleOrientationSelect(value);
                  }
                }}
              >
                <span className="option-child">{label}</span>
                {filters.orientation === value && (
                  <svg
                    className="Icon_color-black"
                    viewBox="0 0 16 16"
                    width="22"
                    height="22"
                  >
                    <path d="M6.50916 12.5771c-.27 0-.54065-.0949-.75806-.2854L2 8.99912l1.51609-1.72773L6.46683 9.8617 12.4581 4l1.6071 1.64307-6.75247 6.60633c-.22254.218-.51305.3277-.80357.3277Z" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-block dropdown-wrapper" ref={sizeReference}>
        <button
          id="size-toggle-button"
          aria-haspopup="listbox"
          aria-expanded={isOpen.size}
          aria-labelledby="size-label size-toggle-button"
          className="button filter-block_button button_white-color"
          onClick={() => {
            toggleDropdown('size');
          }}
          type="button"
        >
          <span className="dropdown-button_content">
            <span className="dropdown-button_title">
              {selectedOptionSize?.label ?? 'All sizes'}
            </span>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className={isOpen.size ? 'arrow_transform-180' : ''}
            >
              <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
            </svg>
          </span>
        </button>
        {isOpen.size && (
          <ul
            id="orientation-menu"
            role="listbox"
            aria-labelledby="orientation-label"
            className="dropdown_menu"
            data-select-dropdown="true"
          >
            {optionsSize.map(({ id, label, value }) => (
              <li
                key={id}
                role="option"
                aria-selected={filters.size === value}
                id={id}
                className={`option ${filters.size === value ? 'option_selected' : ''}`}
                tabIndex={0}
                onClick={() => {
                  handleSizeSelect(value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSizeSelect(value);
                  }
                }}
              >
                <span className="option-child">{label}</span>
                {filters.size === value && (
                  <svg
                    className="Icon_color-black"
                    viewBox="0 0 16 16"
                    width="22"
                    height="22"
                  >
                    <path d="M6.50916 12.5771c-.27 0-.54065-.0949-.75806-.2854L2 8.99912l1.51609-1.72773L6.46683 9.8617 12.4581 4l1.6071 1.64307-6.75247 6.60633c-.22254.218-.51305.3277-.80357.3277Z" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-block dropdown-wrapper" ref={colorReference}>
        <button
          id="color-toggle-button"
          aria-haspopup="listbox"
          aria-expanded={isOpen.color}
          aria-labelledby="color-label color-toggle-button"
          type="button"
          className="button filter-block_button button_white-color"
          onClick={() => {
            toggleDropdown('color');
          }}
        >
          <span className="dropdown-button_content">
            <span className="dropdown-button_content-info">
              <div
                className="color-menu_option color-menu_option-button"
                style={{ background: selectedOptionColor?.label ?? '#fff' }}
              ></div>
              <span className="dropdown-button_title">
                {selectedOptionColor?.label ?? 'All colors'}
              </span>
            </span>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className={isOpen.color ? 'arrow_transform-180' : ''}
            >
              <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
            </svg>
          </span>
        </button>
        {isOpen.color && (
          <ul
            id="color-menu"
            role="listbox"
            aria-labelledby="color-label"
            className="dropdown_menu dropdown_color-menu"
            data-select-dropdown="true"
          >
            {optionsColor.map(({ id, value }) => (
              <li
                key={id}
                role="option"
                aria-selected={filters.color === value}
                id={id}
                className={`color-option`}
                tabIndex={0}
                onClick={() => {
                  handleColorSelect(value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleColorSelect(value);
                  }
                }}
              >
                <div
                  className="option-child color-menu_option"
                  id={`color-item-${value}`}
                  style={{ background: value }}
                ></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
