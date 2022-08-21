const user = require("../models/user");
const User = require("../models/user")

module.exports.getOne = (req, res, next) => {
    const id = req.params.id;
    const temp_user = res.user;
    let task_ = null;
    temp_user.tasks.forEach((task)=>{
        if(task._id == id){
            task_ = task
        }
    })
    if(task_){
        res.status(200).json({task_})
    }else{
        const error =  new Error("Task Not Found.");
        next(error);
    }
}

module.exports.getAll = (req, res, next) => {
    const id = req.params.id;
    const temp_user = res.user;
    res.status(200).json( temp_user.tasks)
}

module.exports.create_task = (req, res, next) => {
    const { title, description } = req.body
    const temp = res.user
    let task = {
        title:title,
        description:description,
        isCompleted:false
    }
    temp.tasks.push(task);
    temp.save()
    .then(result=>{
        res.status(201).json({
            Message: "Successfully added Task",
            user: result
        })
    }).catch(err=>{
        next(err)
    })
}

module.exports.update_task = (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const temp_user = res.user;

    let flag = false
    temp_user.tasks.forEach((task)=>{
        if(task._id == id){
            task.title = title;
            task.description = description;
            flag=true;
        }
    })
    if(!flag){
        const err = new Error("Task Not Found.");
        next(err);
    }
    temp_user.save()
    .then(result =>{
        res.status(200)
            .json({Messge:"Updated Successfully. ", user : result})
    })
    .catch(err=>{next(err)})
}

module.exports.delete_task = (req, res, next) => {
    const id = req.params.id;
    const temp_user = res.user;
    let flag = false
    temp_user.tasks.forEach((task)=>{
        if(task._id == id){
            flag=true;
            temp_user.tasks.pull(task)
        }
    })
    if(!flag){
        const err = new Error("Task Not Found.");
        next(err);
    }
    temp_user.save()
    .then(result =>{
        res.status(200)
            .json({Messge:"Deleted Successfully. ", user : result})
    })
    .catch(err=>{next(err)})
}


module.exports.markAsCompleted = (req, res, next) => {
    const id = req.params.id;
    const temp_user = res.user;
    let flag = false
    temp_user.tasks.forEach((task)=>{
        if(task._id == id){
            if(task.isCompleted){
                task.isCompleted = false;
            }else{
                task.isCompleted = true;
            }
            flag=true;
        }
    })
    if(!flag){
        const err = new Error("Task Not Found.");
        next(err);
    }
    temp_user.save()
    .then(result =>{
        res.status(200)
            .json({Messge:"Updated Successfully. ", user : result})
    })
    .catch(err=>{next(err)})
}