import { createAction } from '@reduxjs/toolkit';

// Action creators
export const logoutUser = createAction('user/logout');
export const deleteUserAccount = createAction('user/deleteAccount');

// Thunk actions (if you are using redux-thunk for async actions)
export const logoutUserAsync = () => {
    return (dispatch) => {
        // Perform any async operations here (e.g., API calls)
        // After successful logout, dispatch the logout action
        dispatch(logoutUser());
    };
};

export const deleteUserAccountAsync = () => {
    return (dispatch) => {
        // Perform any async operations here (e.g., API calls)
        // After successful account deletion, dispatch the delete account action
        dispatch(deleteUserAccount());
    };
};