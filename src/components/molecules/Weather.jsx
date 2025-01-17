import PropTypes from 'prop-types';

function Weather({ weatherData }) {
  const weatherIcon = weatherData.weather[0].icon;

  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div className='font-serif'>
      <h1>Погода в вашем регионе: {weatherData.name}</h1>
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
    }).isRequired,
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