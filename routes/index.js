const express = require('express');
const router  = express.Router();
const Post = require('../models/post');

// get all posts
router.get('/posts', (req, res, next) => {
  Post.find({}, function(err, posts) {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    }

    res.json(posts)
  });
});

// get tokens
router.get('/tokens', (req, res, next) => {
  res.json({
    linkedIn: process.env.LINKED_IN
  })
});



//Create new post
router.post('/posts', (req,res,next)=>{
    let body = req.body;

    console.log(req.body)

    let newPost = new Post(body);

    newPost.save((err, doc)=>{
        if(err) {
          console.log(err)
          res.sendStatus(500)
        }

        //success
        res.json(doc)
    })
});

module.exports = router;
