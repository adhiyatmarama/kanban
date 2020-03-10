const {User} = require('../models')
const comparePassword = require('../helpers/comparePassword')
const makeToken = require('../helpers/makeToken')

class UserController {
    static register (req, res, next){
        let {name, email, password} = req.body
        User.findOne({where: {email}})
        .then(result => {
            if(result){
                next({status: 400, msg: 'Email has been used'})
            }else{
                return User.create({
                    name, email, password
                })
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            if (err.errors){
                let error = []
                err.errors.forEach(item => {
                    error.push({
                        type: item.type,
                        path: item.path,
                        msg: item.message
                    })
                })
                next({status: 400, error})
            }
            next({status: 500, msg: 'Server Error'})
        })
    }
    static login (req, res, next){
        let {email, password} = req.body
        let userFound = null
        User.findOne({where: {email}})
        .then(user => {
            if(user){
                userFound = user
                return comparePassword(password, user.password)
            }else{
                next({status: 404, msg: 'Wrong Email'})
            }
        })
        .then(result => {
            if(result){
                let token = makeToken(userFound)
                res.status(200).json({token})
            }else{
                next({status: 400, msg: 'Wrong Password'})
            }
        })
        .catch(err => {
            console.log(err)
            next({status: 500, msg: 'Server Error'})
        })
    }
}

module.exports = UserController