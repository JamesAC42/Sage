import {
    createStore,
    combineReducers
} from 'redux';

import settings from './reducers/settings';

let initState = {
    settings: {
        darkMode: false
    }
}

const sageReducer = combineReducers({
    settings
});

const configureStore = (reducer:any, initState:{}) => {
    return createStore(reducer, initState);
}

export default configureStore(sageReducer, initState);