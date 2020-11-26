const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  try {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };

    await axios
      .post('http://event-bus-srv:8085/events', {
        type: 'PostCreated',
        data: {
          id,
          title,
        },
      })
      .catch((e) => console.log(e.message));

    res.status(201).send(posts[id]);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(8080, () => console.log('Listening on 8080'));
