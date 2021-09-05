import React, {useReducer, createContext, useContext} from 'react';

const StoreContext = createContext();
const initialState = {
    userInfos: {},
    userReposList: [],
    RepoDetails: {},
}
const reducer = (state, action) => {
    switch (action.type) {
        case "USER_INFOS":
            return {}
        case "USER_REPOS_LIST":
            return {}
        case "REPO_DETAILS":
            return {}
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
