import { useState } from 'react';
import '../../styles/index';
import { Menu } from '../Menu/Menu';
import { FilterContainer } from '../Photos/components/FilterContainer/FilterContainer';
import { Photos } from '../Photos/Photos';
import { InfoSearchBlock } from '../Photos/components/InfoSearchBlock/InfoSearchBlock';
import { DataTable } from '../Photos/components/DataTable/DataTable';
import { IFiltersProperties } from '../Photos/components/FilterContainer/types';
import { IPhotoPopular } from './store/types';
import React from 'react';

export const Catalog: React.FC<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: IFiltersProperties;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ search, setSearch, filters, setFilters, setClicked }) => {
  const hasSearch = search !== '';
  const [hasPhotos, setHasPhotos] = useState(true);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [isOpen, setIsOpen] = useState({
    filter: false,
    popular: false,
  });

  const optionsPopular: {
    id: string;
    label: string;
    value: keyof IPhotoPopular | '';
  }[] = [
    { id: 'orientation-item-1', label: 'Latest', value: 'Latest' },
    { id: 'orientation-item-2', label: 'popular', value: 'popular' },
  ];

  const toggleDropdown = (value: 'filter' | 'popular'): void => {
    setIsOpen((previous) => ({ ...previous, [value]: !previous[value] }));
  };

  const activeFiltersCount = React.useMemo(() => {
    return Object.values(filters).filter(
      (value) => value !== '' && value !== null && value !== undefined,
    ).length;
  }, [filters]);

  const resetFilters = (): void => {
    setFilters({
      orientation: '',
      size: '',
      color: '',
    });
  };

  return hasSearch ? (
    <div className="main-page-catalog">
      <InfoSearchBlock
        search={search}
        setSearch={setSearch}
        hasPhotos={hasPhotos}
        setClicked={setClicked}
      />
      <div className="main-page-catalog_info-table">
        <DataTable totalResult={totalResult} />
        <div className="main-page-catalog_info-table_end">
          <button
            id="filter-container-button"
            className="button filter-block_button button_white-color"
            type="button"
            onClick={() => {
              toggleDropdown('filter');
            }}
          >
            <span className="filter-container_content">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={
                  isOpen.filter
                    ? 'filter-icon arrow_transform-180 filter-clicked'
                    : 'filter-icon'
                }
              >
                <path
                  id="filter_list-f2ecbc88f73bd1adcf5a04f89af6f1b9_Icon"
                  d="M10.778,18.955h4.444V16.732H10.778ZM3,7V9.222H23V7Zm3.333,7.088H19.667V11.866H6.333Z"
                  transform="translate(-1 -1)"
                ></path>
              </svg>
              <span
                className={
                  isOpen.filter
                    ? 'filter-container_content-text filter-clicked'
                    : 'filter-container_content-text'
                }
              >
                Filters
              </span>
              {activeFiltersCount > 0 && (
                <span className="filters-count">({activeFiltersCount})</span>
              )}
            </span>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                className="button reset-filters-button button_white-color"
                onClick={resetFilters}
              >
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M5.76777 19.9099 19.9099 5.76777 18.1421 4 4 18.1421l1.76777 1.7678Z" />
                  <path d="M4 5.76777 18.1421 19.9099l1.7678-1.7678L5.76777 4 4 5.76777Z" />
                </svg>
              </button>
            )}
          </button>
          <></>
          <button
            id="popular-container-button"
            className="button filter-block_button button_white-color"
            type="button"
            onClick={() => {
              toggleDropdown('popular');
            }}
          >
            <span className="filter-container_content">
              <span className="filter-container_content-text">popular</span>
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className={isOpen.popular ? 'arrow_transform-180' : ''}
              >
                <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
              </svg>
            </span>
          </button>
          <>
            {isOpen.popular && (
              <ul
                id="popular-menu"
                role="listbox"
                aria-labelledby="popular-label"
                className="dropdown_menu"
                data-select-dropdown="true"
              >
                {optionsPopular.map(({ id, label, value }) => (
                  <li
                    key={id}
                    role="option"
                    aria-selected={filters.size === value}
                    id={id}
                    className={`option ${filters.size === value ? 'option_selected' : ''}`}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
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
          </>
        </div>
      </div>
      {isOpen.filter && (
        <FilterContainer filters={filters} setFilters={setFilters} />
      )}
      <Photos
        search={search}
        setHasPhotos={setHasPhotos}
        setTotalResult={setTotalResult}
        filters={filters}
      />
    </div>
  ) : (
    <div className="main-page-catalog">
      <Menu />
      <div className="main-page-catalog_info">
        <h4 className="">Free Stock Photos</h4>
        <button className="button button_white-color button-small-650_height-40">
          <span className="dropdown-wrapper">
            <span className="">Trending</span>
            <svg
              width="20"
              height="20"
              className="dropdown-wrapper-icon"
              viewBox="0 0 24 24"
            >
              <path d="M24 24H0V0h24v24z" fill="none" />
              <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
            </svg>
          </span>
        </button>
      </div>
      <Photos
        search={search}
        setTotalResult={setTotalResult}
        filters={filters}
      />
    </div>
  );
};
