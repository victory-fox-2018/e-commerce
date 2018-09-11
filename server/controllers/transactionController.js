const Transaction = require('../models/transaction')
const Item        = require('../models/item')
const { amount }  = require('../helpers') 

module.exports = {

    create: function(req,res){
        let totalItem = req.body.listItem
        amount(totalItem)
        .then(function(totalPrice){
            let dataTransaction = new Transaction({
                totalPrice : totalPrice,
                user : req.body.user,
                listItem : totalItem
            })

        return dataTransaction.save()
        })
        .then(function(transaction){
            res.status(200).json({
                message : `Transaction success`
            })
        })
           
    }

}