import PropTypes from 'prop-types';

function SavedCities({ cities, onRemove, onCityClick, activeCity }) {
  
  return (
    <div className='mt-4 font-serif text-left space-y-2'>
      <h3 className='text-xl'>Сохранённые города:</h3>
      <ul className='flex flex-col justify-center items-start space-y-2'>
        {cities.map((city, index) => (
          <li key={index} className='flex'>
            <span
              className={`pr-2 cursor-pointer transition-all duration-300 ${
              city === activeCity ? "text-blue-500 transform scale-105" : "text-black-500"}`}
              onClick={() => onCityClick(city)} 
            >{city}</span>
            <button onClick={() => onRemove(city)} className="p-0 bg-transparent border-0">
              <img src='/images/delete.png' alt="Удалить" className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

SavedCities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired, 
  onRemove: PropTypes.func.isRequired, 
  onCityClick: PropTypes.func.isRequired, 
  activeCity: PropTypes.string,
};

export default SavedCities;