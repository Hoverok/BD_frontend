import * as ActionTypes from './ActionTypes';

export const ExerciseTypes = (state = {
    errMess: null,
    exerciseTypes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXERCISETYPES:
            return { ...state, isLoading: false, errMess: null, exerciseTypes: action.payload };

        case ActionTypes.EXERCISETYPES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, exerciseTypes: [] };

        case ActionTypes.ADD_EXERCISETYPE:
            var exerciseType = action.payload;
            return { ...state, exerciseTypes: state.exerciseTypes.concat(exerciseType) };
        case ActionTypes.UPDATE_EXERCISETYPE:
            return {
                ...state,
                exerciseTypes: state.exerciseTypes.map(
                    exerciseType =>
                        exerciseType._id === action.payload._id
                            ? action.payload
                            : exerciseType
                )
            };
        case ActionTypes.REMOVE_EXERCISETYPE:
            return {
                ...state,
                exerciseTypes: state.exerciseTypes.filter(
                    exerciseType =>
                        exerciseType._id !== action.payload._id
                )
            };
        default:
            return state;
    }
}