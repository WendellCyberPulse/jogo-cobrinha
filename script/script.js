document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-board");
    const ctx = canvas.getContext("2d");
    const restartBtn = document.getElementById("restart-btn");
    const scoreDisplay = document.getElementById("score");
    const controls = document.getElementById("controls");

    const box = 15;
    let snake, food, dx, dy, score, record, game;

    function initGame() {
        snake = [{ x: 150, y: 150 }, { x: 135, y: 150 }, { x: 120, y: 150 }];
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        dx = box;
        dy = 0;
        score = 0;
        record = localStorage.getItem("record") || 0;
        restartBtn.style.display = "none";
        game = setInterval(draw, 160);
        updateScore();
    }

    document.addEventListener("keydown", changeDirection);
    restartBtn.addEventListener("click", initGame);

    function changeDirection(event) {
        const keyPressed = event.keyCode;
        if (keyPressed === 37 && dx !== box) { dx = -box; dy = 0; }
        if (keyPressed === 38 && dy !== box) { dx = 0; dy = -box; }
        if (keyPressed === 39 && dx !== -box) { dx = box; dy = 0; }
        if (keyPressed === 40 && dy !== -box) { dx = 0; dy = box; }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.forEach(drawSnakePart);
        drawFood();
        moveSnake();
        if (isGameOver()) {
            clearInterval(game);
            if (score > record) {
                record = score;
                localStorage.setItem("record", record);
            }
            restartBtn.style.display = "block";
        }
        updateScore();
    }

    function drawSnakePart(snakePart, index) {
        ctx.fillStyle = index === 0 ? "black" : "#555";
        ctx.fillRect(snakePart.x, snakePart.y, box, box);
    }

    function drawFood() {
        ctx.fillStyle = "#111";
        ctx.fillRect(food.x, food.y, box, box);
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        } else {
            snake.pop();
        }
    }

    function isGameOver() {
        return (
            snake[0].x < 0 ||
            snake[0].x >= canvas.width ||
            snake[0].y < 0 ||
            snake[0].y >= canvas.height ||
            snake.slice(1).some(part => part.x === snake[0].x && part.y === snake[0].y)
        );
    }

    function updateScore() {
        scoreDisplay.innerHTML = `Score: ${score} | Recorde: ${record}`;
    }

    // Verifica se está acessando via celular
    function detectMobile() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    if (detectMobile()) {
        controls.style.display = "flex";

        document.getElementById("up").addEventListener("click", () => {
            if (dy === 0) { dx = 0; dy = -box; }
        });

        document.getElementById("down").addEventListener("click", () => {
            if (dy === 0) { dx = 0; dy = box; }
        });

        document.getElementById("left").addEventListener("click", () => {
            if (dx === 0) { dx = -box; dy = 0; }
        });

        document.getElementById("right").addEventListener("click", () => {
            if (dx === 0) { dx = box; dy = 0; }
        });
    }

    initGame();
});
