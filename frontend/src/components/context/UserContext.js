import React, { createContext, useReducer } from 'react';
import { userReducer } from '../Reducer';

const UserContext = createContext();
const initUserState = {
    isLoading: false,
    isError: false,
    // object array
    user: {
        name: "",
        email: "",
        avatar: "",
        role: "user",
        level: 0,
        gem: 0,
        token: "",
    },
};

const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, initUserState);
    return (
        <UserContext.Provider value={[userState, userDispatch]}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };