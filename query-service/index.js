const express = require('express');
const cors = require('cors');
const { default: Axios } = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

// ? SCHEMA
// posts === {
// 'dasdsa': {
//  id: 'dsadsa',
//   title: 'dsadasdasd',
//   comments: [
//     {id: 'dsadsa', content: 'bfddffd'}
//    ]
//  }
// };

const handleEvent = (data, type) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', async (req, res) => res.send(posts));

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;
    handleEvent(data, type);
    res.send({ status: 'OK' });
  } catch (e) {
    res.end(() => console.log(e.message));
  }
});

app.listen(8082, async () => {
  console.log('Listening on 8082');

  const { data } = await Axios.get('http://event-bus-srv:8085/events');

  for (let event of data) {
    console.log('Processing event', event.type);
    handleEvent(event.data, event.type);
  }
});
