const router = require('express').Router();
const {User} = require('../schemas');
const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  User.findOne({email, password})
    .then(user => {
      if (user) {
        const token = jwt.sign(
          {id: user.id, name: user.name, email: user.password},
          'secretkey'
        );
        return {email: user.email, name: user.name, token};
      } else throw 'invalid email password pair';
    })
    .then(data => {
      res.json({...data});
    })
    .catch(err => res.json({err}));
});

router.post('/decode', (req, res) => {
  const {token} = req.body;
  try {
    const decoded = jwt.verify(token, 'secretkey');
    res.send({...decoded});
  } catch (err) {
    res.json({err});
  }
});

router.post('/signup', (req, res) => {
  const {email, password, name} = req.body;
  const user = {...req.body, id: uuid()};
  User.countDocuments({email})
    .then(count => {
      if (count === 0) return User.create(user);
      else throw 'user with such email already exists';
    })
    .then(doc =>
      jwt.sign({email: user.email, id: user.id, name: user.name}, 'secretkey')
    )
    .then(token => res.json({email: user.email, name: user.name, token}))
    .catch(err => res.json({err}));
});

module.exports = router;
