const jwt = require("jsonwebtoken");
const user = require("../models/user");

// For Authorization user request for new Users
module.exports = (req,res,next)=>{

    // Getting value of JWT from Request header
    head = req.get("Authorization");
    if(!head){
        const error = new Error("Authorization Failed. No JWT Found.");
        error.statusCode = 403;
        next(error);   
    }

    // JWT Verification
    let decoded; 
    try{
        decoded = jwt.verify(head,"Secret Key");
        user.findById(decoded.user._id)
        .then(
           user =>{
                if(user){
                    res.user = user;
                    next();
                }
                else{
                    throw new Error("Incorrect User.");
                }
           }
        )
        .catch(err=>{
            next(err);
        })
    }
    catch(err){
        const error = new Error("Authorization Failed. JWT is not verified.");
        error.statusCode = 403;
        next(err);
    }
}