const User = require("../models/user")

module.exports.getOne = (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body
    let temp_task;
    User.findById(res.user._id)
        .then(user => {
            if (user) {
                user.tasks.forEach((task, ) => {
                    if (task._id == id) {
                        temp_task = task
                    }
                });
                return user.save()
            }
        })
        .then(result => {
            res.status(200).json({
                Message: "Found Successfully",
                Result: temp_task
            })
        })
        .catch(err => {
            res.status(500).json({ error: err.toString() })
        })
}

module.exports.getAll = (req, res, next) => {
    const temp = res.user._id
    User.findById(temp)
        .then(user => {
            if (user) {
                res.status(200).json({
                    tasks: user.tasks
                })
            }
            throw new Error("")
        })
        .catch(err => {
            console.log(err);
            res.json({
                err: err
            })
        })
}

module.exports.create_task = (req, res, next) => {
    const { title, description } = req.body
    const temp = res.user._id
    User.findById(temp)
        .then(user => {
            if (user) {
                let task = {
                    title: title,
                    description: description,
                }
                user.tasks.push(task)
                return user.save()
            }
            throw new Error("Not Found")
        })
        .then(result => {
            res.status(200).json({
                Message: "Successfully added Task",
                user: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: "Something went wrong"
            })
        })
}

module.exports.update_task = (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body
    var index = -1;
    User.findById(res.user._id)
        .then(user => {
            if (user) {
                user.tasks.forEach((task, i) => {
                    console.log(i);
                    if (task._id == id) {
                        task.title = title,
                            task.description = description
                        index = i
                    }
                });
                return user.save()
            }
        })
        .then(result => {
            if (index != -1) {
                const task_Updated = result.tasks[index]
                res.status(200).json({
                    Message: "Updated Successfully",
                    Result: task_Updated
                })
            }
            throw new Error("Not Found")
        })
        .catch(err => {
            res.status(500).json({ error: err.toStrin() })
        })
}

module.exports.delete_task = (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body
    User.findById(res.user._id)
        .then(user => {
            if (user) {
                user.tasks.forEach((task, ) => {
                    if (task._id == id) {
                        user.tasks.pull(task);
                    }
                });
                return user.save()
            }
        })
        .then(result => {
            const tasks = result.tasks
            res.status(200).json({
                Message: "Updated Successfully",
                Result: tasks
            })
        })
        .catch(err => {
            res.status(500).json({ error: err.toString() })
        })
}


module.exports.markAsCompleted = (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body
    User.findById(res.user._id)
        .then(user => {
            if (user) {
                user.tasks.forEach((task, ) => {
                    if (task._id == id) {
                        if(task.isCompleted){
                            task.isCompleted = false
                        }
                        else{
                            task.isCompleted = true
                        }
                    }
                });
                return user.save()
            }
        })
        .then(result => {
            const tasks = result.tasks
            res.status(200).json({
                Message: "Mark as done",
                Result: tasks
            })
        })
        .catch(err => {
            res.status(500).json({ error: err.toString() })
        })
}