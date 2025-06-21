import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}, {timestamps : true})

const Todo = mongoose.model('Todo' , todoSchema)
export default Todo