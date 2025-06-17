import './styles/index';
import { Header, Menu, Photos } from './components/index';
import HeaderContent from './components/HeaderContent/HeaderContent';
const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <HeaderContent />
      <Menu />
      <Photos />
    </div>
  );
};

export default App;
