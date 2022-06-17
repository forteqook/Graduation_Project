import produce from 'immer';

import {
    ADD_BLE,
    CONNECTED_DEVICE,
    CHANGE_STATUS,
    EMPTY_BLE
} from '../types';

const INITIAL_STATE = {
    BLEList: [],
    connectedDevice: {},
    connectedDeviceServices: [],
    connectedServiceCharacteristics: [],
    selectedService: {},
    selectedCharacteristic: {},
    status: 'disconnected'
};

export default function (state=INITIAL_STATE, action) {
    switch(action.type) {
        case ADD_BLE :
            console.log('reducer add ble')
            if (state.BLEList.some(device => device.localName === action.device.localName) || action.device.name === null) {
                return state
            } else {
                return produce(state, draft => {
                    draft.BLEList.push(action.device)
                })
            }
        case CONNECTED_DEVICE :
            return produce(state, draft => {
                draft.connectedDevice = action.connectedDevice
            })
        case CHANGE_STATUS :
            return produce(state, draft => {
                draft.status = action.status
            })
        case EMPTY_BLE :
            return produce(state, draft => {
                draft.BLEList = action.payload
            })
        default:
            return state
    }
}