import mongoose from "mongoose";
import Todo from "./models/todo.js";

mongoose.connect()
.then(async() => {
await Todo.deleteMany()

await Todo.insertMany(
    [
        {name : "shirt" , price : 10 , category : "men" , description : "Perfect Item"},
        {name : "T-shirt" , price : 20 , category : "men" , description : "Perfect Item"},
        {name : "L-shirt" , price : 80 , category : "men" , description : "Perfect Item"},
        {name : "M-shirt" , price : 70 , category : "men" , description : "Perfect Item"},
        {name : "jeans" , price : 107 , category : "women" , description : "Perfect Item"},
        {name : "trousers" , price : 108 , category : "women" , description : "Perfect Item"},
        {name : "skirt" , price : 104 , category : "women" , description : "Perfect Item"},
        {name : "purse" , price : 105 , category : "women" , description : "Perfect Item"},
        {name : "Laptop" , price : 310 , category : "electronics" , description : "Perfect Item"},
        {name : "Computer" , price : 210 , category : "electronics" , description : "Perfect Item"},
    ]
)
console.log("seeded")
}

)
.catch(() => console.log("failed"))