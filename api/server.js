// imports
const express = require('express');
const postsRouter = require('./posts/posts-router');

//create server
const server = express();
server.use(express.json());

//Use router
server.use('/api/posts', postsRouter);



module.exports = server;