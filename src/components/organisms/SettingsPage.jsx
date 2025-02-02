import PropTypes from 'prop-types';
import Loader from '../atoms/Loader';
import Error from '../atoms/Error';
import ContentOfWeather from '../molecules/ContentOfWeather';

function SettingsPage({state, removeCity, onCityClick, onToggleOption, selectedOptions}) {
  return (
    <main className='opacity-0 animate-fade-in'>
      {state.loading ? (
        <Loader />
      ) : 
      state.error ? (
        <Error error={state.error} />
      ) : 
      state.weatherData ? (
        <ContentOfWeather state={state} removeCity={removeCity} onCityClick={onCityClick} onToggleOption={onToggleOption} selectedOptions={selectedOptions}/>
      ) : 
        <Loader />}
    </main>
  )
}

SettingsPage.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    weatherData: PropTypes.object,
    activeCity: PropTypes.string,
    savedCities: PropTypes.array,
  }),
  removeCity: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired, 
  onToggleOption: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
};

export default SettingsPage;