const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const path = require('path');
const axios = require('axios');

/* GET api listing. */
router.get('/', (req, res) => {
  let db = res.app.locals._db;
  db.collection('users').find({}).toArray((err, result) => {
    res.send(result);
  });
});

/* POST api listing. */
//using get request for testing only change to router.post afterwards
router.get('/register', (req, res) => {
  let db = res.app.locals._db;
  // const username = req.body.username;
  // const password = req.body.password;
  const username = 'william704';
  const password = 'myPassword';

  //check if user already exists
  db.collection('users').find({'username': username}).toArray((err, result) => {
    
    let userExists = result.length == 0;
    
    if(userExists) {
      //hash password with salt of 10
      bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash);
        //create user document
        let user = {
          'username': username,
          'password': hash
        }
        //insert user and redirect to application
        db.collection('users').insertOne(user, (err, result) => {
          if(err) throw err;
          res.redirect('/');
        })
      });
    }else {
      res.send({
        'code': 1000,
        'message': 'User already exists'
      })
    }
  });

});

router.get('/login', (req, res) => {
  let db = res.app.locals._db;
  // const username = req.body.username;
  // const password == req.body.password;
  const username = 'william704';
  const password = 'myPassword';

  db.collection('users').find({'username': username}).toArray((err, result) => {
    
    let userExists = result.length > 0;
    if(userExists) {
      let dbPassword = result[0].password;

      bcrypt.compare(password, dbPassword, function(err, hashRes) {
        if(hashRes) {
          res.redirect('/');
        } else {
          res.send({
            'code': 1001,
            'message': 'Incorrect password'
          });
        } 
      });

    }else {
      res.send({
        'code': 1002,
        'message': 'User doesn\'t exist'
      })
    }

  });

})

module.exports = router;