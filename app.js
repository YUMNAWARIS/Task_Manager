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

// Error handler Middleware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.Message = err.message || "Something went on server";
    if(err.message.includes("duplicate key error collection")){
        err.statusCode = 401;
        err.Message = "E-mail is already registered.";
    }else if(err.message.includes("Incorrect User.")){
        err.statusCode = 401;
        err.Message = "Please enter a registered E-mail. This E-mail is not registered."
    }else if(err.message.includes("Incorrect Password.")){
        err.statusCode = 401;
        err.Message = "Please Enter a valid Password. Password is incorrect."
    }else if(err.message.includes("user validation failed: password:")){
        err.statusCode = 422;
        err.Message = "Password should be 6 character long. Please enter a valid password."
    }else if(err.message.includes("user validation failed: email:")){
        err.statusCode = 422;
        err.Message = "E-mail is invald. Please Enter a valid E-mail"
    }
    res.status(err.statusCode).json({Message : err.Message})
})