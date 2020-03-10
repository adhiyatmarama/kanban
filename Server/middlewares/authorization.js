const {Task} = require('../models')

function authorization (req, res, next){
    let id = Number(req.params.id)
    let UserId = req.userData.id;
    Task.findByPk(id)
    .then(task => {
        if(task){
            if(task.UserId === UserId){
                next()
            }else{
                next({status: 403, msg: 'Not Authorized'})
            }
        }else{
            next({status: 404, msg: 'Task Not Found'})
        }
    })
    .catch(err => {
        console.log(err)
        console.log('Ini dari authorization')
    })

}

module.exports = authorization