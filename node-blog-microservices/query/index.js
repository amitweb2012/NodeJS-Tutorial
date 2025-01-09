// create a simple Query Service
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// handle events method with params type and data
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }
  if(type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
}
// get all posts
app.get('/posts', (req, res) => {
  return res.send(posts);
});

// receive events from event bus with type of event example: PostCreated, commentCreated, commentUpdated  
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  return res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');
  // call the pending events once query service is up and running
  const res = await axios.get('http://localhost:4005/events');
    for (let event of res.data) {
      console.log('Processing event:', event.type);

      handleEvent(event.type, event.data);
    }

});

