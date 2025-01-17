import { fetchWeatherByCity, fetchWeatherByLocation, getUserLocation } from "../../utils/common";
import { useEffect, useState } from "react";
import Loader from "../atoms/Loader";
import Weather from "../molecules/Weather";
import Search from '../molecules/Search';
import Header from "../molecules/Header";
 
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getWeatherByUserLocation() {
    try {
      const { latitude, longitude } = await getUserLocation();
      console.log("Координаты пользователя:", { latitude, longitude });

      // Запрос данных о погоде
      const data = await fetchWeatherByLocation(latitude, longitude);
      setWeatherData(data);
      console.log("Данные о погоде:", data);
    } catch (err) {
      console.error("Ошибка:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getWeatherByUserLocation();
  }, []);

  // Функция для поиска города
  async function getWeatherByCitySearch(city) {
    setLoading(true);
    setError(null); 
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   // Имитация задержки для загрузки данных
  //   setTimeout(() => setLoading(false), 3000);
  // }, []);
  
  return (
    <div className="font-serif">
      <Header />
      <Search onSearch={getWeatherByCitySearch} />
      {loading ? 
        <Loader /> 
        : 
        error ? 
        <p>{error}</p> 
        : 
        <Weather weatherData={weatherData} />
      }
    </div>
  );
}

export default App;
