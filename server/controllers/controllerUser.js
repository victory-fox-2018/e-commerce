const User = require('../models/modelUser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

    createUser: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(userData => {
                res.status(201).json({
                    msg: 'data has been created',
                    data: userData
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'create data failed',
                    error: err.message
                })
            })
    },

    readUser: (req, res) => {

        User.find({
            email: req.body.email,
            password: req.body.password
        })
            .then(function (userData) {
                console.log(process.env.JWT_SECRET);

                if (userData.length > 0) {
                    jwt.sign({ email: userData[0].email }, process.env.secretKey, (err, token) => {
                        if (err) res.status(500).json({ msg: err.status })
                        else {
                            console.log(token);
                            res.status(200).json({
                                msg: 'login success',
                                token: token,
                                email: userData[0].email,
                                username: userData[0].username,
                            })
                        }
                    })
                } else {
                    res.status(404).json({
                        message: `Wrong Email or Wrong Password`,
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: `failed get users data`,
                    error: err.message
                })
            })
    },

    updateUser: (req, res) => {
        let where = { _id: req.params.id }
        let value = {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        }
        User.update(where, value)
            .then(dataUser => {
                res.status(200).json({
                    msg: `Data has been Updated`,
                    data: dataUser
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    },

    deleteUser: (req, res) => {
        let where = { _id: req.params.id }

        User.deleteOne(where)
            .then(userData => {

                res.status(200).json({
                    msg: `data has been deleted`,
                    data: userData
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    },

    findAllUser: (req, res) => {
        User.find()
            .then(dataUser => {
                res.status(200).json({
                    data: dataUser
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    }
}