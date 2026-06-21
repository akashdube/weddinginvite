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

let bubblesPopped = 0;
let timer = 20;
let gameInterval;
let countdownInterval;
let confettiParticles = [];
const targetScore = 8;
const bubbleCount = 12;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const x = randomBetween(8, 92);
  const y = randomBetween(10, 80);
  bubble.style.left = `${x}%`;
  bubble.style.top = `${y}%`;
  bubble.style.opacity = `${randomBetween(0.7, 1)}`;
  bubble.addEventListener('click', () => popBubble(bubble));
  return bubble;
}

function populateGameBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < bubbleCount; i += 1) {
    gameBoard.appendChild(createBubble());
  }
}

function updateScore() {
  scoreLabel.textContent = `${bubblesPopped} / ${targetScore} bubbles`;
}

function updateCountdown() {
  countdownLabel.textContent = `${timer} sec`;
}

function popBubble(bubble) {
  if (bubblesPopped >= targetScore) return;
  const x = parseFloat(bubble.style.left);
  const y = parseFloat(bubble.style.top);
  bubble.style.transform = 'translate(-50%, -50%) scale(0.3)';
  bubble.style.opacity = '0';
  setTimeout(() => bubble.remove(), 160);
  bubblesPopped += 1;
  updateScore();
  addConfettiBurst(x, y);
  if (bubblesPopped >= targetScore) {
    endGame(true);
  }
}

function resetGame() {
  bubblesPopped = 0;
  timer = 20;
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
