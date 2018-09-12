const ObjectId = require('mongodb').ObjectId
const User = require('../models/userModel')
const axios = require('axios')
const jwt = require('jsonwebtoken')

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
                    password: req.body.password
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
            password: req.body.password
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

    checkLogin: function (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(500).json({message: 'You should input your email and password to log in.'})
        }
        User.findOne({email: req.body.email})
        .then(data => {
            if(data) {
                if (data.isUsingFacebook === 1) {
                    res.status(400).json({message: 'You should log in using Facebook.'})
                } else if (data.password === req.body.password) {
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
                    password: req.body.password
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

    checkLoginFB: function (req, res) {
        axios({
            method:'get',
            url:`https://graph.facebook.com/me?fields=email,name&access_token=${req.body.accessToken}`,
        })
        .then(result => {
            User.findOne({email: result.data.email}, (err, findResult) => {
                if (err) {
                    console.log(err)
                } else {
                    if(findResult) {
                        jwt.sign({
                            email: result.data.email,
                        }, process.env.JWT_KEY, (err, token) => {
                            if (err) {
                                res.status(500).json({message: err.message})
                            } else {
                                res.status(201).json({token: token})
                            }
                        })
                    } else {
                        User.create({
                            email: result.data.email,
                            password: 'password' + result.data.id + '!@#$%^&*()',
                            isUsingFacebook: 1
                        }, (err) => {
                            if (err) {
                                res.status(500).json({message: err.message})
                            } else {
                                jwt.sign({
                                    email: result.data.email,
                                }, process.env.JWT_KEY, (err, token) => {
                                    if (err) {
                                        res.status(500).json({message: err.message})
                                    } else {
                                        res.status(201).json({token: token})
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
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