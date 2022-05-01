import * as ActionTypes from './ActionTypes';

export const Exercises = (state = {
    errMess: null,
    exercises: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXERCISES:
            return { ...state, isLoading: false, errMess: null, exercises: action.payload };

        case ActionTypes.EXERCISES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] };

        case ActionTypes.ADD_EXERCISE:
            var exercise = action.payload;
            return { ...state, exercises: state.exercises.concat(exercise) };
        case ActionTypes.UPDATE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.map(
                    exercise =>
                    exercise._id === action.payload._id
                            ? action.payload
                            : exercise
                )
            };
        default:
            return state;
    }
}