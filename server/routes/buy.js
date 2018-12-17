const router = require('express').Router();
const {Card, Product} = require('../schemas');
const {verifyToken} = require('../utils');

router.post('/', verifyToken, (req, res) => {
  const {cardInfo, order} = req.body;
  const totalSum = order.reduce(
    (acc, {orderedQuantity, price}) => acc + orderedQuantity * price,
    0
  );
  Card.findOne({...cardInfo})
    .then(card => {
      if (card === null) throw 'no such card';
      else if (card.money < totalSum) throw 'not enough money';
      else return card;
    })
    .then(card => {
      card.money = card.money - totalSum;
      return card.save();
    })
    .then(() => {
      const orderIds = order.map(or => or.id);
      return Product.find({
        id: {$in: orderIds}
      });
    })
    .then(products => {
      let count = 0;
      return new Promise((resolve, reject) => {
        products.forEach((product, i) => {
          product.quantity = product.quantity - order[i].orderedQuantity;
          product.save((err, product) => {
            count++;
            if (count === order.length) {
              resolve(products);
            }
          });
        });
      });
    })
    .then(newProducts => res.json({newProducts}))
    .catch(err => res.json({err}));
});

module.exports = router;
