import { Menu } from './components/Menu/Menu';
import Photos from './components/Photos';
import './app.css';
const App: React.FC = () => {
  return (
    <div className="container">
      <Photos />
      <Menu />
    </div>
  );
};

export default App;
