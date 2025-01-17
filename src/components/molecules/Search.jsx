import { useState } from "react";
import PropTypes from 'prop-types'; // Импорт PropTypes

function Search({ onSearch }) {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city) {
      await onSearch(city); // Ждем, пока запрос будет выполнен
      setCity(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 flex justify-center space-x-4 pb-6">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-md"
        placeholder="Введите город"
      />
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">
        Найти
      </button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired, // Проверка, что onSearch — функция
};


export default Search;