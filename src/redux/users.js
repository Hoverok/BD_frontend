import * as ActionTypes from './ActionTypes';

export const Users = (state = {
    errMess: null,
    users: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return { ...state, isLoading: false, errMess: null, users: action.payload.reverse() };

        case ActionTypes.USERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, users: [] };

        case ActionTypes.ADD_USER:
            var user = action.payload;
            return { ...state, users: state.users.reverse().concat(user).reverse() };

        default:
            return state;
    }
}