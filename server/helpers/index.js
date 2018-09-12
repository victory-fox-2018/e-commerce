const bcrypt = require('bcrypt')
const Item = require('../models/item')

module.exports = {
    generatePassword: function (email, password) {
        return new Promise(function (resolve, reject) {
            const saltRound = 10
            const emailPassword = email + password
            bcrypt.genSalt(saltRound, function (err, salt) {
                bcrypt.hash(emailPassword, salt, function (err, hash) {
                    if (!err) {
                        resolve(hash)
                    } else {
                        reject(err)
                    }

                })
            })
        })
    },

    checkPassword: function (salt, password, email) {
        return new Promise((resolve, reject) => {
            const emailPassword = email + password
            bcrypt.compare(emailPassword, salt, function (err, data) {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            });
        })
    },

    amount: function (listItem) {
        if (typeof listItem == "object") {
            return new Promise((resolve, reject) => {
                let totalPrice = 0
                for (let i = 0; i < listItem.length; i++) {
                    Item.findById(listItem[i])
                    .then(function (item) {
                        totalPrice += item.price
                        if (i == listItem.length - 1) {
                            resolve(totalPrice)
                        }
                    })
                }
            })
        } else {
            return new Promise((resolve,reject) => {
                Item.findById(listItem)
                .then(function (item) {
                   resolve(item.price)
                })
            })
            
        }
    },


}