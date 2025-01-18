import Loader from "../atoms/Loader";
import ContentOfWeather from "../molecules/ContentOfWeather";
import Search from "../molecules/Search";
import Error from "../atoms/Error";
import PropTypes from 'prop-types';

function Main({state, onSearch, removeCity, onCityClick, setActiveCity, onGeoSearch, onToggleOption, selectedOptions}) {
  return (
    <main>
      <Search onSearch={onSearch} setActiveCity={setActiveCity} onGeoSearch={onGeoSearch}/>
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

Main.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    weatherData: PropTypes.object,
    activeCity: PropTypes.string,
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
  removeCity: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired, 
  setActiveCity: PropTypes.func.isRequired,
  onGeoSearch: PropTypes.func.isRequired,
  onToggleOption: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
};

export default Main;