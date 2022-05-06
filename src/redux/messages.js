import * as ActionTypes from './ActionTypes';

export const Messages = (state = {
    errMess: null,
    messages: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGES:
            return { ...state, isLoading: false, errMess: null, messages: action.payload };

        case ActionTypes.MESSAGES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, messages: [] };

        case ActionTypes.ADD_MESSAGE:
            var message = action.payload;
            return { ...state, messages: state.messages.concat(message) };
        case ActionTypes.UPDATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(
                    message =>
                        message._id === action.payload._id
                            ? action.payload
                            : message
                )
            };
        case ActionTypes.REMOVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(
                    message =>
                        message._id !== action.payload._id
                )
            };
        default:
            return state;
    }
}