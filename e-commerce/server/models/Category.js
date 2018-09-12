const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({ 
    name: { type: String, unique: true, lowercase: true}
})

categorySchema.pre('save', function(next) {
    if (this.name !== 'asrul') {
      next();
    } else {
        throw new Error('something went wrong')
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category

// By Asrul Harahap - 2018