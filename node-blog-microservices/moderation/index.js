// Module: Moderation Service
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// receive events from event bus with type of event example: CommentCreated and change status based on content example if content includes 'orange' then status is rejected 
app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      }
    });
  }
  return res.send({ status: 'OK' });
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});