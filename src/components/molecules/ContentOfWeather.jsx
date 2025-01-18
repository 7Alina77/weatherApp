import PropTypes from 'prop-types';
import SavedCities from './SavedCities';
import Weather from './Weather';

function ContentOfWeather({ state, removeCity, onCityClick }) {
  return (
    <div className='flex justify-between max-w-screen-lg mx-auto'>
      <SavedCities cities={state.savedCities} onRemove={removeCity} onCityClick={onCityClick} activeCity={state.activeCity}/>
      <Weather weatherData={state.weatherData} />
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
};

export default ContentOfWeather;