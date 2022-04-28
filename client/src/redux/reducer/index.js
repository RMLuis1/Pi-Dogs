
import { GET_ALL_DOG } from "../actions"

const initialState={
    dogs:[],
}

export default function Reducer(state= initialState, action){
switch (action.type) {
    case GET_ALL_DOG:
        return{
            ...state,
            Dogs: action.payload
        }
        
        

    default:
        
}



}


