const User = require('../models/user');
const jwt = require ("jsonwebtoken")

// Retriving a user from database
// Check authorization
module.exports.login = async (req,res,next)=>{
    const {email,password} = req.body
    try{
        const user = await User.login(email,password);
        if(user){
            const token = jwt.sign(
                {user : user}, "Secret Key" , {expiresIn: 3*24*60*60*1000}
            )
            res.status(200).json({
                JWT_Token : token,
                Message : "Successful Login",
                user : user
            })
        }
    }catch(error){
        res.json({error})
    }
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
            res.status(400).json({
                error : error
            })
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
    User.findOneAndRemove({_id:id})
        .then(result=>{
            if(result){
                res.status(200).json(
                    {
                        Message : "User has been Deleted.",
                        user_id : result._id
                    }
                )
            }
            res.status(404).json({
                Error : "User not found."
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                Error : err
            })
        })
}

// Update Account
// PUT '/user/:id
module.exports.updateUser = (req,res,next)=>{
    const id = req.params.id
    const {name,email} = req.body
    User.findById(id)
        .then(user=>{
            if(user){
                user.name = name;
                user.email = email; 
                return user.save()

            }else{
                res.status(400).json({
                    Error : "User Not Found"
                })
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
                res.status(500).json({
                    Error : err
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                Error : err
            })
        })
}