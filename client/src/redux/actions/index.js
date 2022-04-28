import axios from "axios";

export const    GET_ALL_DOG= "GET_ALL_DOG"


export const getDog= ()=>{
    return(dispatch)=>{
        axios.get(`http://localhost:3001/dogs`).then((result)=>{
            return dispatch({
                type: GET_ALL_DOG,
                payload: result.data,
            })
        })
    }
}




