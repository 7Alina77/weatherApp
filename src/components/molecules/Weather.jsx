import PropTypes from 'prop-types';

function Weather({ weatherData, selectedOptions }) {

  const getSelectedData = () => {
    const selectedData = {};
    
    if (selectedOptions?.sunset && weatherData?.sys?.sunset) {
      selectedData.sunset = weatherData.sys.sunset;
    }
    if (selectedOptions?.humidity && weatherData.main?.humidity) {
      selectedData.humidity = weatherData.main.humidity;
    }
    if (selectedOptions?.feels_like && weatherData.main?.feels_like) {
      selectedData.feels_like = weatherData.main.feels_like;
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
      <p>Описание: {weatherData.weather[0].description}</p>
      <img src={iconUrl} alt={weatherData.weather[0].description} className="w-20 h-20" />
      {selectedData.sunset && <p>Время заката: {new Date(selectedData.sunset * 1000).toLocaleTimeString()}</p>}
      {selectedData.humidity && <p>Влажность: {selectedData.humidity}%</p>}
      {selectedData.feels_like && <p>Ощущается как: {selectedData.feels_like}°C</p>}
    </div>
  )
}

Weather.propTypes = {
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number,
      feels_like: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    name: PropTypes.string.isRequired,
    sys: PropTypes.shape({
      sunset: PropTypes.number.isRequired,
    }).isRequired,
  }),
  selectedOptions: PropTypes.object,
};

export default Weather;