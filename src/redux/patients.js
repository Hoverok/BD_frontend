import * as ActionTypes from './ActionTypes';

export const Patients = (state = {
        errMess: null,
        patients: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PATIENTS:
            return {...state, isLoading: false, errMess: null, patients: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, patients: []};

        case ActionTypes.ADD_PATIENT:
            var patient = action.payload;
            return {...state, patients: state.patients.concat(patient)};

        default:
            return state;
    }
}