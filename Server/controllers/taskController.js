const {Task} = require('../models')

class TaskController {
    static getTasks(req, res, next){
        Task.findAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            console.log(err)
            next({status: 500, msg: 'Server Error'})
        })
    }
    static addTask(req, res, next){
        let {title, description} = req.body;
        let category = 'Backlog'
        Task.create({
            title, description, category
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            if(err.errors){
                let error = []
                err.errors.forEach(item => {
                    error.push({
                        type: item.type,
                        path: item.path,
                        msg: item.message
                    })
                })
                next({status: 400, error})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
}
module.exports = TaskController