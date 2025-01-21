import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="text-center mt-4 font-serif">
      <h2 className="text-xl font-bold">Упс, такой страницы нет &#129300;</h2>
      <Link to="/" className="inline-block mt-4 text-gray-500 transform scale-105 transition-all duration-300 hover:text-blue-500">
        Вернуться на главную
      </Link>
    </section>
  );
}

export default NotFound;