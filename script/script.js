document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-board");
    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake = [{ x: 200, y: 200 }, { x: 180, y: 200 }, { x: 160, y: 200 }];
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    let dx = 20;
    let dy = 0;
    let score = 0;

    document.addEventListener("keydown", changeDirection);

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
            alert("Game Over! Score: " + score);
        }
        drawScore();
    }

    function drawSnakePart(snakePart, index) {
        ctx.fillStyle = index === 0 ? "#ff0" : "green"; // Cor da cabeça é amarela, corpo é branco
        ctx.fillRect(snakePart.x, snakePart.y, box, box);
    }

    function drawFood() {
        ctx.fillStyle = "#f00";
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

    function drawScore() {
        document.getElementById("score").innerHTML = "Score: " + score;
    }

    const game = setInterval(draw, 160);
});
