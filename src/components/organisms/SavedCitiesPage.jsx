import PropTypes from 'prop-types';
import Search from '../molecules/Search';
import Loader from '../atoms/Loader';
import Error from '../atoms/Error';
import SavedCities from '../molecules/SavedCities';
import Weather from '../molecules/Weather';

function SavedCitiesPage({state, onSearch, removeCity, onCityClick, setActiveCity, filteredCities}) {
  return (
    <main>
      <Search onSearch={onSearch} setActiveCity={setActiveCity} savedCities={state.savedCities}/>
      {state.loading ? (
        <Loader />
      ) : 
      state.error ? (
        <Error error={state.error} />
      ) : 
      state.savedCities ? (
        filteredCities.length > 0 ? (
          <div className='flex flex-col items-center md:flex-row md:items-baseline align-baseline justify-evenly max-w-screen-lg mx-auto'>
            <SavedCities cities={filteredCities} onRemove={removeCity} onCityClick={onCityClick} activeCity={state.activeCity}/>
            <Weather weatherData={state.weatherData}/>
          </div>
        ) : (
          <h3 className='mt-4 text-xl text-center'>Таких городов вы не сохраняли &#128577;</h3>
        )
      ) : 
        <Loader />}
    </main>
  )
}

SavedCitiesPage.propTypes = {
  state: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    weatherData: PropTypes.object,
    activeCity: PropTypes.string,
    savedCities: PropTypes.array,
  }),
  onSearch: PropTypes.func.isRequired,
  removeCity: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired, 
  setActiveCity: PropTypes.func.isRequired,
  onGeoSearch: PropTypes.func.isRequired,
  filteredCities: PropTypes.array,
};

export default SavedCitiesPage;