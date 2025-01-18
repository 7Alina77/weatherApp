import PropTypes from 'prop-types';

function Weather({ weatherData }) {
  const weatherIcon = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  if (!weatherData) {
    return <p className='text-center font-serif text-xl'>Нет данных о погоде.</p>;
  }

  return (
    <div className='mt-4 font-serif flex flex-col justify-center items-center space-y-2'>
      <h1 className='text-xl'>Погода в вашем регионе: {weatherData.name}</h1>
      <p>Температура: {weatherData.main.temp}°C</p>
      <p>Описание: {weatherData.weather[0].description}</p>
      <img src={iconUrl} alt={weatherData.weather[0].description} className="w-20 h-20" />
    </div>
  )
}

Weather.propTypes = {
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Weather;