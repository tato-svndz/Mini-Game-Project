let count = 0;
let timeLeft = 5 * 1000; // 5 seconds in milliseconds
let button = document.getElementById('tap-btn');
let yourScore = document.getElementById('score');
let yourRecord = document.getElementById('record');
let scoreArray = [];
let tapSound = document.getElementById('tap-sound');
let counter = document.getElementById('counter');
let countdownInterval;
let resetBtn = document.getElementById('reset-btn');

function playTapSound() {
  const audio = new Audio('audio/tap-sfx.wav');
  audio.play();
}

function updateCounter() {
  let seconds = Math.floor(timeLeft / 1000);
  let milliseconds = timeLeft % 1000;
  seconds = String(seconds).padStart(2, '0');
  milliseconds = String(milliseconds).padStart(3, '0').slice(0, 2);
  counter.innerHTML = `${seconds}:${milliseconds}`;
}


function startCountdown() {
  if (!countdownInterval) {
    countdownInterval = setInterval(function () {
      if (timeLeft > 0) {
        timeLeft -= 10;
        updateCounter();
      } else {
        clearInterval(countdownInterval);
        button.disabled = true;
        scoreArray.push(count);
        let highestScore = Math.max(...scoreArray);
        yourScore.innerHTML = `Your Score: ${count}`;
        yourRecord.innerHTML = `Your Record: ${highestScore}`;
        resetBtn.style.opacity = '1';
        resetBtn.style.pointerEvents = 'auto';
      }
    }, 10);
  }
}


function tapCount() {
  if (timeLeft > 0) {
    count++;
    button.innerHTML = count;
    playTapSound();
  }
}

function reset() {
  clearInterval(countdownInterval);
  count = 0;
  timeLeft = 5 * 1000;
  button.disabled = false;
  button.innerHTML = 'TAP';
  yourScore.innerHTML = 'Your Score:';
  resetBtn.style.opacity = '0';
  resetBtn.style.pointerEvents = 'none';
  updateCounter();
  countdownInterval = null;
}

button.addEventListener('click', startCountdown);