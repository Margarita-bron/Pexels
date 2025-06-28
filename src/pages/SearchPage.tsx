import { useSearchParams } from 'react-router';
import { Catalog, Header } from '../components';
import { IFiltersProperties } from '../components/Photos/components/FilterContainer/FilterContainer';
import React from 'react';

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
    if (query !== search) {
      setSearch(query);
    }
  }, [query, search, setSearch]);

  return (
    <div className="container">
      <Header search={search} setSearch={setSearch} />
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
