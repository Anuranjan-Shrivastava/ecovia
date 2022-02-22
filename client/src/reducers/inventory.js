import {
   FETCH_ALL_STORE, FETCH_STORE_DETAIL
} from '../action/actiontypes' ;

const initialInventoryState = {
    inventories : [] , 
    store : {}
};

export default function inventory(state = initialInventoryState , action){
    switch(action.type){
        case FETCH_ALL_STORE : {
          return {
              ...state , 
              inventories : action.stores
          }
        }
        case FETCH_STORE_DETAIL : {
            return {
                ...state  ,
                store : action.store
            }
        }
        default : 
           return state ;
    }
}
