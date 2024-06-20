// Create web server and listen on port 3000
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments.json');

app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// POST /comments
app.post('/comments', (req, res) => {
  const { author, message } = req.body;
  const id = comments.length + 1;
  const newComment = { id, author, message };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const { author, message } = req.body;
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    comment.author = author;
    comment.message = message;
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});dgi