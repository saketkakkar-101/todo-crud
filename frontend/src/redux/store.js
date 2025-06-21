import {configureStore} from '@reduxjs/toolkit'
import todoReducer  from './productSlice.js'
const store = configureStore({
    reducer : {
        todos : todoReducer
     }
})

export default store