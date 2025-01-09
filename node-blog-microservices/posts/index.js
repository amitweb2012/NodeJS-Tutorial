// create a simple Post Service
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// create an express app
const app = express();

// allow cross-origin requests
app.use(cors());

// express middleware
app.use(bodyParser.json());

// posts object to store all posts
const posts = {};

// get all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// create a post once submitted from frontend
app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  // called event bus to send the event to all services
  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id, title
      }
    });
  res.status(201).send(posts[id]); // send response once post is created
  
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: 'Error creating post' }); // send error response if post is not created
  }
});

// receive events from event bus with type of event example: PostCreated, commentCreated, commentUpdated
app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);
  return res.send({});
});

// listen on port 4000

app.listen(4000, () => {
  console.log('Listening on 4000');
});