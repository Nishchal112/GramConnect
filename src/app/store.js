import { configureStore } from '@reduxjs/toolkit'
import SchemeReducer from '../Reducers/SchemeSlice'
import AuthReducer from '../Reducers/AuthSlice'
import InitiativeReducer from '../Reducers/InitiativeSlice'

export const store = configureStore({
    reducer: {
        schemes: SchemeReducer,
        auth: AuthReducer,
        initiative: InitiativeReducer
    },
})
