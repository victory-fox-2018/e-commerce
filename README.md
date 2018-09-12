# MyAPP e-commerce

## SERVER SIDE 

***

### USER

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /users/signup             | POST   | Registrasi User                                            |
| /users/signin             | POST   | Login user                                                 |
| /users/update/:id         | PUT    | Update User                                                |
| /users/delete/:id         | DELETE | Delete User                                                |

#### Field-field yang harus diisi ketika signup user

|           Field           |           Type Data           |   
|---------------------------|-------------------------------|
| name                      | String                        |
| gender                    | String                        |
| phoneNumber               | String                        |
| address                   | String                        |
| email                     | String                        |
| password                  | String                        |

#### Field-field yang harus diisi ketika signin user

|           Field           |           Type Data           |   
|---------------------------|-------------------------------|
| email                     | String                        |
| password                  | String                        |

```
Untuk update data user, menggunakan req.params.id,
dengan mengisikan data yang akan di update, diantaranya :
    name
    gender
    phoneNumber
    address
```

***

### ITEM

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /items                    | GET    | Find all data item                                         |
| /items/create             | POST   | Membuat data item                                          |
| /items/update/:id         | PUT    | Update data item                                           |
| /items/delete/:id         | DELETE | Delete data item                                           |

#### Field-field yang harus diisi ketika membuat item baru

|           Field           |           Type Data           |   
|---------------------------|-------------------------------|
| name                      | String                        |
| description               | String                        |
| price                     | Number                        |
| category                  | *Ref to categoryId            |

```
karena belum dibuat untuk tampilan untuk menambahkan item,
maka dapat dilakukan dengan menggunakan postman.
dengan mengisi field category dengan ID_CATEGORY yang sudah dibuat sebelumnya.
ket :
    category harus dibuat terlebih dahulu
```

***

### CATEGORY

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /categories               | GET    | Find all data category                                     |
| /categories/create        | POST   | Membuat data category                                      |
| /categories/update/:id    | PUT    | Update data category                                       |
| /categories/delete/:id    | DELETE | Delete data category                                       |

#### Field-field yang harus diisi ketika membuat category baru

|           Field           |           Type Data           |   
|---------------------------|-------------------------------|
| name                      | String                        |

***

### TRANSACTION

|           Route           |  HTTP  |                         Description                        |
|---------------------------|--------|------------------------------------------------------------|
| /categories/              | GET    | Find user transaction                                      |
| /categories/create        | POST   | Membuat data transaction                                   |


#### Field-field yang harus diisi ketika membuat transaction baru

|           Field           |           Type Data           |   
|---------------------------|-------------------------------|
| totalPrice                | Number                        |
| user                      | *Ref to userId                |
| item                      | [ *Ref to itemId ]            |

***


## TOOLS YANG DIGUNAKAN

* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [live-server](https://www.npmjs.com/package/live-server)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [express](https://www.npmjs.com/package/express)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [postman](https://www.getpostman.com)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [axios](https://www.npmjs.com/package/axios)
* [cors](https://www.npmjs.com/package/cors)