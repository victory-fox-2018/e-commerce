const Transaction = require('../models/transaction')
const Item        = require('../models/item')
const { amount }  = require('../helpers') 

module.exports = {

    create: function(req,res){

        var carts = req.body.cart
        // console.log(req.userId)

        if(carts.length > 0){
            // console.log(carts)

            let temp = []

            for(let i = 0; i < carts.length; i++){
                for(let j = 0; j < carts[i].totalItem; j++){
                    temp.push(carts[i].idItem)
                }
            }

            let totalItem = temp
            amount(totalItem)
            .then(function(totalPrice){
                let dataTransaction = new Transaction({
                    totalPrice : totalPrice,
                    user : req.userId,
                    listItem : totalItem
                })

            return dataTransaction.save()
            })
            .then(function(transaction){
                res.status(200).json({
                    message : `Transaction success`
                })
            })

            
        } else {
            res.send(404).json({
                message : `carts is empty, c'mon buy something`
            })
        }

        
           
    }

}