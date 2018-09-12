const Item = require('../models/Item');
const Category = require('../models/Category')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId
const { verify, sign } = require('../helpers/jwt')


module.exports = {
    buyItem: function (req, res) {
        let token = req.headers.token
        let itemsId = req.body.itemId
        let newTransaction
        for(let i = 0 ; i < itemsId.length ; i++){
            itemsId[i] = ObjectId(itemsId[i])
        }

        verify(token)
        .then(decoded =>{
            // User.findById
            // console.log(decoded);
            return User.findById(ObjectId(decoded.id))
        })
        .then(user =>{
            newTransaction = new Transaction({
                totalPrice: Number(req.body.total),
                userId: ObjectId(user._id),
                itemsId: itemsId
            })
            user.transaction.push(newTransaction._id)
            return user.save()
        })
        .then(user =>{
            newTransaction.save()
        })
        .then(transaction =>{
            console.log(transaction)
            res.status(200).json({
                message: 'Successfully Create Transaction',
                data: transaction
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })

        // console.log(itemsId.length)
        // verify(token)
        // .then(decoded =>{
        //     return Item.find({
        //         '_id': {
        //             $in: itemsId
        //         }
        //     })
        // })
        // .then(items =>{
        //     console.log(items)
        // })
        // verify(token)
        //     .then(decoded => {
        //         if (decoded) {
        //             user = decoded
        //             let items = req.body.itemId
        //             let itemsId = []
        //             if (typeof items == 'object') {
        //                 items.forEach(item => {
        //                     itemsId.push(ObjectId(item))
        //                 })
        //                 return Item.find({
        //                     '_id': {
        //                         $in: itemsId
        //                     }
        //                 })
        //             } else {
        //                 return Item.find({
        //                     '_id': {
        //                         $in: items
        //                     }
        //                 })
        //             }
        //         } else {
        //             res.status(401).json({
        //                 message: 'USER NOT FOUND'
        //             })
        //         }
        //     })
        //     .then(items => {
        //         newTransaction = new Transaction({
        //             totalPrice: 0,
        //             userId: ObjectId(user.id)

        //         })
        //         items.forEach(item => {
        //             newTransaction.totalPrice += Number(item.price)
        //             newTransaction.itemsId.push(ObjectId(item._id))
        //         })
        //         return User.findById(ObjectId(user.id))
        //         // return newTransaction.save()

        //     })
        //     .then(user =>{
        //         user.transaction.push(ObjectId(newTransaction._id))
        //         user.save()
        //     })
        //     .then(user =>{
        //         newTransaction.save()
        //     })
        //     .then(newTransaction => {
        //         res.status(200).json(newTransaction)
        //     })
        //     .catch(err => {
        //         res.status(500).json(err)
        //     })
    },

    getItem: function(req,res){
        Item.find().then(data =>{ res.send(data)})
    },

    getCategory: function(req,res){
        Category.find().then(data => { res.send(data) })
    },

    addItem: function(req,res){
        // body: name, price, description, categoryId, 
        let name = req.body.name
        let category = req.body.category
        let price = Number(req.body.price.split(' ').join(''))

        if(name && category){
            let newItem = new Item({
                name: name,
                price: price,
                description: req.body.description,
                category: category,
            })
            // console.log(price)
            Category
                .findById(ObjectId(category))
                .then(category =>{
                    if(category){
                        category.items.push(newItem._id)
                        return category.save()
                    }else{
                        res.status(404).json({
                            message: 'Tidak ada category'
                        })
                    }
                })
                .then(updatedCategory =>{
                    return newItem.save()
                })
                .then(result =>{
                    res.status(200).json({
                        message: `Berhasil Membuat Item ${name}`,
                        data: result
                    })
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({
                        message: err
                    })
                })
        }else{
            res.status(401).json({
                message: 'Name dan category harus di isi'
            })
        }
        // body: name, price, description, categoryId
    },

    getItemByCategory: function(req,res){
        let idCategory = req.query.id
        Category
            .findById(ObjectId(idCategory)).populate('items')
            .then(category =>{
                let items = category.items
                if(items){
                    res.status(200).json(items)
                }else{
                    res.status(404).json({message: 'Category tidak ditemukan'})
                }
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
}