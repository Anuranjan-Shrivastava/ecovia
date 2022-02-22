import {
    FETCH_BAG_DETAIL
} from '../action/actiontypes' ;

const initialBagState = {
    bag : null 
}

export default function bags(state = initialBagState , action){
    switch(action.type){
        case FETCH_BAG_DETAIL : {
            return {
                bag : action.bag
            }
        }
        default : 
           return state 
    }
}