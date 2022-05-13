import {
  GET_ALL_DOG,
  GET_ALL_DOG_ID,
  GET_ALL_DOGS_NAME,
  GET_TEMPERAMENT,
  CREATE_DOGS,
  FILTER_ALPHABETICALLY,
  FILTER_WEIGHT,
  FILTER_TEMPERAMENT,
  FILTER_CREATE,
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

    case FILTER_ALPHABETICALLY:
      if(action.payload === "All"){
        return{
          ...state,
          dogs: state.dogs
        }
      }
      if (action.payload === "ascendente") {
        return {
          ...state,
          dogs: state.dogs.sort((a, b) => a.name.localeCompare(b.name)),
        
        };
      } else if (action.payload === "descendente") {
        return {
          ...state,
          dogs: state.dogs.sort((a, b) => b.name.localeCompare(a.name)),
        };
      } else {
        return {
          ...state,
          dogs: state.dogs,
        };
      }
    case FILTER_WEIGHT:
      if (action.payload === "ascendente") {
        return {
          ...state,
          dogs2: state.dogs.sort(function (a, b) {
                       if (Number(a.peso.split("-")[0]) > Number(b.peso.split("-")[0])) {
              return -1;
            }
            if (Number(b.peso.split("-")[0]) > Number(a.peso.split("-")[0])) {
              return 1;
            }
            return 0;
          }),
        };
      } else if (action.payload === "descendente") {
        const descendent = state.dogs.sort(function (a, b) {
          if (Number(a.peso.split("-")[0]) > Number(b.peso.split("-")[0])) {
            return 1;
          }
          if (Number(b.peso.split("-")[0]) > Number(a.peso.split("-"[0]))) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          dogs: descendent,
        };
      } else {
        return {
          ...state,
          dogs: state.dogs,
        };
      }
    case FILTER_TEMPERAMENT:
      const filterTemper = state.dogs2;
      const temperam =
        action.payload === "All"
          ? filterTemper
          : filterTemper
              .filter(
                (e) =>
                 
                  e.temperamentos
                    ? e.temperamentos
                        .map((e) => e.name)
                        .includes(action.payload)
                    : "",
                console.log("ES LO QUE LLEGA DE PAYOAD", action.payload)
              )
              .concat(
                filterTemper.filter((e) =>
                  e.temperament?.includes(action.payload)
                )
              );
      console.log("ESTO ES EL FILTER: ", temperam);
      return {
        ...state,
        dogs: temperam,
      };

    case FILTER_CREATE:
      let db = state.dogs2;
      let filter =
        action.payload === "Created"
          ? db.filter((e) => !Number(e.id))
          : db.filter((e) => Number(e.id));
      return {
        ...state,
        dogs: action.payload === "All" ? state.dogs2 : filter,
      };

    default:
      return state;
  }
}
