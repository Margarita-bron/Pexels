import { useState } from 'react';
import '../../styles/index';
import { Menu } from '../Menu/Menu';
import { FilterContainer } from '../Photos/components/FilterContainer/FilterContainer';
import { Photos } from '../Photos/Photos';
import { InfoSearchBlock } from '../Photos/components/InfoSearchBlock/InfoSearchBlock';
import { DataTable } from '../Photos/components/DataTable/DataTable';
import { IFiltersProperties } from '../Photos/components/FilterContainer/types';

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

  return hasSearch ? (
    <div className="main-page-catalog">
      <InfoSearchBlock
        search={search}
        setSearch={setSearch}
        hasPhotos={hasPhotos}
        setClicked={setClicked}
      />
      <DataTable totalResult={totalResult} />
      <FilterContainer filters={filters} setFilters={setFilters} />
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
