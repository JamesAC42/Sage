import { handleActions } from 'redux-actions';

const session = handleActions(
    {
        LOGIN: (state:any, action:any) => ({
            ...state,
            loggedin: true
        }),
        LOGOUT: (state:any, action:any) => ({
            ...state,
            loggedin: false
        })
    },
    {
        loggedin: undefined
    }
)

export { session as default }