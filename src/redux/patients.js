import * as ActionTypes from './ActionTypes';

export const Patients = (state = {
    errMess: null,
    patients: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PATIENTS:
            return { ...state, isLoading: false, errMess: null, patients: action.payload };

        case ActionTypes.PATIENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, patients: [] };

        case ActionTypes.ADD_PATIENT:
            var patient = action.payload;
            return { ...state, patients: state.patients.concat(patient) };
        case ActionTypes.UPDATE_PATIENT:
            return {
                ...state,
                patients: state.patients.map(
                    patient =>
                        patient._id === action.payload._id
                            ? action.payload
                            : patient
                )
            };
        case ActionTypes.REMOVE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(
                    patient =>
                        patient._id !== action.payload._id
                )
            };
        default:
            return state;
    }
}