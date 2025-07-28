import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../Reducers/AuthSlice'

const AuthProvider = ({ children }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
