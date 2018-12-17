const express = require('express');
const router = express.Router();
const {Card, Product} = require('../schemas');
const uuid = require('uuid/v1');

router.get('/products', (req, res) => {
  const products = [
    {
      id: uuid(),
      image:
        'https://www.t-mobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-x/space-gray/Apple-iPhoneX-SpaceGray-1-3x.jpg',
      name: 'iphone',
      quantity: 10,
      price: 500,
      reviewIds: []
    },
    {
      id: uuid(),
      name: 'samsung',
      image:
        'https://images.samsung.com/is/image/samsung/my-galaxy-a8star-g885-sm-g885fzkdxme-frontblack-109007061?$PD_GALLERY_L_JPG$',
      quantity: 5,
      price: 400,
      reviewIds: []
    },
    {
      id: uuid(),
      name: 'nokia',
      image: 'https://icdn2.digitaltrends.com/image/nokia-7-1-prod-720x720.jpg',
      quantity: 20,
      price: 100,
      reviewIds: []
    },
    {
      id: uuid(),
      name: 'huawei',
      image:
        'https://i.gadgets360cdn.com/products/large/1521537947_635_huawei_nova_3e.jpg',
      quantity: 15,
      price: 300,
      reviewIds: []
    }
  ];
  Product.deleteMany({})
    .then(() => {
      Product.insertMany(products);
    })
    .then(docs => {
      res.send(docs);
    });
});

router.get('/cards', (req, res) => {
  const cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(
      new Card({
        number: parseInt(Math.random() * 8999999999999999 + 1000000000000000),
        cvv: parseInt(Math.random() * 899 + 100),
        month: parseInt(Math.random() * 11 + 1),
        year: parseInt(Math.random() * 4 + 18),
        holder: 'Card Holder',
        money: 3000
      })
    );
  }
  Card.insertMany(cards, (err, docs) => {
    res.json(docs);
  });
});

module.exports = router;
