const mongoose = require("mongoose")
const {isEmail} = require("validator")
const hashed = require("bcrypt")

// Defining Schema Structure for Model User
const userSchema = mongoose.Schema({
    name :{ 
        type : String,
        required :[true, 'Name is required.'],
    },
    email :{
        type : String,
        required :[true, 'E-mail is required.'],
        unique :true,
        lowercase : true,
        validate : [isEmail, "Invalid E-mail"]
    },
    password:{
        type : String,
        required :[true, 'Password is required.'],
        minLength : [6, 'Password should be 6 characters long.']
    },
    tasks : [{
        title: {
            type : String,
            required :[true, 'Title is required.'],
        },
        description :{ 
            type : String
        },
        isCompleted:{
            type : Boolean,
            default : false
        }
    }]
})

// Code for Hashing Passwords
userSchema.pre('save',async function(next){
    const salt = await hashed.genSalt();
    this.password = await hashed.hash(this.password, salt);
    next();
})

// Defining Login Static Method on Schema User
userSchema.statics.login =  async function(email,password){
        // Checking if user exists
        const user = await this.findOne({email});
        if(user){
            // Code for comparing hashed password for authorization
            const isAuth = await hashed.compare(password,user.password);
            if(isAuth){
                return user;
            }else{
                const error = new Error("Incorrect Password.");
                error.statusCode = 401;
                throw error;
            }
        }else{
            const error = new Error("Incorrect User.");
            error.statusCode = 404;
            throw error;
        }
}

module.exports = mongoose.model('user',userSchema)