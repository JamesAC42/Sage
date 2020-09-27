import {
    createStore,
    combineReducers
} from 'redux';

import settings from './reducers/settings';
import session from './reducers/session';

let initState = {
    settings: {
        darkMode: false
    },
    session: {
        loggedin: undefined
    }
}

const sageReducer = combineReducers({
    settings,
    session
});

const configureStore = (reducer:any, initState:{}) => {
    return createStore(reducer, initState);
}

export default configureStore(sageReducer, initState);