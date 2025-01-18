import Loader from "../atoms/Loader";
import ContentOfWeather from "../molecules/ContentOfWeather";
import Search from "../molecules/Search";
import Error from "../atoms/Error";
import PropTypes from 'prop-types';

function Main({state, onSearch, removeCity, onCityClick}) {
  return (
    <main>
      <Search onSearch={onSearch} />
      {state.loading ? (
        <Loader />
      ) : 
      state.error ? (
        <Error error={state.error} />
      ) : 
      state.weatherData ? (
        <ContentOfWeather state={state} removeCity={removeCity} onCityClick={onCityClick}/>
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
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
  removeCity: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired, 
};

export default Main;