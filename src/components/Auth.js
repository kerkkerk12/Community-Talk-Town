import React, { useState, useEffect } from 'react'
import { act } from 'react-dom/test-utils';
import Loading from './UI/Loading'
import firebaseConfig from '../config'

export const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            act(() => {
                setLoading(false)
            });
        })
    })



    if (loading) {
        return (<><Loading /></>);
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}