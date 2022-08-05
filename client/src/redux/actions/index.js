import axios from "axios";

export const GET_ALL_DOG = "GET_ALL_DOG";
export const GET_ALL_DOG_ID = "GET_ALL_DOG_ID";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_ALL_DOGS_NAME = "GET_ALL_DOGS_NAME";
export const CREATE_DOGS = "CREATE_DOGS";
export const FILTER_ALPHABETICALLY = "FILTER_ALPHABETICALLY";
export const FILTER_WEIGHT = "FILTER_WEIGHT";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FILTER_CREATE = "FILTER_CREATE";
export const GET_DOG_DELETED = "GET_ALL_DOG_DELETED";
export const EDIT_DOG = "EDIT_DOG";

export const getDog = () => {
  return (dispatch) => {
    axios.get(`/dogs`).then((result) => {
      return dispatch({
        type: GET_ALL_DOG,
        payload: result.data,
      });
    });
  };
};

export function getDogID(id) {
  try {
    return async function (dispatch) {
      const result = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: GET_ALL_DOG_ID,
        payload: result.data,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
}

// export function getSearch(name) {
//   return async function (dispatch) {
//     return await axios
//       .get(`/dogs?name=${name}`)
//       .then((result) => {
//         return dispatch({
//           type: GET_ALL_DOGS_NAME,
//           payload: result.data,
//         });
//       })
//       .catch(function (error) {
//         alert("The breed of dog you are looking for does not exist!");
//         console.log(
//           error.name +
//             "The breed of dog you are looking for does not exist!" +
//             error.message
//         );
//       });
//   };
// }
export function getSearch(payload){
  console.log("Esto es payload",payload)
  return {
    type: GET_ALL_DOGS_NAME,
    payload,
  }
}
// export function getTemperament() {
//   return async function (dispatch) {
//     const result = await axios.get(" /temperament");
//     return dispatch({
//       type: GET_TEMPERAMENT,
//       payload: result.data,
//     });
//   };
// }

export function getTemperament() {
  return function (dispatch) {
    axios
      .get("/temperament")
      .then((result) => {
        return dispatch({
          type: GET_TEMPERAMENT,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export const createDogs = ({
  name,
  alturaMin,
  alturaMax,
  pesoMin,
  pesoMax,
  añosMin,
  añosMax,
  image,
  temperament,
}) => {
  return async (dispatch) => {
    await axios.post("/dog", {
      name: name,
      altura: `${alturaMin} - ${alturaMax}`,
      peso: `${pesoMin} - ${pesoMax}`,
      añosDeVida: `${añosMin} - ${añosMax}`,
      image: image,
      nameTemp: temperament,
    });
    dispatch({
      type: CREATE_DOGS,
    });
  };
};

export function getDogDeleted(id) {
  return function (dispatch) {
    axios
      .delete(`/dogs/${id}`)
      .then((result) => {
        return dispatch({
          type: GET_DOG_DELETED,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function editDog(id, { name }) {
  return function (dispatch) {
    axios
      .put(`/dogs/${id}`, {
        name: name,
      })
      .then((result) => {
        return dispatch({
          type: EDIT_DOG,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function filterAlphabetically(payload) {
  return {
    type: "FILTER_ALPHABETICALLY",
    payload,
  };
}

export function filterWeight(payload) {
  return {
    type: "FILTER_WEIGHT",
    payload,
  };
}

export function filterTemperament(payload) {
  return {
    type: "FILTER_TEMPERAMENT",
    payload,
  };
}

export function filterCreate(payload) {
  return {
    type: "FILTER_CREATE",
    payload,
  };
}
