const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongo = require('../database/connect');
const _db = mongo.getDb();
// declare axios for making http requests
const axios = require('axios');

/* GET api listing. */
router.get('/', (req, res) => {
  let db = res.app.locals._db;
    db.collection('users').find({}).toArray((err, result) => {
    res.send(result);
  });
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;