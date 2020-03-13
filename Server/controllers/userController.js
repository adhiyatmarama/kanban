const {User} = require('../models')
const comparePassword = require('../helpers/comparePassword')
const makeToken = require('../helpers/makeToken')
const {OAuth2Client} = require('google-auth-library');

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
            let token = makeToken(data)
            res.status(201).json({token, name: data.name})
        })
        .catch(err => {
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
                res.status(200).json({token, name: userFound.name})
            }else{
                next({status: 400, msg: 'Wrong Password'})
            }
        })
        .catch(err => {
            console.log(err)
            next({status: 500, msg: 'Server Error'})
        })
    }
    static googleLogin(req, res, next){
        let {id_token} = req.body
        let user = {}
        let client = new OAuth2Client(process.env.CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            console.log(payload)
            user = {
                name: payload.name,
                email: payload.email,
                password: process.env.USER_PASS
            }
            return User.findOne({where: {email: user.email}})
        })
        .then(userdata => {
            console.log(userdata)
            if(!userdata){
                return User.create(user)
            }else{
                let token = makeToken(userdata)
                res.status(200).json({token, name: userdata.name})
            }
        })
        .then(result => {
            let token = makeToken(result)
            res.status(200).json({token, name: result.name})
        })
        .catch(err => {
            if(err){
                next(err)
            }
            next({status: 400, msg: 'Failed'})
        })
    }
}

module.exports = UserController