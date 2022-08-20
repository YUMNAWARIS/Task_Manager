const express = require("express")
const mongoose = require("mongoose")

const task_routes = require('./routers/task_router')
const auth_routes = require('./routers/auth_routers')
const auth = require("./auth_middleware/auth")

const app = express()


// Database Connection
mongoose
.connect("mongodb+srv://root:root@cluster0.kq3nyka.mongodb.net/task_manager")
.then( result => {app.listen(3000)} ) // Server Start
.catch( err=>{console.log(err);} )

// Middleware
app.use(express.json())



// Routes - Set Up

// TASK - Routes
app.use("/tasks",auth, task_routes)

// AUTH - Routes
app.use("/auth",auth_routes)

// No Route Found
app.use("/", (req,res)=>{
    res.status(404).json({
        Error_Message : "Requested Page Not Found"
    })
})
