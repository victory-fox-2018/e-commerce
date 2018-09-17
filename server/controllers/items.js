const Item = require('../models/Item');

module.exports = {
  create: (req, res) => {
    const newItem = new Item({
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
    });

    newItem
      .save()
      .then(Item => {
        res.status(200).json({
          message: `${Item.name} has been insert into Items`
        })
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  },

  update: (req, res) => {
    Item
      .where({_id: req.params.id})
      .update({
        name: req.body.name,
        categoryId: req.body.categoryId,
        price: req.body.price
      })
      .then(updated => {
        if(updated.n) {
          res.status(200).json({
            message: `Item has been updated`
          })
        } else {
          res.status(400).json({
            message: `Item not found`
          })
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  },

  remove: (req, res) => {
    Item
      .deleteOne({_id: req.params.id})
      .then(deleted => {
        if(deleted.n) {
          res.status(200).json({
            message: `Item has been deleted`
          })
        } else {
          res.status(400).json({
            message: `Item not found`
          })
        }
      })
      .catch(err => {
        console.log('error');
        
        res.status(500).json({ message: err });
      })
  },

  read: (req, res) => {
    Item 
      .find({})
      .populate('categoryId')
      .then(items => {
        res.status(200).json({ items });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  },

  filter: (req, res) => {
    Item
    .find({ categoryId: req.params.categoryId })
    .then(items => {
      console.log(items);
      
      res.status(200).json({items});
    })
    .catch(err => {
      res.status(500).json({message: err.message});
    })
    
  },

  search: (req, res) => {
    console.log(req.params);
    console.log(req.body);
    Item
    .find({
      name: name.search(req.body.name)
      })
      .then(result => {
        console.log(result);
        
      })
      .catch(err => {
        console.log(err);
        
      })
    
  }

};