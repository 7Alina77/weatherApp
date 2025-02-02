export const apiKey = import.meta.env.VITE_MY_KEY;

export const initialState = {
  weatherData: null,
  savedCities: [],
  error: null,
  loading: false,
  activeCity: null,
};

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается вашим браузером."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error); 
      }
    );
  });
}

export async function fetchWeatherByLocation(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    //console.log("Данные о погоде:", data);
    return data;
  } catch (error) {
    console.error("Ошибка при запросе погоды:", error);
    throw error;
  }
}

export async function fetchWeatherByCity(city) {
  const geoResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  
  if (!geoResponse.ok) {
    throw new Error('Ошибка при получении данных о городе');
  }

  const geoData = await geoResponse.json();
  const { lat, lon } = geoData.coord;

  // Запрос погоды по координатам
  const weatherData = await fetchWeatherByLocation(lat, lon)
  
  return weatherData;
}

export const initializeSelectedOptions = () => {
  const savedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
  return savedOptions || { sunrise: false, sunset: false, humidity: false, feels_like: false, wind: false };
};