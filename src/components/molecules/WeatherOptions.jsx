import PropTypes from 'prop-types';

function WeatherOptions({ onToggleOption, selectedOptions={} }) {
  const options = [
    { label: "Время заката", key: "sunset" },
    { label: "Влажность", key: "humidity" },
    { label: "Температура, которая ощущается", key: "feels_like" },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-xl mt-4">Увидеть еще данные</h3>
      <ul className="space-y-2">
        {options.map((option) => (
          <li key={option.key} className="flex items-center">
            <input
              type="checkbox"
              id={option.key}
              checked={selectedOptions[option.key]}
              onChange={() => onToggleOption(option.key)}
              className="mr-2"
            />
            <label htmlFor={option.key}>{option.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

WeatherOptions.propTypes = {
  onToggleOption: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
};

export default WeatherOptions;