import React, {useReducer, createContext, useContext} from 'react';
import {LOADING, USER_INFOS, USER_REPOS_LIST, ERROR} from "./actions";

const StoreContext = createContext();

const initialState = {
    userInfos: {},
    userReposList: [],
    loading: false,
    error: false,
}
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case USER_INFOS:
            return {
                ...state,
                userInfos: action.payload
            }
        case USER_REPOS_LIST:
            return {
                ...state,
                userReposList: action.payload
            }
        case ERROR: {
            return {
                ...state,
                error: action.error,
            };
        }
        default:
            return state;
    }
}
export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}
export const useStore = () => useContext(StoreContext);
