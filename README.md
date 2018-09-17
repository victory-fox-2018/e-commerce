# e-commerce
An E-commerce mockup website with Vue.js

Access the website at ````http://ecommerce.renaldypratama.xyz```` or API at ````http://api.renaldypratama.xyz/````

### REST API
List of user routes:

Route                   | HTTP   | Description                                                          
----------------------- | ------ | ----------------------------------------------
```` /api/users ````    | GET    | Get all the users                
```` /api/users ````    | POST   | Create a user                    
```` /api/users ````    | DELETE | Delete a user                   
```` /api/users ````    | PATCH  | Update a user with new info
```` /api/users/login ````    | POST  | Login with email & password

List of items routes:

Route                   | HTTP   | Description                                                          
----------------------- | ------ | ----------------------------------------------
```` /api/items ````    | GET    | Get all the items                
```` /api/items ````    | POST   | Create an item listing                    
```` /api/items ````    | DELETE | Delete an item                   
```` /api/items ````    | PATCH  | Update item info
```` /api/items/:id ````    | POST  | Assign item to a category

List of categories routes:

Route                   | HTTP   | Description                                                          
----------------------- | ------ | ----------------------------------------------
```` /api/categories ````    | GET    | Get all the categories               
```` /api/categories ````    | POST   | Create a category                   
```` /api/categories ````    | DELETE | Delete a category                
```` /api/categories ````    | PATCH  | Update category info

List of transactions routes:

Route                   | HTTP   | Description                                                          
----------------------- | ------ | ----------------------------------------------
```` /api/transactions ````    | GET    | Get all the transactions               
```` /api/transactions ````    | POST   | Create a transaction                   
```` /api/transactions ````    | DELETE | Delete a transaction

---
### Usage
With only npm:
````
npm install
nodemon app.js
````