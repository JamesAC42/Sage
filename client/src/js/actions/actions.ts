import { createActions } from 'redux-actions';

export const settingsActions = createActions(
    {
        TOGGLE_DARKMODE: enabled => ({ enabled })
    }
)