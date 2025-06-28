import './styles/index';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IFiltersProperties } from './components/Photos/components/FilterContainer/FilterContainer';
import { MainPage } from './pages/MainPage';
import { SearchPage } from './pages/SearchPage';
import { useNavigate } from 'react-router';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [filters, setFilters] = useState<IFiltersProperties>({
    orientation: '',
    size: '',
    color: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (search === '' && clicked) {
      void navigate('/');
      setClicked(false);
    }
  }, [search, clicked, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            filters={filters}
            search={search}
            setSearch={setSearch}
            setFilters={setFilters}
            setClicked={setClicked}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchPage
            filters={filters}
            search={search}
            setSearch={setSearch}
            setFilters={setFilters}
            setClicked={setClicked}
          />
        }
      />
    </Routes>
  );
};

export default App;
