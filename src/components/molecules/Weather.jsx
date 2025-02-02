import PropTypes from 'prop-types';

function Weather({ weatherData, selectedOptions }) {

  const getSelectedData = () => {
    const selectedData = {};
    
    if (selectedOptions?.sunrise && weatherData?.sys?.sunrise) {
      selectedData.sunrise = `Восход: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}`;
    }
    if (selectedOptions?.sunset && weatherData?.sys?.sunset) {
      selectedData.sunset = `Закат: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}`;
    }
    if (selectedOptions?.humidity && weatherData.main?.humidity) {
      selectedData.humidity = `Влажность: ${weatherData.main.humidity}%`;
    }
    if (selectedOptions?.feels_like && weatherData.main?.feels_like) {
      selectedData.feels_like = `Ощущается как: ${weatherData.main.feels_like}°C`;
    }
    if (selectedOptions?.wind && weatherData.wind) {
      selectedData.wind_speed = `Скорость ветра: ${weatherData.wind.speed} м/с`;
    }
    
    return selectedData;
  };

  const selectedData = getSelectedData();

  const weatherIcon = weatherData?.weather?.[0]?.icon;
  const iconUrl = weatherIcon ? `http://openweathermap.org/img/wn/${weatherIcon}@2x.png` : '';

  
  if (!weatherData) {
    return <p className='text-center font-serif text-xl'>Нет данных о погоде.</p>;
  }

  return (
    <div className='order-1 md:order-2 mt-4 mx-2 font-serif flex flex-col justify-center items-center space-y-2'>
      <h1 className='text-xl'>Погода в регионе: {weatherData.name}</h1>
      <p>Температура: {weatherData.main.temp}°C</p>
      <p>Давление: {(weatherData.main.pressure * 0.750062).toFixed(2)} мм рт. ст.</p>
      <p>Описание: {weatherData.weather[0].description}</p>
      <img src={iconUrl} alt={weatherData.weather[0].description} className="w-20 h-20" />
      {Object.entries(selectedData).map(([key, value]) => (
        <p key={key} className='opacity-0 animate-fade-in '>{value}</p>
      ))}
    </div>
  )
}

Weather.propTypes = {
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number,
      feels_like: PropTypes.number,
      pressure: PropTypes.number.isRequired
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    name: PropTypes.string.isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number
    }),
    sys: PropTypes.shape({
      sunrise: PropTypes.number.isRequired,
      sunset: PropTypes.number.isRequired,
    }).isRequired,
  }),
  selectedOptions: PropTypes.object,
};

export default Weather;