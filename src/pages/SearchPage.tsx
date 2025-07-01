import { useSearchParams } from 'react-router';
import { Catalog, Header } from '../components';
import React from 'react';
import { IFiltersProperties } from '../components/Photos/components/FilterContainer/types';

export const SearchPage: React.FC<{
  filters: IFiltersProperties;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ filters, search, setSearch, setFilters, setClicked }) => {
  const [searchParameters] = useSearchParams();
  const query = searchParameters.get('query') ?? '';

  React.useEffect(() => {
    if (query !== search && location.pathname.startsWith('/search')) {
      setSearch(query);
    }
  }, [query, search, setSearch, location.pathname]);

  return (
    <div className="container">
      <Header search={search} setSearch={setSearch} setClicked={setClicked} />
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
