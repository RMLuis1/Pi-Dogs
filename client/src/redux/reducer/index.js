import { GET_ALL_DOG, GET_ALL_DOG_ID, GET_ALL_DOGS_NAME } from "../actions";

const initialState = {
  dogs: [],
  dogs2: [],
  detallDog: [],
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
      }

    default:
      return state;
  }
}
