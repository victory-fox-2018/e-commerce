const router = require('express').Router();
const { authen } = require('../helpers/')
const { register, login, getUser } = require('../controllers/user')
const { buyItem, getItem, getCategory, addItem, getItemByCategory } = require('../controllers/items')
const { getTransaction } = require('../controllers/transaction')

/*  Login
    body: email, password
*/
router.post('/login', login)


/*  Register
    body: name, email, password
*/
router.post('/register', register) 


/*  Buy Item
    headers: token,
    body: itemId
*/
router.post('/buy-items', authen, buyItem)


// logout
router.get('/logout', logout)


// Get Item
router.get('/get-items', getItem )


/*  Add Item
body: name, price, description, categoryId, 
*/
// router.post('/add-item', addItem)


// Get Category
router.get('/get-category', getCategory)


/*  Get Item By Category
    Query: id
*/
router.get('/getItemByCategory', getItemByCategory)


// Get Transaction
router.get('/get-transaction', authen, getTransaction)




module.exports = router


/*
Category
[
    {
        "items": [],
        "_id": "5b96968670f4b60e02dd222d",
        "name": "Sepeda",
        "__v": 0
    },
    {
        "items": [],
        "_id": "5b96969070f4b60e02dd222e",
        "name": "Baju",
        "__v": 0
    },
    {
        "items": [],
        "_id": "5b9696a070f4b60e02dd222f",
        "name": "Celana",
        "__v": 0
    }
]

Item
[
    {
        "userId": [],
        "_id": "5b96998c0c7aae1187c51afb",
        "name": "Fixie",
        "price": 1000000,
        "description": "Sepeda fixie murah meriah, nego tipis aja ya bro",
        "category": "5b96968670f4b60e02dd222d",
        "createdAt": "2018-09-10T16:19:24.606Z",
        "updatedAt": "2018-09-10T16:19:24.606Z",
        "__v": 0
    },
    {
        "userId": [],
        "_id": "5b9699a30c7aae1187c51afc",
        "name": "Polygon",
        "price": 2000000,
        "description": "Sepeda gunung enak di bawa car free day",
        "category": "5b96968670f4b60e02dd222d",
        "createdAt": "2018-09-10T16:19:47.891Z",
        "updatedAt": "2018-09-10T16:19:47.891Z",
        "__v": 0
    }
]
*/