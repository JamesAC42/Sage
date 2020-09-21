import { handleActions } from 'redux-actions';

const settings = handleActions(
    {
        TOGGLE_DARKMODE: (state:any, action:any) => {
            return {
                ...state,
                darkMode: action.payload.enabled
            }
        }
    },
    {
        darkMode: false
    }
)

export { settings as default }