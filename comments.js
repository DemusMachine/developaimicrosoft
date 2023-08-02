// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto'); // randomBytes is a function that generates a random string of characters
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store comments in memory
const commentsByPostId = {};

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []); // Return an empty array if no comments
});

// Create comments
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // Generate random ID
  const { content } = req.body; // Get content from request body

  // Get comments from commentsByPostId
  const comments = commentsByPostId[req.params.id] || [];

  // Push new comment into comments array
  comments.push({ id: commentId, content, status: 'pending' });

  // Update commentsByPostId
  commentsByPostId[req.params.id] = comments;

  //