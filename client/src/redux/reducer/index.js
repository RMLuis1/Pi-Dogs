import {
  GET_ALL_DOG,
  GET_ALL_DOG_ID,
  GET_ALL_DOGS_NAME,
  GET_TEMPERAMENT,
  CREATE_DOGS,
  ADD_TEMPERAMENTBYDOGS,
} from "../actions";

const initialState = {
  dogs: [],
  dogs2: [],
  detallDog: [],
  temperaments: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOG:
      return {
        ...state,
        dogs: action.payload,
        dogs2: action.payload,
      };
    case GET_ALL_DOG_ID:
      return {
        ...state,
        detallDog: action.payload,
      };
    case GET_ALL_DOGS_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };
    case CREATE_DOGS:
      return {
        ...state,
      };
    case ADD_TEMPERAMENTBYDOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    default:
      return state;
  }
}
