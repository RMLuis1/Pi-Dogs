import axios from "axios";

export const GET_ALL_DOG = "GET_ALL_DOG";
export const GET_ALL_DOG_ID = "GET_ALL_DOG_ID";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const GET_ALL_DOGS_NAME = "GET_ALL_DOGS_NAME";
export const CREATE_DOGS = "CREATE_DOGS";
export const FILTER_ALPHABETICALLY = "FILTER_ALPHABETICALLY";
export const FILTER_WEIGHT = "FILTER_WEIGHT";
export const FILTER_TEMPERAMENT="FILTER_TEMPERAMENT"
export const FILTER_CREATE= "FILTER_CREATE"

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
    const result = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: GET_TEMPERAMENT,
      payload: result.data,
    });
  };
}

// export function createDogs(dogs) {
//   return async function (dispatch) {
//     return await axios
//       .post("http://localhost:3001/create", dogs)
//       .then((result) => {
//         dispatch({
//           type: CREATE_DOGS,
//           payload: result.data,
//         });
//       });
//   };
// }
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
    await axios.post("http://localhost:3001/dog", {
      name: name,
      altura: `${alturaMin} - ${alturaMax}`,
      peso: `${pesoMin} - ${pesoMax}`,
      añosDeVida: `${añosMin} - ${añosMax}`,
      image: image,
      nameTemp:temperament
    });
    dispatch({
      type: CREATE_DOGS,
    });
  };
};



export function filterAlphabetically(payload) {
  return {
    type: "FILTER_ALPHABETICALLY",
    payload,
  };
}

export function filterWeight(payload){
  return {
    type: "FILTER_WEIGHT",
    payload
  }
}

export function filterTemperament(payload){
  return {
    type: "FILTER_TEMPERAMENT",
    payload
  }
}

export function filterCreate(payload){
  return {
    type: "FILTER_CREATE",
    payload
  }
}



