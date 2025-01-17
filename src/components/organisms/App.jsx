import { fetchWeatherByCity, fetchWeatherByLocation, getUserLocation, initialState } from "../../utils/common";
import { useEffect, useReducer, useState } from "react";
import Header from "../molecules/Header";
import Main from "./Main";
import { stateReducer } from "../../utils/stateReduser";

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
    return savedOptions || { sunset: false, humidity: false, feels_like: false };
  });

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
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);
  
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

  async function handleCityClick (city) {
    dispatch({ type: "SET_ACTIVE_CITY", payload: city });
    await getWeatherByCitySearch(city);
  };

  const setActiveCity = (city) => {
    dispatch({ type: "SET_ACTIVE_CITY", payload: city });
  }

  const handleOptionToggle = (optionKey) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [optionKey]: !prev[optionKey] };
      return updatedOptions;
    });
  };

  return (
    <div className="font-serif">
      <Header />
      <Main 
        state={state} 
        onSearch={getWeatherByCitySearch}
        removeCity={removeCity}
        onCityClick={handleCityClick}
        setActiveCity={setActiveCity}
        onGeoSearch={getWeatherByUserLocation}
        onToggleOption={handleOptionToggle}
        selectedOptions={selectedOptions}
      />
    </div>
  );
}

export default App;
