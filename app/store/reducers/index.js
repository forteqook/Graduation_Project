import { combineReducers } from "redux";

import Auth_Reducer from './auth_reducer';
import Main_Reducer from "./main_reducer";
import BLE_Reducer from './ble_reducer';

const rootReducer = combineReducers({
    Auth_Reducer,
    Main_Reducer,
    BLE_Reducer
});

export default rootReducer;