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

        case ActionTypes.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(
                    user =>
                        user._id !== action.payload._id
                )
            };

        default:
            return state;
    }
}