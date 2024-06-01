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
  clearClass("head");
  snake.forEach((position, i) => {
    i !== 0 ? addClass(position, "snake") : addClass(position, "head");
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
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  // snake = snake.map((position, i) => {
  //   if (i !== 0) {
  //     return (position = snake[i - 1]);
  //   } else {
  //     return (position = {
  //       x: position.x + direction.x,
  //       y: position.y + direction.y,
  //     });
  //   }
  // });
  if (
    head.x >= boardSize ||
    head.y >= boardSize ||
    head.x < 0 ||
    head.y < 0 ||
    snake.some((position) => position.x === head.x && position.y === head.y)
  ) {
    clearInterval(interval);
    alert("Game over!");
  } else if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
  snake.unshift(head);
};

const gameLoop = function () {
  moveSnake();
  drawSnake();
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
