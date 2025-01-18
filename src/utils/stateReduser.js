export default function stateReducer(state, action) {
  switch (action.type) {
    case "SAVE_CITY": 
    if (!state.savedCities.includes(action.payload)) {
      return { ...state, savedCities: [...state.savedCities, action.payload] };
    }
    return state;
    case "DELETE_CITY":
      return {
        ...state,
        savedCities: state.savedCities.filter((city) => city !== action.payload),
      };
    case "SET_WEATHER":
      return {
        ...state,
        weatherData: action.payload,
        loading: false,
        error: null,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOADING_COMPLETE": 
      return {
        ...state,
        loading: false,
      }
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_ACTIVE_CITY":
      localStorage.setItem("currentCity", action.payload);
      return { ...state, activeCity: action.payload };
    default:
      return state;
  }
}
