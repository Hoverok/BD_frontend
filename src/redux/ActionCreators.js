import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//action objects (consisting of type and payload) are created here and dispatches it to the store (through reducers)
//reducers take action as one of the parameters, the current state of the application as another parameter and generates(returns) the next state
//these actions supply information to reducers

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const removeUser = (user) => ({
    type: ActionTypes.REMOVE_USER,
    payload: user
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const fetchUsers = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
}

export const postUser = (username, password, stampNr, fullName, email) => (dispatch) => {

    const newUser = {
        username: username,
        password: password,
        stampNr: stampNr,
        fullName: fullName,
        email: email,

    }
    console.log('User ', newUser);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addUser(response.reUser)))
        .catch(error => {
            console.log('Post users ', error.message);
            alert('User could not be posted\nError: ' + error.message);
        })
}
export const deleteUser = (userId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/' + userId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('User Deleted', response); dispatch(removeUser(response)); }) //this doesnt get called
        .catch(error => dispatch(usersFailed(error.message)));
};


export const addProgram = (program) => ({
    type: ActionTypes.ADD_PROGRAM,
    payload: program
});

export const updateProgram = (program) => ({
    type: ActionTypes.UPDATE_PROGRAM,
    payload: program
});

export const removeProgram = (program) => ({
    type: ActionTypes.REMOVE_PROGRAM,
    payload: program
});

export const addPrograms = (programs) => ({
    type: ActionTypes.ADD_PROGRAMS,
    payload: programs
});

export const programsFailed = (errmess) => ({
    type: ActionTypes.PROGRAMS_FAILED,
    payload: errmess
});


export const fetchPrograms = () => (dispatch) => {
    return fetch(baseUrl + 'programs')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(programs => dispatch(addPrograms(programs)))
        .catch(error => dispatch(programsFailed(error.message)));
}

export const postProgram = (description, duration, patientId, startDate, endDate, programCode) => (dispatch) => {

    const newProgram = {
        description: description,
        duration: duration,
        patient: patientId,
        startDate: startDate,
        endDate: endDate,
        programCode: programCode
    }
    console.log('Date ' + startDate);
    console.log('Program ', newProgram);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'programs', {
        method: 'POST',
        body: JSON.stringify(newProgram),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addProgram(response)))
        .catch(error => {
            console.log('Post program ', error.message);
            alert('Programos registracija nepavyko\nError: ' + error.message);
        })
}

export const putProgram = (programId, description, duration, requirements, patientId, doctorId, startDate, endDate) => (dispatch) => {
    const updatedProgram = {
        programId: programId,
        description: description,
        duration: duration,
        requirements: requirements,
        patient: patientId,
        author: doctorId,
        startDate: startDate,
        endDate: endDate
    };
    //console.log('Program ', updatedProgram);
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'programs/' + programId, {
        method: "PUT",
        body: JSON.stringify(updatedProgram),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(updateProgram(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('error from putProgram')
            // + 'nError: ' + error.message);
        });
};

export const deleteProgram = (programId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'programs/' + programId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Program Deleted', response); dispatch(removeProgram(response)); }) //this doesnt get called
        .catch(error => dispatch(programsFailed(error.message)));
};


export const addExercise = (exercise) => ({
    type: ActionTypes.ADD_EXERCISE,
    payload: exercise
});

export const updateExercise = (exercise) => ({
    type: ActionTypes.UPDATE_EXERCISE,
    payload: exercise
});
export const removeExercise = (exercise) => ({
    type: ActionTypes.REMOVE_EXERCISE,
    payload: exercise
});

export const addExercises = (exercises) => ({
    type: ActionTypes.ADD_EXERCISES,
    payload: exercises
});

export const exercisesFailed = (errmess) => ({
    type: ActionTypes.EXERCISES_FAILED,
    payload: errmess
});

export const fetchExercises = () => (dispatch) => {
    return fetch(baseUrl + 'exercises')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(exercises => dispatch(addExercises(exercises)))
        .catch(error => dispatch(exercisesFailed(error.message)));
}

export const postExercise = (programId, exerciseTypeId, instuructions, sets, reps, restBreak) => (dispatch) => {

    const newExercise = {
        program: programId,
        exerciseType: exerciseTypeId,
        instuructions: instuructions,
        sets: sets,
        reps: reps,
        restBreak: restBreak
    }
    console.log('Exercise ', newExercise);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'exercises', {
        method: 'POST',
        body: JSON.stringify(newExercise),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addExercise(response)))
        .catch(error => {
            console.log('Post exercises ', error.message);
            alert('Your exercise could not be posted\nError: ' + error.message);
        })
}

export const putExercise = (exerciseId, exerciseTypeId, instuructions, sets, reps, restBreak) => (dispatch) => {
    const updatedExercise = {
        exerciseId: exerciseId,
        exerciseType: exerciseTypeId,
        instuructions: instuructions,
        sets: sets,
        reps: reps,
        restBreak: restBreak
    };
    //console.log('Exercise ', updatedExercise);
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'exercises/' + exerciseId, {
        method: "PUT",
        body: JSON.stringify(updatedExercise),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(updateExercise(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('error')
            // + 'nError: ' + error.message);
        });
};

export const deleteExercise = (exerciseId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'exercises/' + exerciseId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Exercise Deleted', response); dispatch(removeExercise(response)); }) //this doesnt get called
        .catch(error => dispatch(exercisesFailed(error.message)));
};

export const addPatient = (patient) => ({
    type: ActionTypes.ADD_PATIENT,
    payload: patient
});

export const updatePatient = (patient) => ({
    type: ActionTypes.UPDATE_PATIENT,
    payload: patient
});
export const removePatient = (patient) => ({
    type: ActionTypes.REMOVE_PATIENT,
    payload: patient
});

export const addPatients = (patients) => ({
    type: ActionTypes.ADD_PATIENTS,
    payload: patients
});

export const patientsFailed = (errmess) => ({
    type: ActionTypes.PATIENTS_FAILED,
    payload: errmess
});

export const fetchPatients = () => (dispatch) => {
    return fetch(baseUrl + 'patients')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(patients => dispatch(addPatients(patients)))
        .catch(error => dispatch(patientsFailed(error.message)));
}

export const postPatient = (fullName, personalCode, address, telNum, email) => (dispatch) => {

    const newPatient = {
        fullName: fullName,
        personalCode: personalCode,
        address: address,
        telNum: telNum,
        email: email,

    }
    console.log('Patient ', newPatient);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'patients', {
        method: 'POST',
        body: JSON.stringify(newPatient),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addPatient(response)))
        .catch(error => {
            console.log('Post patients ', error.message);
            alert('Patient could not be posted\nError: ' + error.message);
        })
}

export const putPatient = (patientId, fullName, personalCode, address, telNum, email) => (dispatch) => {
    const updatedPatient = {
        fullName: fullName,
        personalCode: personalCode,
        address: address,
        telNum: telNum,
        email: email
    };
    //console.log('Patient ', updatedPatient);
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'patients/' + patientId, {
        method: "PUT",
        body: JSON.stringify(updatedPatient),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(updatePatient(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('error')
            // + 'nError: ' + error.message);
        });
};

export const deletePatient = (patientId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'patients/' + patientId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Patient Deleted', response); dispatch(removePatient(response)); }) //this doesnt get called
        .catch(error => dispatch(patientsFailed(error.message)));
};


export const addExerciseType = (exerciseType) => ({
    type: ActionTypes.ADD_EXERCISETYPE,
    payload: exerciseType
});

export const updateExerciseType = (exerciseType) => ({
    type: ActionTypes.UPDATE_EXERCISETYPE,
    payload: exerciseType
});
export const removeExerciseType = (exerciseType) => ({
    type: ActionTypes.REMOVE_EXERCISETYPE,
    payload: exerciseType
});

export const addExerciseTypes = (exerciseTypes) => ({
    type: ActionTypes.ADD_EXERCISETYPES,
    payload: exerciseTypes
});

export const exerciseTypesFailed = (errmess) => ({
    type: ActionTypes.EXERCISETYPES_FAILED,
    payload: errmess
});

export const fetchExerciseTypes = () => (dispatch) => {
    return fetch(baseUrl + 'exercisetypes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(exerciseTypes => dispatch(addExerciseTypes(exerciseTypes)))
        .catch(error => dispatch(exerciseTypesFailed(error.message)));
}

export const postExerciseType = (ytLink, bodyPart, title, intensity, inventory) => (dispatch) => {

    const newExerciseType = {
        ytLink: ytLink,
        bodyPart: bodyPart,
        title: title,
        intensity: intensity,
        inventory: inventory
    }
    console.log('ExerciseType ', newExerciseType);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'exercisetypes', {
        method: 'POST',
        body: JSON.stringify(newExerciseType),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addExerciseType(response)))
        .catch(error => {
            console.log('Post exercisetypes ', error.message);
            alert('ExerciseType could not be posted\nError: ' + error.message);
        })
}

export const putExerciseType = (exerciseTypeId, ytLink, bodyPart, title, intensity, inventory) => (dispatch) => {
    const updatedExerciseType = {
        ytLink: ytLink,
        bodyPart: bodyPart,
        title: title,
        intensity: intensity,
        inventory: inventory
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'exercisetypes/' + exerciseTypeId, {
        method: "PUT",
        body: JSON.stringify(updatedExerciseType),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(updateExerciseType(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('error' + error)
            // + 'nError: ' + error.message);
        });
};

export const deleteExerciseType = (exerciseTypeId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'exercisetypes/' + exerciseTypeId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('exercisetype Deleted', response); dispatch(removeExerciseType(response)); }) //this doesnt get called
        .catch(error => dispatch(exerciseTypesFailed(error.message)));
};
export const addMessage = (message) => ({
    type: ActionTypes.ADD_MESSAGE,
    payload: message
});

export const updateMessage = (message) => ({
    type: ActionTypes.UPDATE_MESSAGE,
    payload: message
});
export const removeMessage = (message) => ({
    type: ActionTypes.REMOVE_MESSAGE,
    payload: message
});

export const addMessages = (messages) => ({
    type: ActionTypes.ADD_MESSAGES,
    payload: messages
});

export const messagesFailed = (errmess) => ({
    type: ActionTypes.MESSAGES_FAILED,
    payload: errmess
});

export const fetchMessages = () => (dispatch) => {
    return fetch(baseUrl + 'messages')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(messages => dispatch(addMessages(messages)))
        .catch(error => dispatch(messagesFailed(error.message)));
}

export const postMessage = (programId, message) => (dispatch) => {

    const newMessage = {
        program: programId,
        message: message
    }
    console.log('Message ', newMessage);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'messages', {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addMessage(response)))
        .catch(error => {
            console.log('Post messages ', error.message);
            alert('Your message could not be posted\nError: ' + error.message);
        })
}

export const putMessage = (messageId, message, messageSeen) => (dispatch) => {
    const updatedMessage = {
        message: message,
        messageSeen: messageSeen
    };
    //console.log('Message ', updatedMessage);
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'messages/' + messageId, {
        method: "PUT",
        body: JSON.stringify(updatedMessage),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(updateMessage(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('error' + error.message)
            // + 'nError: ' + error.message);
        });
};

export const deleteMessage = (messageId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'messages/' + messageId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Message Deleted', response); dispatch(removeMessage(response)); }) //this doesnt get called
        .catch(error => dispatch(messagesFailed(error.message)));
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

//thunk that calls actions (dispatches them) based on server response
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (dishId, rating, comment) => (dispatch) => {

    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n' + JSON.stringify(response)); })
        .catch(error => { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({ "_id": dishId }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});