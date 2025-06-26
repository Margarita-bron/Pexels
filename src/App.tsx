import './styles/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { IFiltersProperties } from './components/Photos/components/FilterContainer/FilterContainer';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<IFiltersProperties>({
    orientation: '',
    size: '',
    color: '',
  });

  const hasSearch = search !== '';

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              filters={filters}
              search={search}
              setSearch={setSearch}
              setFilters={setFilters}
            />
          }
        />

        {hasSearch && (
          <Route
            path="/search"
            element={
              <SearchPage
                filters={filters}
                search={search}
                setSearch={setSearch}
                setFilters={setFilters}
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
