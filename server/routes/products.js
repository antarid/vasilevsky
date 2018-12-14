const router = require('express').Router();
const {Product} = require('../schemas');
const {verifyToken} = require('../utils');
const uuid = require('uuid/v1');

router.get('/', (req, res) => {
  const {limit, skip} = req.query;
  console.log(limit);
  Product.find({})
    .skip(+skip)
    .limit(+limit)
    .then(docs => res.send(docs), err => res.send(err));
});

router.get('/:productId', (req, res) => {
  const {productId} = req.params;
  Product.findOne({id: productId}).then(doc => {
    if (doc == null) res.sendStatus(404);
    else res.send(doc);
  });
});

router.post('/:productId/buy', verifyToken, (req, res) => {
  res.send(req.authData);
});

module.exports = router;
