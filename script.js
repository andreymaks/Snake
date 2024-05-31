const boardSize = 20;
const field = document.querySelector(".field");
let snake = [{ x: 10, y: 10 }];

const createField = function () {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    field.appendChild(cell);
  }
};

createField();

const drawSnake = function () {
  snake.forEach((position) => {
    let index = position.y * boardSize + position.x;
    field.children[index].classList.add("snake");
  });
};

drawSnake();

const drawFood = function (food) {
  let index = food.y * boardSize + food.x;
  field.children[index].classList.add("food");
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
};

generateFood();
