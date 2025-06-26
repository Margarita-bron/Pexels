import { Catalog, Header, HeaderContent } from '../components';
import { IFiltersProperties } from '../components/Photos/components/FilterContainer/FilterContainer';

export const MainPage: React.FC<{
  filters: IFiltersProperties;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<IFiltersProperties>>;
}> = ({ filters, search, setSearch, setFilters }) => {
  return (
    <div className="container">
      <Header search={search} setSearch={setSearch} />
      <HeaderContent search={search} setSearch={setSearch} />
      <Catalog search={search} filters={filters} setFilters={setFilters} />
    </div>
  );
};
