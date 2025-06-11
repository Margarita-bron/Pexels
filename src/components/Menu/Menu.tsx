import './menu.css';

export const Menu: React.FC = () => {
  const menuElements: Record<string, string> = {
    Главная: '/home',
    Видео: '/video',
    'Таблица лидеров': '/leaders',
    Челенджи: '/challenges',
  };

  const menuItems = Object.entries(menuElements).map(([name, link]) => (
    <a key={name} href={link} className="main-menu-item">
      {name}
    </a>
  ));

  return <nav>{menuItems}</nav>;
};
