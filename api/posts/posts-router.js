// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

//Posts Endpoints
router.get('/', (req, res) => {
  Posts.find().then(result => {
    res.status(200).json(result);
  })
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id).then(result => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error retrieving post'});
  })
})

module.exports = router;