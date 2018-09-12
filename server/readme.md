# API DOCUMENTATION

### List of routes:

| Route                 |  HTTP  | Desription                   |
| --------------------- |:------:| ---------------------------- |
| /login                | POST   | body: email, password        |
| /register             | POST   | body: name, email, password  |
| /buy-items            | POST   | body: itemId, headers: token |
| /logout               | GET    |                              |
| /get-items            | GET    |                              |
| /get-category         | GET    |                              |
| /getItemByCategory    | GET    | query: id                    |
| /get-transaction      | GET    | headers: token               |


http://api-e-commerce.minzard.xyz/