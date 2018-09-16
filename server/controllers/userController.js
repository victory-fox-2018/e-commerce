const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    addUser: (req, res) => {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(201).json({
                    data: user
                })
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    loginUser: (req, res) => {
        User
            .findOne({
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                let token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, 'process.env.JWT_SECRET')

                res.status(200).json({
                    token
                })
                
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json({
                    msg: err.message
                })
            })

    }
}