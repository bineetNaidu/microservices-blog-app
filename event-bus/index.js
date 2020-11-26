const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
  try {
    const event = req.body;

    events.push(event);

    await axios.post('http://posts-clusterip-srv:8080/events', event);
    await axios.post('http://comments-srv:8081/events', event);
    await axios.post('http://query-srv:8082/events', event);
    await axios.post('http://moderation-srv:8083/events', event);

    res.send({ status: 'OK' });
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

app.get('/events', (_, res) => res.send(events));

app.listen(8085, () => console.log('EVENT BUS Listening on 8085'));
