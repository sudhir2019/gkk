import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice';
import authReducer from '../slices/authSlice';


// Combine all reducers into a single root reducer
const newRed = combineReducers({
    app: appReducer,
    auth: authReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined; // Reset the store by setting state to undefined
    }
    return newRed(state, action);
};

export default rootReducer;