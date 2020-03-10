const {Task} = require('../models')

class TaskController {
    static getTasks(req, res, next){
        let UserId = req.userData.id
        Task.findAll({where: {UserId}})
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
        let UserId = req.userData.id
        let category = 'Backlog'
        Task.create({
            title, description, category, UserId
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
    static getOne(req, res, next){
        let id = Number(req.params.id)
        Task.findByPk(id)
        .then(result => {
            if(result){
                res.status(200).json(result)
            }else{
                next({status: 404, msg: 'Task not found'})
            }
        })
        .catch(err => {
            console.log(err, 'Ini di getOne Task')
            next({status: 500, msg: 'Server Error'})
        })
    }
    static edit(req, res, next){
        let id = Number(req.params.id)
        let UserId = req.userData.id
        let {title, description, category} = req.body;
        let newTask = {
            title, description, category, UserId
        }
        Task.update(newTask, {where: {id}})
        .then(result => {
            if(result[0]){
                res.status(200).json(newTask)
            }else{
                next({status: 404, msg: 'Task not found'})
            }
        })
        .catch(err => {
            console.log(err)
            console.log('Dari edit task')
            next({status: 500, msg: 'Server Error'})
        })
    }
}
module.exports = TaskController