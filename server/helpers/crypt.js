require('dotenv').config();
const crypto = require('crypto');

module.exports = (password) => {
  const hash = crypto.createHmac('sha256', process.env.CRYPT_SECRET_KEY)
                    .update(password)
                    .digest('hex');
  return hash;
}