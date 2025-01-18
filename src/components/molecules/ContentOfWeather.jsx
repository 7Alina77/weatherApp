import PropTypes from 'prop-types';
import SavedCities from './SavedCities';
import Weather from './Weather';
import WeatherOptions from './WeatherOptions';

function ContentOfWeather({ state, removeCity, onCityClick, onToggleOption, selectedOptions={} }) {
  return (
    <div className='flex justify-between items-baseline max-w-screen-lg mx-auto'>
      <SavedCities cities={state.savedCities} onRemove={removeCity} onCityClick={onCityClick} activeCity={state.activeCity}/>
      <Weather weatherData={state.weatherData} selectedOptions={selectedOptions}/>
      <WeatherOptions onToggleOption={onToggleOption} selectedOptions={selectedOptions} />
    </div>
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