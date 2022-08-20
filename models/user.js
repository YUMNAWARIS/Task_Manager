const mongoose = require("mongoose")
const {isEmail} = require("validator")
const hashed = require("bcrypt")

const userSchema = mongoose.Schema({
    name :{ 
        type : String,
        required :[true, 'Name is required.'],
    },
    email :{
        type : String,
        required :[true, 'E-mail is required.'],
        unique :[true, 'E-mail is already registered.'],
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

userSchema.pre('save',async function(next){
    const salt = await hashed.genSalt();
    this.password = await hashed.hash(this.password, salt);
    next();
})

userSchema.statics.login =  async function(email,password){
    try{
        const user = await this.findOne({email});
        if(user){
            const isAuth = await hashed.compare(password,user.password);
            if(isAuth){
                return user
            }else{
                throw new Error("Authentication failed.")
            }
        }else{
            throw new Error("User not found.")
        }
    }catch(err){
        throw new Error(err)
    }
}

module.exports = mongoose.model('user',userSchema)