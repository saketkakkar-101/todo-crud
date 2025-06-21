import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Todo from './models/todo.js'


 
const app = express()

app.use(express.json())
app.use(cors())

app.listen(5000, () => {
    console.log('server is running');
})

mongoose.connect()
.then(() => console.log('connected successfully'))
.catch(() => console.log("failed"))




app.get("/todos" , async(req , res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post("/todos" , async(req,res) => {
    const {name , price , category ,description} = req.body

    if(!name || !price || !category || !description || isNaN(price)){
        return res.json("Invalid Input")
    }

    const newProduct = new Todo({
        name , price , category , description
    })

    try {
        await newProduct.save()

        res.json(newProduct)
    } catch (error) {
        console.log("error");
    }
})

app.put('/todos/:id' , async(req,res) => {
    const {name , price , category ,description} = req.body

    if(!name || !price || !category || !description || isNaN(price)){
        return res.json("Invalid Input")
    }

    const product = await Todo.findByIdAndUpdate(req.params.id , {name ,price , category ,description} , {new : true})
    res.json(product)

})

app.delete('/todos/:id' , async(req,res) => {
     await Todo.findByIdAndDelete(req.params.id)
     res.json("deleted successfully")
})
