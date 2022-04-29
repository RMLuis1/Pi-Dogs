import axios from "axios";

export const    GET_ALL_DOG= "GET_ALL_DOG"
export const GET_ALL_DOG_ID= "GET_ALL_DOG_ID"

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

export function getDogID(id){
 return async function(dispatch){
     return await axios.get(`http://localhost:3001/dogs/${id}`).then((result)=>{
         return dispatch({
             type: GET_ALL_DOG_ID,
             payload: result.data
         })
     })
 }


}



