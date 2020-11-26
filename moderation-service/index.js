const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
      await axios.post('http://event-bus-srv:8085/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }

    res.send({ status: 'OK' });
  } catch (e) {
    res.end(() => console.log(e.message));
  }
});

app.listen(8083, () => console.log('Listening on 8083'));
