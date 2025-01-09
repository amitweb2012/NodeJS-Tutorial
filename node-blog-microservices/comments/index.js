// create a simple comment Service
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

const commentsByPostId = {}; // store comments by post id

// get all comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// create a comment once submitted from frontend based on post id and comment content
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' }); // but status is pending as default

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);

  // called event bus to send the event to all services with type commentCreated

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    }
  });
});

// receive events from event bus with type of event example: CommentModerated
app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;

    // called event bus to send the event to all services with type commentUpdated

    axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      }
    });
  }

  return res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});

