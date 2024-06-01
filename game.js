function waitForCanvas() {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        initializeGame(canvas);
    } else {
        setTimeout(waitForCanvas, 100); // Réessayer après 100ms
    }
}

function initializeGame(canvas) {
    const ctx = canvas.getContext('2d');
    const scoreBoard = document.getElementById('scoreBoard');

    const shipImage = new Image();
    const asteroidImage = new Image();
    const shooterImage = new Image();

    shipImage.src = 'images/player.png'; // Remplacez par le chemin de votre image
    asteroidImage.src = 'images/asteroid.png'; // Remplacez par le chemin de votre image
    shooterImage.src = 'images/enemy.png'; // Remplacez par le chemin de votre image

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
        ctx.fillStyle = '#000000';
        bullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, 5, 10);
        });
    }

    function drawEnemyBullets() {
        ctx.fillStyle = '#000000';
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
                // En fonction du type d'ennemi, le score est diminué
                if (enemy.type === 'asteroid') {
                    score -= 5;
                } else if (enemy.type === 'shooter') {
                    score -= 10;
                }
                // Mise à jour de l'affichage du tableau des scores
                scoreBoard.textContent = 'Score: ' + score;
                // Retirer l'ennemi de la liste
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
        let touchX;

        // Si c'est un événement tactile, utilise les coordonnées du toucher
        if (event.type === 'touchstart' || event.type === 'touchmove' || event.type === 'touchend') {
            const touch = event.touches[0];
            const canvasRect = canvas.getBoundingClientRect();
            touchX = touch.clientX - canvasRect.left;
        } else if (event.type === 'keydown') {
            // Si c'est un événement de clavier, déplace le vaisseau selon la touche enfoncée
            if (event.key === 'ArrowLeft' && ship.x > 0) {
                ship.x -= 20;
            }
            if (event.key === 'ArrowRight' && ship.x + ship.width < canvas.width) {
                ship.x += 20;
            }
            // Si la touche est la barre d'espace, tirer une balle
            if (event.key === ' ') {
                bullets.push({ x: ship.x + ship.width / 2 - 2.5, y: ship.y, width: 5, height: 10 });
            }
            return; // Quitte la fonction après avoir traité l'événement du clavier
        }

        // Déplace le vaisseau si l'événement est un toucher
        ship.x = touchX - ship.width / 2;
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

        // Ajoute les écouteurs d'événements pour les écrans tactiles
        canvas.addEventListener('touchstart', moveShip);
        canvas.addEventListener('touchmove', moveShip);
        canvas.addEventListener('touchend', moveShip);

        // Ajoute l'écouteur d'événement pour le clavier
        document.addEventListener('keydown', moveShip);

        // Lance le jeu
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
}

// Appel initial
waitForCanvas();
