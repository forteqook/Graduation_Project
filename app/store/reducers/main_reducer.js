import {
    UPDATE_USERBIKESLIST,
    UPDATE_BRANDBIKESLIST,
    UPDATE_BABILKEYSLIST,
    GET_VEHICLES,
    GET_BRANDS,
    CHECK_PRODUCTEXISTS
} from "../types";

const INITIAL_STATE = {
    userBikesList: [],
    brandBikesList: [],
    brandsList: [],
    babilKeysList: []   //{brand, modelName, deviceIndex, deviceUid, deviceName, babilKeyId, userBikeIndex}
}

export default function (state=INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_USERBIKESLIST:
            return {
                ...state,
                userBikesList: action.payload || false
            }
        case UPDATE_BABILKEYSLIST:
            return {
                ...state,
                babilKeysList: action.payload || false
            }
        case GET_BRANDS:
            return {
                ...state,
                brandsList: action.payload || false
            }
        case UPDATE_BRANDBIKESLIST:
            return {
                ...state,
                brandBikesList: action.payload || false
            }
        case CHECK_PRODUCTEXISTS:
            return state
        default:
            return state
    }
}