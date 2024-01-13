let currentRound = 1;

function getRoundData(round) {
  fetch(`/getRoundData/${round}`)
    .then(response => response.json())
    .then(data => {
      displayPhotoParts(data.photoParts);
      displayOptions();
    })
    .catch(error => console.error('Error:', error));
}

function displayPhotoParts(parts) {
  const photoPartsContainer = document.getElementById('photo-parts');
  photoPartsContainer.innerHTML = '';

  parts.forEach((part, index) => {
    const img = document.createElement('img');
    img.src = part;
    img.alt = `Part ${index + 1}`;
    photoPartsContainer.appendChild(img);
  });
}

function displayOptions() {
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  for (let i = 1; i <= 4; i++) {
    const optionButton = document.createElement('button');
    optionButton.textContent = `Option ${i}`;
    optionButton.onclick = () => checkAnswer(i);
    optionsContainer.appendChild(optionButton);
  }
}

function checkAnswer(answer) {
  fetch(`/checkAnswer/${currentRound}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answer })
  })
    .then(response => response.json())
    .then(data => {
      if (data.correct) {
        alert('Correct answer! You earned 1 point.');
      } else {
        alert('Incorrect answer. Try again!');
      }

      currentRound++;
      if (currentRound <= 10) {
        getRoundData(currentRound);
      } else {
        alert('Game Over. Thank you for playing!');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Start the game
getRoundData(currentRound);
