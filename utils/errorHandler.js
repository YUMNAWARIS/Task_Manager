
module.exports = (er)=>{
    const error = {
        Status_Code : 500,
        Name : "",
        Message : ""
    }
    
    error.Status_Code = er.statusCode || 500;
    error.Name = er.name || "Internal Server Error"
    error.Message = er.message || "Something went wrong, Please try again with valid data."
    console.log(er);
    return error
}