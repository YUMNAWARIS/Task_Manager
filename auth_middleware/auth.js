const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    head = req.get("Authorization");

    if(!head){
        res.status(401).json({
            Error : "Authorization Failed. JWT IS MISSING"
        })
    }
    let decoded 
    try{
        decoded = jwt.verify(head,"Secret Key")
    }
    catch(err){
        res.status(401).json({
            Error : "Authorization is failed. INVALID JWT"
        })
    }
    res.user = decoded.user
    next()
}