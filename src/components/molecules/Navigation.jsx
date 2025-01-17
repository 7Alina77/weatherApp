import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="text-base p-6">
      <ul className="flex flex-row space-x-6 justify-center items-center mx-auto w-1/3">
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
            to="/5days" 
            className={`${
              location.pathname === '/5days' ? 'text-blue-500 transform scale-105' : 'text-gray-500'
            } transition-all duration-300`}
          >
            5 дней
          </Link>
        </li>
        <li>
          <Link 
            to="/3hours" 
            className={`${
              location.pathname === '/3hours' ? 'text-blue-500 transform scale-105' : 'text-gray-500'
            } transition-all duration-300`}
          >
            3 часа
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;