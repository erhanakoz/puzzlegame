const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const photos = [
  ['https://www.pixelstalk.net/wp-content/uploads/2016/07/Hollywood-Female-Celebrities-Wallpapers-HD.jpg']
  // Replace these placeholder URLs with actual celebrity photo URLs
  // Each URL should point to an image divided into 4 parts
  // Example: ['part1.jpg', 'part2.jpg', 'part3.jpg', 'part4.jpg']
  // ...
];

app.get('/getRoundData/:round', (req, res) => {
  const round = parseInt(req.params.round);
  const currentPhoto = photos[round - 1];

  if (!currentPhoto) {
    res.status(404).json({ error: 'Round not found' });
  } else {
    res.json({ photoParts: currentPhoto });
  }
});

app.post('/checkAnswer/:round', (req, res) => {
  const round = parseInt(req.params.round);
  const correctOption = round % 4; // Assuming correct option is always the same as the round number
  const userAnswer = req.body.answer;

  if (userAnswer === correctOption) {
    res.json({ correct: true });
  } else {
    res.json({ correct: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
