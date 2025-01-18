import { fetchWeatherByCity, fetchWeatherByLocation, getUserLocation, initialState } from "../../utils/common";
import { useEffect, useReducer } from "react";
import Header from "../molecules/Header";
import stateReducer from "../../utils/stateReduser";
import Main from "./Main";

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    storedCities.forEach(city => {
      dispatch({ type: "SAVE_CITY", payload: city });
    });

    const storedCity = localStorage.getItem("currentCity");
    if (storedCity) {
      dispatch({ type: "SET_ACTIVE_CITY", payload: storedCity });
      getWeatherByCitySearch(storedCity);
    } else {
      getWeatherByUserLocation(); 
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(state.savedCities));
  }, [state.savedCities]);

  async function getWeatherByUserLocation() {
    dispatch({ type: "LOADING" });
    try {
      const { latitude, longitude } = await getUserLocation();
      const data = await fetchWeatherByLocation(latitude, longitude);
      dispatch({ type: "SET_WEATHER", payload: data });
      dispatch({ type: "SAVE_CITY", payload: data.name });
      dispatch({ type: "SET_ACTIVE_CITY", payload: data.name });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "LOADING_COMPLETE" }); 
    }
  }

  async function getWeatherByCitySearch(city) {
    dispatch({ type: "LOADING" });
    try {
      const data = await fetchWeatherByCity(city);
      dispatch({ type: "SET_WEATHER", payload: data });
      dispatch({ type: "SAVE_CITY", payload: data.name });
      dispatch({ type: "SET_ACTIVE_CITY", payload: data.name });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "LOADING_COMPLETE" }); 
    }
  }

  const removeCity = (city) => {
    dispatch({ type: "DELETE_CITY", payload: city });
  }

  const handleCityClick = (city) => {
    dispatch({ type: "SET_ACTIVE_CITY", payload: city });
    getWeatherByCitySearch(city); 
  };

  return (
    <div className="font-serif">
      <Header />
      <Main state={state} 
        onSearch={getWeatherByCitySearch}
        removeCity={removeCity}
        onCityClick={handleCityClick}
      />
    </div>
  );
}

export default App;
