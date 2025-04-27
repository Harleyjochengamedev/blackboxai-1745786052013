const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Score = require('./models/score');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/physar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API to get top scores
app.get('/api/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ points: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

// API to submit a new score
app.post('/api/scores', async (req, res) => {
  try {
    const { name, points } = req.body;
    const score = new Score({ name, points });
    await score.save();
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
