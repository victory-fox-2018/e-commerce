require('dotenv').config();
const bcrypt = require('bcrypt');
module.exports = {
    encrypt: function(password){
        var hash = bcrypt.hashSync(password, Number(process.env.SALT));
        
        return hash
    },
    
    decrypt: function(password, hash){
        let decrypt = bcrypt.compareSync(password, hash);

        return decrypt
    }
}