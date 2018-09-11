# e-commerce

List of Customer routes:

  Route                  | HTTP    |            Description                                     
-------------------------|---------|------------------------------------------------------------
  api/customers/signin   | POST    | Signed in as a customer
  api/customers/         | POST    | Regist / create a new customer
  api/customers/         | GET     | Display all customers
  api/customers/:id      | PUT     | Update a customer by Customer ID
  api/customers/:id      | DELETE  | Delete a customer by Customer ID

List of Item routes:

  Route           | HTTP    |            Description                                     
------------------|---------|------------------------------------------------------------
  api/items/      | GET     | Display all items
  api/items/      | POST    | Create a new items
  api/items/:id   | PUT     | Update a items with new info based Item ID
  api/items/:id   | DELETE  | Delete a items based Item ID

List of Category routes:

  Route                 | HTTP    |            Description                                     
------------------------|---------|------------------------------------------------------------
  api/categories/       | GET     | Display all categories
  api/categories/       | POST    | Create a new category
  api/categories/:id    | PUT     | Update a category with new info based Category ID
  api/categories/:id    | DELETE  | Delete a category based Category ID

List of Cart routes:

  Route            | HTTP    |            Description                                     
-------------------|---------|-----------------------------------------
  api/carts/       | GET     | Display all carts
  api/carts/       | POST    | Create a new cart