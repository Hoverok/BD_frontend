import * as ActionTypes from './ActionTypes';

export const Programs = (state = {
    errMess: null,
    programs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROGRAMS:
            return { ...state, isLoading: false, errMess: null, programs: action.payload };

        case ActionTypes.PROGRAMS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, programs: [] };

        case ActionTypes.ADD_PROGRAM:
            var program = action.payload;
            return { ...state, programs: state.programs.concat(program) };

        case ActionTypes.UPDATE_PROGRAM:
            return {
                ...state,
                programs: state.programs.map(
                    program =>
                        program._id === action.payload._id
                        ? action.payload
                        : program
                )
            };

        default:
            return state;
    }
}