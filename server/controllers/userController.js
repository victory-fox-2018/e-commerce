const User = require('./../models/user')
//const objId= require('mongodb').ObjectID
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')



module.exports = {

    signUp: function (req, res) {
        console.log(req.body)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })

        newUser.save(function (err) {
            console.log(newUser)
            if (!err) {
                res.status(200).json({
                    msg: "Sign up is succesful"
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        });
    },

    signIn: function (req, res) {
        let input = {
            email: req.body.email,
        }

        User.findOne(input, function (err, data) {
            if (err) {
                res.status(500).json({
                    msg: "Invalid email or password"
                })
            } else if (data === null || data === undefined) {
                res.status(404).json({
                    msg: "Not a valid email or password"
                })
            } else {
                let isPasswordValid = bcrypt.compareSync(req.body.password, data.password);
                if (isPasswordValid) {
                    jwt.sign({
                        email: data.email,
                        password: data.password
                    }, process.env.JWT_SECRET, function (err, token) {
                        res.status(200).json({
                            msg: "Login is successful",
                            token: token
                        })
                    });
                } else {
                    res.status(403).json({
                        msg: "username/pass invalid"
                    })
                }

            }
        })
    },

    findAll: function (req, res) {
        User.find(function (err, data) {
            if (!err) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    updateOne: function (req, res) {
        let newUpdate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        }

        User.updateOne({
            _id: objId(req.params.id)
        }, newUpdate, function (err, data) {
            if (!err) {
                res.status(200).json({
                    msg: "Data has been updated",
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },

    deleteOne: function (req, res) {
        User.deleteOne({
            _id: objId(req.params.id)
        }, function (err) {
            if (!err) {
                res.status(200).json({
                    msg: "Data has been deleted"
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    }
}