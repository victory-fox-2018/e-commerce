const User = require('../models/User');
const { encrypt, decrypt } = require('../helpers/hashPassword')
const { sign } = require('../helpers/jwt')

module.exports = {
    register:  function (req, res) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: encrypt(req.body.password)
        })
    
        newUser.save()
        .then(success =>{
            res.status(200).json({
                message: 'Successfully Register'
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },
    
    login: function (req, res) {
        let dataUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({email:dataUser.email})
        .then(userDb =>{
            let hash = userDb.password
            if(decrypt(dataUser.password, hash)){
                return sign(userDb)
    
            }else{
                res.status(402).json({
                    message: 'WRONG EMAIL OR PASSWORD'
                })
            }
        })
        .then(token =>{
            res.status(200).json({
                message: 'Sucessfully Login',
                token: token
            })
        })
        .catch(err =>{
            res.status(402).json({
                message: 'WRONG EMAIL OR PASSWORD'
            })
        })
    },

    getUser: function(req,res){
        
    }

}