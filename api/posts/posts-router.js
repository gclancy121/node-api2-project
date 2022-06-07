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
      res.status(404).json({message: 'does not exist'});
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error retrieving post'});
  })
})

router.post('/', (req, res) => {
  if (req.body.title == null || req.body.contents == null) {
    res.status(400);
    res.end();
  } else {
    Posts.insert(req.body).then(result => {
      Posts.findById(result.id).then(q => {
        res.status(201).json(q);
      })
     });
  }
});

router.put('/:id',(req, res) => {
  const id = req.params.id;
  Posts.update(id, req.body).then(result => {
    if (result === 1) {
      Posts.findById(id).then(data => {
        res.status(200).json(data);
      })
    }
  })
})

router.delete('/:id', (req, res) => {
  Posts.findById(req.params.id).then(result => {
    if (result != undefined || result != null) {
      Posts.remove(result.id).then(
        res.status(200).json(result));
    } else if (result == null) {
      res.status(404).json({message: 'does not exist'})
    } else {
      res.status(500).json({message: 'error'})
    }
  })
})

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id).then(result => {
    res.json(result);
  })
})

module.exports = router;