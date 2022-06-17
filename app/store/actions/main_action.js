import {
    UPDATE_USERBIKESLIST,
    UPDATE_BRANDBIKESLIST,
    UPDATE_BABILKEYSLIST,
    GET_VEHICLES,
    GET_BRANDS,
    CHECK_PRODUCTEXISTS
} from "../types";

import {
    db,
    dbRef,
    dbChild,
    dbOnValue,
    dbGet,
    dbUpdate,
    dbQuery,
    queryEqualTo,
    queryOrderByChild,
    queryOrderByKey,
    queryOrderByValue,
    queryStartAt,
    queryEndAt,
    dbPush,
    dbSet
} from "../../utils/firebase";

export const update_userBikesList = (userBikesList) => ({
    type: UPDATE_USERBIKESLIST,
    payload: userBikesList
})

export const update_babilKeysList = (babilKeysList) => ({
    type: UPDATE_BABILKEYSLIST,
    payload: babilKeysList
})

export const update_brandBikesList = (brandBikesList) => ({
    type: UPDATE_BRANDBIKESLIST,
    payload: brandBikesList
})

export const setNewBabilKey = (data, userUid, bikeNickName) => (dispatch) => {
    const babilKeyData = {
        userUid: userUid,
        deviceUid: data.deviceUid,
        deviceIndex: data.deviceIndex,
        deviceName: data.deviceName,
        bikeNickName: bikeNickName,
        bike: {
            brand: data.brand,
            modelName: data.modelName
        }
    }
    return new Promise( async (resolve, reject) => {
        try {
            const babilKeysRef = await dbPush(dbRef(db, 'babilKeys/'), babilKeyData);
            console.log('babilKeysRef.key:', babilKeysRef.key);
            await dbUpdate(dbRef(db, `products/${data.deviceIndex}`), { isActivated: true, connectedBabilKey: babilKeysRef.key });
            const userBikeRef = await dbPush(dbRef(db, 'users/' + userUid + '/bikes'), { babilKeyId: babilKeysRef.key });
            console.log('userBikeRef.key:', userBikeRef.key);
            await dbUpdate(dbRef(db, `babilKeys/${babilKeysRef.key}`), { 'userBikeIndex': userBikeRef.key })
            dispatch({type: null, payload: null})
            resolve()
        } catch (error) {
            console.log('error: ', error);
            reject();
        }
    })
}

export const deleteBabilKey = (userUid, babilKey) => (dispatch) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log('userUid: ', userUid);
            console.log('babilKey: ', babilKey);
            updates = {};
            updates[`babilKeys/${babilKey.babilKeyId}`] = null;
            updates[`users/${userUid}/bikes/${babilKey.userBikeIndex}`] = null;
            await dbUpdate(dbRef(db), updates);
            await dbUpdate(dbRef(db, `products/${babilKey.deviceIndex}`), { isActivated: false, connectedBabilKey: null });
            dispatch({type: null, payload: null});
            resolve();
        } catch (error) {
            console.log('error: ', error);
            reject();
        }
    })
}

export const getBabilKeys = (userUid) => (dispatch, getState) => {
    console.log('getBabilKeys Action');
    const babilKeysList = [];
    return new Promise( async (resolve, reject) => {
        try {
            const userBikesRef = dbRef(db, `users/${userUid}/bikes`);
            const userBikesSnapshot = await dbGet(userBikesRef);
            const childList = [];
            userBikesSnapshot.forEach((child) => {
                if (child.exists()) {
                    childList.push(child.val().babilKeyId);
                }
            })
            const babilKeysRef = dbRef(db, 'babilKeys/');
            const babilKeysSanpshot = await dbGet(babilKeysRef, queryOrderByKey(), queryStartAt(childList[0]), queryEndAt(childList[childList.length-1]));
            babilKeysSanpshot.forEach((child) => {
                if (child.exists()) {
                    if (childList.includes(child.key)) {
                        const babilKey = child.val()
                        babilKeysList.push({ ...babilKey.bike, ...babilKey, babilKeyId: child.key })
                    }
                }
            })
            dispatch(update_babilKeysList(babilKeysList));
            resolve();
        } catch (error) {
            console.log(error);
            reject();
        }
    })
}

export const checkProductExists = (deviceUid) => (dispatch) => {
    const productsRef = dbRef(db, 'products');
    return new Promise( async (resolve, reject) => {
        try {
            const deviceUidQuery = dbQuery(productsRef, queryOrderByChild('uid'), queryEqualTo(deviceUid));
            const snapshot = await dbGet(deviceUidQuery);
            snapshot.forEach((child) => {
                if (child.exists()) {
                    if (!child.val().isActivated) {
                        console.log(child.val().uid, 'exists')
                        dispatch({type: null, payload: null})
                        resolve({ productIndex: child.key, productName: child.val().name })
                    } else {
                        alert('이미 등록된 uid 입니다.')
                        reject()
                    }
                } else {
                    console.log('null data');
                }
            })
        } catch (error) {
            alert('존재하지 않는 uid 입니다.');
            console.log('error:', error);
            reject()
        }
    })
}

export const getBikes = (selectedBrand) => async (dispatch) => {
    const bikesList = [];
    const bikesRef = dbRef(db, 'bikes');
    try {
        const snapshot = await dbGet(dbQuery(bikesRef, queryOrderByChild('brand'), queryEqualTo(selectedBrand)));
        snapshot.forEach((child) => {
            if (child.exists()) {
                bikesList.push(child.val());
            }
            else {
                console.log("null data")
            }
        })
        console.log("bikesList length", bikesList.length);
        dispatch(update_brandBikesList(bikesList));
    } catch (error) {
        console.log('error:', error)
    }
}

//오토바이 브랜드는 쉽게 삭제 및 업데이트가 가능한 데이터가 아님
export const getBrands = () => (dispatch) => {
    const brandsSet = new Set();
    const bikesRef = dbRef(db, 'bikes');
    dbGet(bikesRef).then((snapshot) => {
        console.log('bikes list length: ', snapshot.size)
        snapshot.forEach((child) => {
            if (child.exists()) {
                brandsSet.add(child.val().brand)
            }
            else {
                console.log("null data")
            }
        })
        const brands = [...brandsSet];
        console.log("brands loaded", brands)
        dispatch({type: GET_BRANDS, payload: brands})
    }, (error) => {
        console.log(error)
    })
}