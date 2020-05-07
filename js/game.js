const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const grass = new Image();
grass.src = "img/grass.png";
const apple = new Image();
apple.src = "img/apple.png";
let box = 32;
let score = 0;
let food = {
	x: Math.floor((Math.random() * 27 + 1)) * box,
	y: Math.floor((Math.random() * 25 + 3)) * box
};
let snake = [];
snake[0] = {
	x: 14 * box,
	y: 15 * box
};
document.addEventListener("keydown", direction);
function direction(event) {
	if(event.keyCode == 37 && direction != "right")
		direction = "left";
	else if(event.keyCode == 38 && direction != "down")
		direction = "up";
	else if(event.keyCode == 39 && direction != "left")
		direction = "right";
	else if(event.keyCode == 40 && direction != "up")
		direction = "down";
}
function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}
function drawGame() {
	ctx.drawImage(grass, 0, 0);
	ctx.drawImage(apple, food.x, food.y);
	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "#526270" : "#E48C77";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}
	ctx.fillStyle = "#526270";
	ctx.font = "32px Arial";
	ctx.fillText(score, box * 4.4, box * 2);
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 27 + 1)) * box,
			y: Math.floor((Math.random() * 25 + 3)) * box
		};
	} else {
		snake.pop();
	}
	if(snakeX < box || snakeX > box * 27 
		|| snakeY < 3 * box || snakeY > box * 27)
		clearInterval(game);
	if(direction == "left") snakeX -= box;
	if(direction == "right") snakeX += box;
	if(direction == "up") snakeY -= box;
	if(direction == "down") snakeY += box;
	let newHead = {
		x: snakeX,
		y: snakeY
	};
	eatTail(newHead, snake);
	snake.unshift(newHead);
}
let game = setInterval(drawGame, 200);