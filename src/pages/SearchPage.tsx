import { useSearchParams } from 'react-router';
import { Catalog, Header } from '../components';
import { IFiltersProperties } from '../components/Photos/components/FilterContainer/FilterContainer';
import React from 'react';

export const SearchPage: React.FC<{
  filters: IFiltersProperties;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
}> = ({ filters, search, setSearch, setFilters }) => {
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
      <Catalog search={search} filters={filters} setFilters={setFilters} />
    </div>
  );
};
