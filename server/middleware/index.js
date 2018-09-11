const User = require('../models/user')
const jwt  = require('jsonwebtoken')

module.exports = {

    auth: function(req,res,next){
        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.ACCESS_DATA, function (err, decoded) {
                if(!err){
                    req.userId = decoded.userId
                    next()
                }else {
                    res.status(404).json({
                        message : `access danied`
                    })
                }
               
            })
        }

    }

}