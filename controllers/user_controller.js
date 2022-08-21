const User = require('../models/user');
const jwt = require ("jsonwebtoken");
const errorHandler = require('../utils/errorHandler');

// Retriving a user from database
// Check authorization
module.exports.login = async (req,res,next)=>{
    const {email,password} = req.body
    User.login(email, password)
    .then(user=>{
        const token = jwt.sign(
            {user : user}, "Secret Key" , {expiresIn: '5h'}
        )
        res.status(200).json({
            // JWT_Token : token,
            JWT_Token : token,
            Message : "Successful Login",
            user : user
        })
    })
    .catch(err=>{
        next(err)
    })
}

// Adding New Users
// POST '/auth/signup'
module.exports.signup =  (req,res,next)=>{
    const {name,email,password} = req.body

    const user = new User({
        name : name,
        email : email,
        password  :  password,
        tasks : []
    })
    user.save()
        .then(result=>{
            res.status(201).json({
                Message : "User is registered successfully.",
                User : result
            })
        })
        .catch (error=>{
           next(error);
        })
}

module.exports.logout = (req,res,next)=>{
    res.json({
        Message : "Front-End Task. Remove the damn token"
    })
}

// Delete Account
// POST '/user/:id
module.exports.deleteUser = (req,res,next)=>{
    const id = req.params.id
    console.log(id);
    User.findByIdAndRemove(id)
        .then(result=>{
            if(result){
                res.status(200).json(
                    {
                        Message : "User has been Deleted.",
                        user_id : result._id
                    }
                )
            }else{
                const error = new Error("Incorrect User.")
                throw error;
            }    
        })
        .catch(error=>{
            next(error);
        })
}

// Update Account
// PUT '/user/:id
module.exports.updateUser = (req,res,next)=>{
    const id = req.params.id
    const {name,password} = req.body
    User.findById(id)
        .then(user=>{
            if(user){
                user.name = name;
                user.password = password; 
                return user.save()

            }else{
                const error = new Error("Incorrect User.")
                throw error;
            }
        })
        .then(result=>{
            if(result){
                res.status(200).json({
                    Message : "User Updated Successfully",
                    user_id : result._id,
                    user_email : result.email,
                    user_name : result.name
                })
            }else{
                const error = new Error("Update Error. Result not Found")
                throw error;
            }
        })
        .catch(error=>{
            next(error)
        })
}

