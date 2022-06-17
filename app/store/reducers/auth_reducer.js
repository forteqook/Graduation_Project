import produce from 'immer';

import {
    USER_DELETE,
    UPDATE_USER
} from '../types';

const INITIAL_STATE = {
    userCredential: {},
    user: {}
}

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_USER :
            return produce(state, draft => {
                draft.user = action.payload;
            })
        default :
            return state
    }
}