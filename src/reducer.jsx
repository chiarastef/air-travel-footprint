export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FROM":
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          from: action.value,
        },
        isFrom: true,
        showDropdown: {
          ...state.showDropdown,
          from: true,
        },
      };
    case "SET_TO":
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          to: action.value,
        },
        isFrom: false,
        showDropdown: {
          ...state.showDropdown,
          to: true,
        },
      };
    case "SELECT_FROM_AIRPORT":
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          from: action.value,
        },
        showDropdown: {
          ...state.showDropdown,
          from: false,
        },
      };
    case "SELECT_TO_AIRPORT":
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          to: action.value,
        },
        showDropdown: {
          ...state.showDropdown,
          to: false,
        },
      };
    case "HIDE_DROPDOWN":
      return {
        ...state,
        showDropdown: {
          ...state.showDropdown,
          from: false,
          to: false,
        },
      };
    case "SET_PASSENGERS":
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          passengers: action.value,
        },
      };
    case "SET_CABIN_CLASS":
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          cabinClass: action.value,
        },
      };
    case "SEARCH_FLIGHT":
      return {
        ...state,
        airportsCodes: {
          ...state.airportsCodes,
          origin: state.searchQueries.from.slice(0, 3),
          destination: state.searchQueries.to.slice(0, 3),
        },
        searchInfo: { ...state.searchQueries },
        showResults: true,
        searchQueries: {
          from: "",
          to: "",
          passengers: "",
          cabinClass: "",
        },
      };
    case "MODIFY_SEARCH_QUERIES":
      return {
        ...state,
        showResults: false,
        searchQueries: { ...state.searchInfo },
      };
    case "HIDE_RESULTS":
      return {
        ...state,
        showResults: false,
      };
    default:
      return state;
  }
};
