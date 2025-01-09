const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id, title
      }
    });
  res.status(201).send(posts[id]);
  
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: 'Error creating post' });
  }
});

app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);
  return res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});