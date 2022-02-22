import { combineReducers } from "redux";
import auth from './auth' ;
import inventory from "./inventory";
import bags from './bags' ;



const appReducer =  combineReducers({auth , inventory , bags}) ;

export default appReducer ;