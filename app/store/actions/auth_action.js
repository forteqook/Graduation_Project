import {
    SIGN_IN,
    SIGN_UP,
    CREATE_USERDB,
    UPDATE_USER,
    USER_DELETE
} from '../types';

import {
    //auth
    auth,
    createUserEmail,
    signInEmail,
    authDeleteUser,
    _onAuthStateChanged,
    _signOut,
    //rtdb
    db,
    dbRef,
    dbSet,
    dbPush,
    dbUpdate,
    dbGet,
    dbQuery,
    queryOrderByKey,
    queryOrderByChild,
    queryEqualTo
} from '../../utils/firebase';

export const updateUser = (user) => {
    return ({
        type: UPDATE_USER,
        payload: user
    })
}

export const autoSignIn = () => (dispatch) => {
    console.log('action: autoSignIn');
    return new Promise((resolve, reject) => {
        _onAuthStateChanged(auth, (user) => {
            console.log(user);
            dispatch(updateUser(user));
            resolve()
        }, (error) => {
            console.log('error from autoSignIn', error);
            reject();
        })
    })
}

export const signIn = (data) => (dispatch) => {
    console.log("action: signIn");
    return new Promise((resolve, reject) => {
        signInEmail(auth, data.email, data.password)
        .then((userCredential) => {
            dispatch(updateUser(userCredential.user))
            resolve()
        }).catch(() => {
            console.log('error from signIn')
            reject()
        })
    })
}

export const signUp = (data) => (dispatch) => {
    console.log("action: signUp");
    return new Promise((resolve, reject) => {
        createUserEmail(auth, data.email, data.password)
        .then((userCredential) => {
            dispatch(updateUser(userCredential.user))
            resolve()
        }).catch(() => {
            console.log('error from signUp')
            reject()
        })
    })
}

export const signOut = () => (dispatch) => {
    console.log("action: signOut");
    return new Promise( async (resolve, reject) => {
        try {
            await _signOut(auth);
            dispatch(updateUser(null))
            resolve();
        } catch (error) {
            console.log('error from signOut');
            reject();
        }
    })
}

export const createUserDB = (user) => (dispatch) => {
    console.log("action: createUserDB");
    const userData = {
        email: user.email,
        bikes: []
    }
    const databaseReference = dbRef(db, 'users/' + user.uid);
    return new Promise( async (resolve, reject) => {
        try {
            await dbSet(databaseReference, userData);
            dispatch ({
                type: null,
                payload: null
            });
            resolve();
        } catch (error) {
            console.log('write on users/${uid} failed');
            console.log(error);
            reject();
        }
    })
}

// export const reauthUserCredential = (user, authCredential) => (dispatch) => {
//     return new Promise( async (resolve, reject) => {
//         try {
//             const userCredential = await authReauthCredential(user, authCredential);
//             dispatch(updateUserCredential(userCredential));
//             resolve();
//         } catch (error) {
//             console.log('error:', error);
//             reject();
//         }
//     })
// }

export const deleteUserAccount = (user, babilKeysList) => (dispatch) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log('delete user action');
            delUpdates = {};
            const userBikesRef = dbRef(db, `users/${user.uid}/bikes`);
            const userBikesSnapshot = await dbGet(userBikesRef);
            userBikesSnapshot.forEach((child) => {
                if (child.exists()) {
                    delUpdates[`babilKeys/${child.val().babilKeyId}`] = null;
                }
            })
            
            delUpdates[`users/${user.uid}`] = null;
            await dbUpdate(dbRef(db), delUpdates);
            for (babilKey of babilKeysList) {
                await dbUpdate(dbRef(db, `products/${babilKey.deviceIndex}`), { isActivated: false, connectedBabilKey: null })
            }
            await authDeleteUser(user);
            dispatch({type:null, payload:null})
            resolve();
        } catch (error) {
            // switch (error.code === 'auth/requires-recent-login') {
                
            // }
            console.log('error:',error.code);
            reject();
        }
    })
}