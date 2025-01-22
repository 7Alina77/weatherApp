import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="text-s md:text-base p-6">
      <ul className="flex flex-row space-x-3 md:space-x-6 justify-center items-center mx-auto w-1/3">
        <li>
          <Link 
            to="/" 
            className={`${
              location.pathname === '/' ? 'text-blue-500 transform scale-105' : 'text-gray-500'
            } transition-all duration-300`}
          >
            Текущая
          </Link>
        </li>
        <li>
          <Link 
            to="/saved" 
            className={`${
              location.pathname === '/saved' ? 'text-blue-500 transform scale-105' : 'text-gray-500'
            } transition-all duration-300`}
          >
            Сохраненные города
          </Link>
        </li>
        <li>
          <Link 
            to="/settings" 
            className={`${
              location.pathname === '/settings' ? 'text-blue-500 transform scale-105' : 'text-gray-500'
            } transition-all duration-300`}
          >
            Расширенный прогноз
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;