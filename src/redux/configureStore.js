import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Users } from './users';
import { Programs } from './programs';
import { Exercises } from './exercises';
import { Patients } from './patients';
import { ExerciseTypes } from './exerciseTypes';
import { Messages } from './messages';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { favorites } from './favorites';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';



//actions are payloads of info from application to the store, done by dispatch()

//take reducers to configure the store
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            programs: Programs,
            exercises: Exercises,
            patients: Patients,
            exerciseTypes: ExerciseTypes,
            messages: Messages,
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}