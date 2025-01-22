import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Search({ onSearch, setActiveCity, onGeoSearch }) {
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if(location.pathname === '/saved') {
      onSearch(e.target.value);
    }
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

  const getPlaceholderText = () => {
    if (location.pathname === '/') {
      return 'Введите город';
    }
    if (location.pathname === '/saved') {
      return 'Поиск по сохраненным';
    }
    return 'Введите значение';
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 flex justify-center space-x-4 pb-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-md"
        placeholder={getPlaceholderText()}
      />
      {location.pathname === '/' &&
      (<>
        <button 
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
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
          src="/weatherApp/images/geo.svg" 
          alt="Поиск по геолокации"
          className="w-6 h-6"
        />
      </button>
      </>
      )
      }
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired, 
  setActiveCity: PropTypes.func.isRequired, 
  onGeoSearch: PropTypes.func,
};


export default Search;