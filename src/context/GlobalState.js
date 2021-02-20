import React, { createContext, useReducer } from 'react'
import MainReducer from './reducer/MainReducer'

const initialState = {
    user: {
        id: '',
        nickname: '',
        weight: 0, //** Change to 0 */
        favorites: []
    },
    page: '',
    suggested: []
}

export const GlobalContext = createContext(initialState)


export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MainReducer, initialState)

    // Actions
    const changeUser = (user) => {
        dispatch({
            type: 'CHANGE_USER',
            payload: user
        })
    }

    const changePage = (page) => {
        dispatch({
            type: 'CHANGE_PAGE',
            payload: page
        })
    }

    const changeSuggested = async (exercises) => {
        await dispatch({
            type: 'CHANGE_SUGGESTED',
            payload: exercises
        })
    }
    

    return (
        <GlobalContext.Provider
            value={{
                user: state.user,
                page: state.page,
                suggested: state.suggested,
                changeUser,
                changePage,
                changeSuggested
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}