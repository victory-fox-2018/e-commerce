const ObjectId = require('mongodb').ObjectId
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { encrypt } = require('../helpers/encryption')

module.exports = {
    
    show: function (req, res) {
        User.find({})
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    add: function (req, res) {
        User.findOne({email: req.body.email})
        .then(data => {
            if (data) {
                res.status(500).json({message: 'The email has been registered before.'})
            } else {
                User.create({
                    email: req.body.email,
                    password: encrypt(req.body.password)
                })
                .then(() => {
                    res.status(201).json({message: 'New user added. Run live-server on the client directory to see the changes.'})
                })
                .catch(err => {
                    res.status(500).json({error: err.message})
                })
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    edit: function (req, res) {
        User.updateOne({
            _id: ObjectId(req.body.id)
        }, {
            email: req.body.email,
            password: encrypt(req.body.password)
        })
        .then(() => {
            res.status(200).json({message: 'User data updated. Run live-server on the client directory to see the changes.'})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    remove: function (req, res) {
        User.deleteOne({
            _id: ObjectId(req.body.id)
        })
        .then(() => {
            res.status(200).json({message: `User '${req.body.id}' deleted. Run live-server on the client directory to see the changes.`})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    login: function (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(500).json({message: 'You should input your email and password to log in.'})
        }
        User.findOne({email: req.body.email})
        .then(data => {
            if(data) {
                if (data.isUsingFacebook === 1) {
                    res.status(400).json({message: 'You should log in using Facebook.'})
                } else if (data.password === encrypt(req.body.password)) {
                    jwt.sign({
                        email: data.email,
                    }, process.env.JWT_KEY, (err, token) => {
                        if (err) {
                            res.status(500).json({message: err.message})
                        } else {
                            res.status(201).json({token: token})
                        }
                    })
                } else {
                    res.status(400).json({message: 'Wrong password!'})
                }
                
            } else {
                res.status(400).json({message: 'The email is not registered, please try again with a different email or register the email.'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    register: function (req, res) {
        let emailIsValid = false
        let at = false
        let dot = false
        for (var i = 1; i < req.body.email.length; i++) {
            if (req.body.email[i] === '@' && req.body.email[i+1]) {
                at = true
            } else if (req.body.email[i] === '.' && at && req.body.email[i-1] !== '@' && req.body.email[i+1]) {
                dot = true
            }
        }
        if (at && dot) {
            emailIsValid = true
        }
        if (!emailIsValid) {
            res.status(500).json({message: 'You should input a valid email.'})
        }

        if (!req.body.email || !req.body.password) {
            res.status(500).json({message: 'You should input an email and a password to register.'})
        }
        User.findOne({email: req.body.email})
        .then(data => {
            if(data) {
                res.status(500).json({message: 'The email is registered, you should just log in.'})
            } else {
                User.create({
                    email: req.body.email,
                    password: encrypt(req.body.password)
                })
                .then(() => {
                    jwt.sign({
                        email: req.body.email,
                    }, process.env.JWT_KEY, (err, token) => {
                        if (err) {
                            res.status(500).json({message: err.message})
                        } else {
                            res.status(201).json({token: token})
                        }
                    })
                })
                .catch(err => {
                    res.status(500).json({error: err.message})
                })
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    checkLocalStorage: function (req, res) {
        jwt.verify(req.body.jwtToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                User.findOne({email: decoded.email}, (err, findResult) => {
                    if (err) {
                        res.status(500).json({message: err.message})
                    } else {
                        res.status(200).json({isLogin: true})
                    }
                })
            }
        })
    } 
}