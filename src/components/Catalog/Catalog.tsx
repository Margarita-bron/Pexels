import { useState } from 'react';
import '../../styles/index';
import { Menu } from '../Menu/Menu';
import {
  FilterContainer,
  IFiltersProperties,
} from '../Photos/components/FilterContainer/FilterContainer';
import { Photos } from '../Photos/Photos';
import { InfoSearchBlock } from '../Photos/components/FilterContainer/EmptySearchContent';

export const Catalog: React.FC<{
  search: string;
  filters: IFiltersProperties;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
}> = ({ search, filters, setFilters }) => {
  const hasSearch = search !== '';
  const [hasPhotos, setHasPhotos] = useState(true);

  return hasSearch ? (
    <div className="main-page-catalog_info">
      <InfoSearchBlock search={search} hasPhotos={hasPhotos} />
      <FilterContainer filters={filters} setFilters={setFilters} />
      <Photos search={search} setHasPhotos={setHasPhotos} />
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
      <Photos search={search} />
    </div>
  );
};
