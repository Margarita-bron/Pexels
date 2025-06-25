import './styles/index';
import { Header, Catalog, HeaderContent } from './components/index';
import { useState } from 'react';

const App: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="container">
      <Header />
      <HeaderContent search={search} setSearch={setSearch} />
      <Catalog search={search} />
    </div>
  );
};

export default App;
