import {
  Platform,
  PermissionsAndroid
} from 'react-native';

import {
  ADD_BLE,
  CONNECTED_DEVICE,
  CHANGE_STATUS,
  EMPTY_BLE
} from '../types';

import Base64 from '../../utils/base64';

export const addBLE = device => ({
    type: ADD_BLE,
    device,
  });
  
export const connectedDevice = (device) => ({
type: CONNECTED_DEVICE,
connectedDevice: device
});
  
export const changeStatus = (status) => ({
type: CHANGE_STATUS,
status: status
});

export const scan = (uuidList) => (dispatch, getState, DeviceManager) => {
  return DeviceManager.startDeviceScan(uuidList, null, (error, device) => {
    dispatch(changeStatus('Scanning'));
    if (error) {
      console.log(error)
    }
    if (device !== null) {
      dispatch(addBLE(device))
    }
  })
}

export const terminateScan = () => (dispatch, getState, DeviceManager) => DeviceManager.stopDeviceScan()  

const checkPermission = () => {
  return new Promise((resolve, reject) => {
    Platform.OS === 'ios' ?
      resolve()
    :
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(() => resolve())
      .catch(() => reject())
  })
}

export const startScan = (uuidList) => (dispatch, getState, DeviceManager) => {
  const subscription = DeviceManager.onStateChange((state) => {
    console.log("start Scanning");
    if (state === 'PoweredOn') {
        console.log("powered on");
        subscription.remove();
    }
    }, true);

    checkPermission()
    .then(() => dispatch(scan(uuidList)))
}

export const emptyBLEList = () => (dispatch, getState, DeviceManager) => {
  DeviceManager.stopDeviceScan()
  return dispatch ({
    type: EMPTY_BLE,
    payload: []
  })
}

export const connectDevice = (device) => (dispatch, getState, DeviceManager) => {
  return new Promise((resolve, reject) => {
    console.log('now connecting device', device);
    dispatch(changeStatus('Connecting'))
    DeviceManager.stopDeviceScan()
    device.connect()
    .then((device) => {
      dispatch(changeStatus('Discovering'))
      let allAttributes = device.discoverAllServicesAndCharacteristics()
      dispatch(connectedDevice(device));
      return allAttributes;
    })
    .then((device) => {
      let services = device.services(device.id)
      return services
    })
    .then((services) => {
      resolve(console.log("found services : ", services))
    }, (error) => {
      reject(console.log("error!!", error))
    })
  })
}

export const stopConnection = () => (dispatch, getState, DeviceManager) => {
  const state = getState()
  return new Promise( async (resolve, reject) => {
    try {
      await state.BLE_Reducer.connectedDevice.cancelConnection()
      dispatch({type:null, payload:null})
      resolve()
    } catch (error) {
      console.log(error)
      reject()
    }
  })
}

const str2ab = (str) => {
  console.log("string to send: ", str)
  let bufView = new Uint8Array(str.length);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

export const writeCharacteristic = (text) => (dispatch, getState, DeviceManager) => {
  const state = getState();
  console.log(JSON.stringify(state.BLE_Reducer.connectedDevice));
  let buffer = str2ab(text)
  let packetsize = 20;
  let offset = 0;
  let packetlength = packetsize;
  do {
    if (offset + packetsize > buffer.length) {
      packetlength = buffer.length;
    } else {
      packetlength = offset + packetsize;
    }
    let packet = buffer.slice(offset, packetlength);
    console.log("packet: ", packet)
    let base64packet = Base64.btoa(String.fromCharCode.apply(null, packet));
    state.BLE_Reducer.connectedDevice?.writeCharacteristicWithoutResponseForService(`0000${state.BLE_Reducer.connectedDevice.name}-0000-1000-8000-00805f9b34fb`,'0000ffe1-0000-1000-8000-00805f9b34fb', base64packet)
    .catch((error)=>{console.log(state.BLE_Reducer.connectedDevice.name)});
    offset += packetsize;
  } while (offset < buffer.length)
}