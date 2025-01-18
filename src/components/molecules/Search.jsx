import PropTypes from 'prop-types';
import { useState } from 'react';

function Search({ onSearch, setActiveCity, onGeoSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedValue = inputValue?.trim();
    if (trimmedValue) {
      await onSearch(trimmedValue);
      setActiveCity(trimmedValue); 
      setInputValue(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 flex justify-center space-x-4 pb-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-md"
        placeholder="Введите город"
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
        disabled={!inputValue?.trim()}
      >
        Найти
      </button>
      <button
        type="button"
        onClick={onGeoSearch} 
        className="flex items-center justify-center bg-green-500 rounded-md p-2"
      >
        <img
          src="../../../images/geo.svg" 
          alt="Поиск по геолокации"
          className="w-6 h-6"
        />
      </button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired, 
  setActiveCity: PropTypes.func.isRequired, 
  onGeoSearch: PropTypes.func.isRequired,
};


export default Search;