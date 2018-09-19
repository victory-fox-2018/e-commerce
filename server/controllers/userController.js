const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { becryptPassword } = require('../helpers/helper')

module.exports = {
    signupUser: (req, res) => {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(201).json({
                    msg : `register account success`,
                    data : user
                })
            })
            .catch(err => {
                if(err.name == 'ValidationError'){
                    let ERRORS = JSON.parse(JSON.stringify(err.errors))
                    let errors = []
                    for(let error in ERRORS){
                        errors.push(ERRORS[error].message)
                    }
                    res.status(400).json({
                        errors
                    })
                }else{
                    res.status(500).json({
                        message: err
                    })
                }
            })
    },
    signinUser: (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if(user){
                    if(becryptPassword(user.password, req.body.password)){
                        let token = jwt.sign({
                            id : user.id,
                            name : user.name,
                            email : user.email
                        }, config.JWT_SECRET)
                        res.status(200).json({
                            msg : `login success`,
                            token
                        })
                    }else{
                        res.status(404).json({
                            msg: 'password wrong'
                        })    
                    }
                }else{
                    res.status(404).json({
                        msg: 'email wrong'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err
                })
            })
    }
}