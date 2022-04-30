import axios from "axios";

export const GET_ALL_DOG = "GET_ALL_DOG";
export const GET_ALL_DOG_ID = "GET_ALL_DOG_ID";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_ALL_DOGS_NAME = "GET_ALL_DOGS_NAME";
export const CREATE_DOGS = "CREATE_DOGS";
export const ADD_TEMPERAMENTBYDOGS = "ADD_TEMPERAMENTBYDOGS";

export const getDog = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3001/dogs`).then((result) => {
      return dispatch({
        type: GET_ALL_DOG,
        payload: result.data,
      });
    });
  };
};

// export function getDog(){
// return async function (dispatch){
// const result= await axios.get(`http://localhost:3001/dogs`)
//     return dispatch({
//         type: GET_ALL_DOG,
//         payload: result.data
//     })
// }
// }

export function getDogID(id) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((result) => {
        return dispatch({
          type: GET_ALL_DOG_ID,
          payload: result.data,
        });
      });
  };
}

export function getSearch(name) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/dogs?name=${name}`)
      .then((result) => {
        return dispatch({
          type: GET_ALL_DOGS_NAME,
          payload: result.data,
        });
      })
      .catch(function (error) {
        alert("The breed of dog you are looking for does not exist!");
        console.log(
          error.name +
            "The breed of dog you are looking for does not exist!" +
            error.message
        );
      });
  };
}

export function getTemperament() {
  return async function (dispatch) {
    const temperaments = await axios.get("http://localhost:3000/temperament");
    return dispatch({
      type: GET_TEMPERAMENT,
      payload: temperaments.data,
    });
  };
}

export function createDogs(dogs) {
  return async function (dispatch) {
    return await axios
      .post("http://localhost:3001/create", dogs)
      .then((result) => {
        dispatch({
          type: CREATE_DOGS,
          payload: result.data,
        });
      });
  };
}

export function AddTemperamentByDogs(payload) {
  return {
    type: ADD_TEMPERAMENTBYDOGS,
    payload,
  };
}
