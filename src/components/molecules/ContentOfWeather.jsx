import PropTypes from 'prop-types';
import SavedCities from './SavedCities';
import Weather from './Weather';
import WeatherOptions from './WeatherOptions';
import { useLocation } from 'react-router-dom';

function ContentOfWeather({ state, removeCity, onCityClick, onToggleOption, selectedOptions={} }) {
  const location = useLocation();

  return (
    <>
    {location.pathname === '/' ? (
      <>
        <div className='opacity-0 animate-fade-in p-3 flex flex-col items-center md:flex-row md:items-baseline justify-between max-w-screen-lg mx-auto'>
          <SavedCities cities={state.savedCities} onRemove={removeCity} onCityClick={onCityClick} activeCity={state.activeCity}/>
          <Weather weatherData={state.weatherData} selectedOptions={selectedOptions}/>
          <WeatherOptions onToggleOption={onToggleOption} selectedOptions={selectedOptions} />
        </div>
      </>
    ) : (
        <div className='opacity-0 animate-fade-in p-3 flex flex-col items-center md:flex-row md:items-baseline align-baseline justify-evenly max-w-screen-lg mx-auto'>
          <Weather weatherData={state.weatherData} selectedOptions={selectedOptions}/>
          <WeatherOptions onToggleOption={onToggleOption} selectedOptions={selectedOptions} />
        </div>
    )}
  </>
  )
}

ContentOfWeather.propTypes = {
  state: PropTypes.shape({
    savedCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    weatherData: PropTypes.object.isRequired,
    activeCity: PropTypes.string,
  }).isRequired,
  removeCity: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired, 
  onToggleOption: PropTypes.func.isRequired,  
  selectedOptions: PropTypes.object, 
};

export default ContentOfWeather;