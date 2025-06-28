import { useEffect } from 'react';
import { Catalog, Header, HeaderContent } from '../components';
import { IFiltersProperties } from '../components/Photos/components/FilterContainer/FilterContainer';

export const MainPage: React.FC<{
  filters: IFiltersProperties;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ filters, search, setSearch, setFilters, setClicked }) => {
  useEffect(() => {
    setSearch('');
  }, [setSearch]);

  return (
    <div className="container">
      <Header search={search} setSearch={setSearch} />
      <HeaderContent search={search} setSearch={setSearch} />
      <Catalog
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        setClicked={setClicked}
      />
    </div>
  );
};
