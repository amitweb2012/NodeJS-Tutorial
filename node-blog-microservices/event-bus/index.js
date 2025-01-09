// create a simple Event Bus Service
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  // Add event to events array to handle it later if one of the services is down
  events.push(event);

  // Send event to all services
  axios.post('http://localhost:4000/events', event).catch((err) => {  console.log(err.message); });
  axios.post('http://localhost:4001/events', event).catch((err) => {  console.log(err.message); });
  axios.post('http://localhost:4002/events', event).catch((err) => {  console.log(err.message); });
  axios.post('http://localhost:4003/events', event).catch((err) => {  console.log(err.message); });

  // Send response
  return res.send({ status: 'OK' });
});

// Get all events

app.get('/events', (req, res) => {
  res.send(events);
});
// Listen on port 4005

app.listen(4005, () => {
  console.log('Listening on 4005');
});