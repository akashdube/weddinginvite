const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const replayButton = document.getElementById('replayButton');
const gameStage = document.getElementById('gameStage');
const inviteStage = document.getElementById('inviteStage');
const gameBoard = document.getElementById('gameBoard');
const scoreLabel = document.getElementById('score');
const countdownLabel = document.getElementById('countdown');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

let heartsCollected = 0;
let timer = 15;
let gameInterval;
let countdownInterval;
let confettiParticles = [];
const targetScore = 5;
const heartCount = 7;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  const x = randomBetween(12, 88);
  const y = randomBetween(12, 78);
  heart.style.left = `${x}%`;
  heart.style.top = `${y}%`;
  heart.style.opacity = `${randomBetween(0.72, 1)}`;
  heart.addEventListener('click', () => collectHeart(heart));
  return heart;
}

function populateGameBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < heartCount; i += 1) {
    gameBoard.appendChild(createHeart());
  }
}

function updateScore() {
  scoreLabel.textContent = `${heartsCollected} / ${targetScore} hearts`;
}

function updateCountdown() {
  countdownLabel.textContent = `${timer} sec`;
}

function collectHeart(heart) {
  if (heartsCollected >= targetScore) return;
  heart.remove();
  heartsCollected += 1;
  updateScore();
  addConfettiBurst(parseFloat(heart.style.left), parseFloat(heart.style.top));
  if (heartsCollected >= targetScore) {
    endGame(true);
  }
}

function resetGame() {
  heartsCollected = 0;
  timer = 15;
  updateScore();
  updateCountdown();
  populateGameBoard();
  startCountdown();
}

function showStage(stage) {
  [gameStage, inviteStage].forEach((section) => section.classList.add('stage-hidden'));
  stage.classList.remove('stage-hidden');
}

function endGame(won) {
  clearInterval(countdownInterval);
  if (won) {
    showStage(inviteStage);
    triggerConfetti();
  } else {
    alert('Time ran out! Try again to reveal the invitation.');
    resetGame();
  }
}

function startCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    timer -= 1;
    updateCountdown();
    if (timer <= 0) {
      clearInterval(countdownInterval);
      endGame(false);
    }
  }, 1000);
}

function startGame() {
  showStage(gameStage);
  resetGame();
}

function addConfettiBurst(xPercent, yPercent) {
  for (let i = 0; i < 20; i += 1) {
    confettiParticles.push({
      x: (xPercent / 100) * window.innerWidth,
      y: (yPercent / 100) * window.innerHeight,
      vx: randomBetween(-2.5, 2.5),
      vy: randomBetween(-5, -1),
      size: randomBetween(4, 10),
      color: `hsl(${randomBetween(330, 360)}, 100%, ${randomBetween(60, 80)}%)`,
      alpha: 1,
    });
  }
}

function triggerConfetti() {
  for (let i = 0; i < 100; i += 1) {
    confettiParticles.push({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight / 2),
      vx: randomBetween(-3, 3),
      vy: randomBetween(1, 5),
      size: randomBetween(5, 12),
      color: `hsl(${randomBetween(330, 360)}, 100%, ${randomBetween(65, 85)}%)`,
      alpha: 1,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles = confettiParticles.filter((particle) => particle.alpha > 0);
  confettiParticles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.07;
    particle.alpha -= 0.02;
    ctx.fillStyle = particle.color.replace('hsl(', 'hsla(').replace(')', `, ${particle.alpha})`);
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawConfetti);
}

window.addEventListener('resize', resizeCanvas);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
replayButton.addEventListener('click', startGame);

resizeCanvas();
drawConfetti();
