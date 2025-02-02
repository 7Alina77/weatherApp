import PropTypes from 'prop-types';

function WeatherOptions({ onToggleOption, selectedOptions={} }) {
  const options = [
    { label: "Время восхода", key: "sunrise" },
    { label: "Время заката", key: "sunset" },
    { label: "Влажность", key: "humidity" },
    { label: "Ощущается как", key: "feels_like" },
    { label: "Скорость ветра", key: "wind" }
  ];

  return (
    <div className="space-y-2 order-2 md:order-3 mx-2">
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