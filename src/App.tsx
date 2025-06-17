import './styles/index';
import { Header, Catalog } from './components/index';
import HeaderContent from './components/HeaderContent/HeaderContent';
const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <HeaderContent />
      <Catalog />
    </div>
  );
};

export default App;
