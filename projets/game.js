const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');

const shipImage = new Image();
const asteroidImage = new Image();
const shooterImage = new Image();

shipImage.src = '../images/player.png'; // Replace with your image path
asteroidImage.src = '../images/asteroid.png'; // Replace with your image path
shooterImage.src = '../images/enemy.png'; // Replace with your image path

const shipSize = 40;
let ship = { x: canvas.width / 2 - shipSize / 2, y: canvas.height - shipSize - 10, width: shipSize, height: shipSize };
let bullets = [];
let enemies = [];
let enemyBullets = [];
let score = 0;
let gameRunning = false;
let enemyCreationInterval = 1000;
let bulletSpeed = 5;
let enemySpeed = 2;
let enemyBulletSpeed = 4;

function drawShip() {
    ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
}

function drawBullets() {
    ctx.fillStyle = '#fff';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

function drawEnemyBullets() {
    ctx.fillStyle = '#ff0';
    enemyBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

function drawEnemies() {
    enemies.forEach(enemy => {
        const img = enemy.type === 'shooter' ? shooterImage : asteroidImage;
        ctx.drawImage(img, enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function moveEnemyBullets() {
    enemyBullets.forEach((bullet, index) => {
        bullet.y += enemyBulletSpeed;
        if (bullet.y > canvas.height) {
            enemyBullets.splice(index, 1);
        }
    });
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemySpeed;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }

        if (enemy.type === 'shooter' && Math.random() < 0.01) {
            enemyBullets.push({ x: enemy.x + enemy.width / 2 - 2.5, y: enemy.y + enemy.height, width: 5, height: 10 });
        }
    });
}

function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 10 > enemy.y) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 10;
                scoreBoard.textContent = 'Score: ' + score;
                adjustDifficulty();
            }
        });
    });

    enemies.forEach(enemy => {
        if (ship.x < enemy.x + enemy.width &&
            ship.x + ship.width > enemy.x &&
            ship.y < enemy.y + enemy.height &&
            ship.y + ship.height > enemy.y) {
            gameRunning = false;
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }
    });

    enemyBullets.forEach((bullet, bulletIndex) => {
        if (bullet.x < ship.x + ship.width &&
            bullet.x + 5 > ship.x &&
            bullet.y < ship.y + ship.height &&
            bullet.y + 10 > ship.y) {
            gameRunning = false;
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }
    });
}

function createEnemy() {
    const x = Math.random() * (canvas.width - shipSize);
    const type = Math.random() < 0.5 ? 'asteroid' : 'shooter';
    enemies.push({ x: x, y: 0, width: shipSize, height: shipSize, type: type });
}

function moveShip(event) {
    if (event.key === 'ArrowLeft' && ship.x > 0) {
        ship.x -= 20;
    }
    if (event.key === 'ArrowRight' && ship.x + ship.width < canvas.width) {
        ship.x += 20;
    }
    if (event.key === ' ') {
        bullets.push({ x: ship.x + ship.width / 2 - 2.5, y: ship.y, width: 5, height: 10 });
    }
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShip();
    drawBullets();
    drawEnemies();
    drawEnemyBullets();
    moveBullets();
    moveEnemies();
    moveEnemyBullets();
    checkCollisions();

    requestAnimationFrame(gameLoop);
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    document.addEventListener('keydown', moveShip);
    setInterval(createEnemy, enemyCreationInterval);
    gameLoop();
}

function adjustDifficulty() {
    if (score >= 100 && score < 200) {
        enemyCreationInterval = 750;
        bulletSpeed = 7;
        enemySpeed = 3;
        enemyBulletSpeed = 5;
    } else if (score >= 200) {
        enemyCreationInterval = 500;
        bulletSpeed = 9;
        enemySpeed = 4;
        enemyBulletSpeed = 6;
    }
}

function initialDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
    drawBullets();
    drawEnemies();
    drawEnemyBullets();
}

// Initial drawing before the game starts
initialDraw();

canvas.addEventListener('click', startGame);