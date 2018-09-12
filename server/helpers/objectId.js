const mongooese = require('mongoose');
const objectId = mongooese.Types.ObjectId;

module.exports = (id) => {
  return objectId(id);
}