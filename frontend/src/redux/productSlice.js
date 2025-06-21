import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const API = "http://localhost:5000/todos"

export const loadFromLocalStorage = createAsyncThunk("fetch" , async() => {
    const res = await axios.get(API)
    return res.data
})

export const addTodo = createAsyncThunk('addTodo' , async(product) => {
    const res = await axios.post(API ,product)
    return res.data
})

export const updateTodo = createAsyncThunk('update' , async(product) => {
    const res = await axios.put(`${API}/${product._id}` , product)
    return res.data
})

export const deleteTodo = createAsyncThunk('delete' , async(id) => {
    await axios.delete(`${API}/${id}`)
    return id
})

const productSlice = createSlice({
    name : "todos",
    initialState : {
        products : []
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(loadFromLocalStorage.fulfilled , (state, action) => {
            state.products = action.payload
        })

        .addCase(addTodo.fulfilled , (state,action) => {
           state.products.push(action.payload)
        })

        .addCase(updateTodo.fulfilled , (state,action) => {
            const index = state.products.findIndex((p) => p._id === action.payload._id)
            state.products[index] = action.payload
        })
        .addCase(deleteTodo.fulfilled , (state , action) => {
            state.products = state.products.filter((p) => p._id !== action.payload)
        })
    }
})

export default productSlice.reducer