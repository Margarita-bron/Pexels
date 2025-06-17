import './menu.css';

export const Menu: React.FC = () => {
  const menuElements: Record<string, string> = {
    Home: '/home',
    Videos: '/video',
    Leaderboard: '/leaders',
    Challenges: '/challenges',
  };

  const menuItems = Object.entries(menuElements).map(([name, link]) => (
    <a
      key={name}
      href={link}
      className={`main-menu-item${name === 'Home' ? ' main-menu-item_active' : ''}`}
    >
      {name}
    </a>
  ));

  return <nav className="main-menu-wrapper">{menuItems}</nav>;
};
