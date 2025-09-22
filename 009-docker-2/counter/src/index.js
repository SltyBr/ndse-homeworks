const express = require('express');
const redis = require('redis');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  client.connect();
})();

app.get('/counter/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const value = await client.get(bookId);
    const num = value === null ? 0 : parseInt(value, 10);
    res.json({ bookId, value: num });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error123' });
  }
});

app.post('/counter/:bookId/incr', async (req, res) => {
  try {
    const { bookId } = req.params;
    await client.incr(bookId);
    res.status(200).json({});
  } catch {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
