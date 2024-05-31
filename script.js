const boardSize = 20;
const field = document.querySelector(".field");
let snake = [{ x: 9, y: 9 }];
let direction = { x: 1, y: 0 };

const createField = function () {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    field.appendChild(cell);
  }
};

const clearClass = function (className) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove(className));
};

const addClass = function (position, className) {
  let index = position.y * boardSize + position.x;
  field.children[index].classList.add(className);
};

const drawSnake = function () {
  clearClass("snake");
  snake.forEach((position) => {
    addClass(position, "snake");
  });
};

const drawFood = function (food) {
  clearClass("food");
  addClass(food, "food");
};

const generateFood = function () {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (
    snake.some(
      (position) => position.x === newFood.x && position.y === newFood.y
    )
  );
  drawFood(newFood);
  return newFood;
};

const moveSnake = function () {
  snake = snake.map((position, i) => {
    if (i !== 0) {
      return (position = snake[i - 1]);
    } else {
      return (position = {
        x: position.x + direction.x,
        y: position.y + direction.y,
      });
    }
  });
  if (
    snake[0].x >= boardSize ||
    snake[0].y >= boardSize ||
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snake
      .slice(1)
      .some(
        (position) => position.x === snake[0].x && position.y === snake[0].y
      )
  ) {
    clearInterval(interval);
    alert("Game over!");
  } else if (snake[0].x === food.x && snake[0].y === food.y) {
    food = generateFood();
    const lastSnakeCell = snake[snake.length - 1];
    snake.push({
      x: lastSnakeCell.x - direction.x,
      y: lastSnakeCell.y - direction.y,
    });
  }
};

const gameLoop = function () {
  // createField();
  moveSnake();
  drawSnake();
  // drawSnake();
  // generateFood();
};

createField();
drawSnake();

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  switch (e.key) {
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
    default:
      break;
  }
});

const interval = setInterval(gameLoop, 200);
let food = generateFood();
