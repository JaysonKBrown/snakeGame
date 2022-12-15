// 1. Apply colors to canvas
const boardBorder = '#000';
const boardBg = '#fff';
const snakeColor = 'limegreen';
const snakeBorder = '#005a9c';

// For directions
let changingDirection = false;

// Food
let foodX
let foodY

// Score
let score = 0

// 2. Make the snake => array of coordinates

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

// 3. Make the canvas
const snakeBoard = document.getElementById('snakeBoard');
const snakeBoardCtx = snakeBoard.getContext('2d');

const makeCanvas =()=>  {
    snakeBoardCtx.fillStyle = boardBg;
    snakeBoardCtx.strokeStyle = boardBorder;
    snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

// 4. Draw Snake 
const drawSnake =()=> {
    snake.forEach(snakePart => {
        snakeBoardCtx.fillStyle = snakeColor;
        snakeBoardCtx.strokeStyle = snakeBorder;
        snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    })
}

// 5. Move the snake
let dx = 10; // 10px horizontal
let dy = 0; //0px vertical

const moveSnake =()=> {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy} // x: 210, y: 200
    snake.unshift(head)

    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY

    if (hasEatenFood) {

        score+= 10
        const displayScore = document.getElementById('score')
        displayScore.innerText = score;
        generateFood()
    } else {
        snake.pop()
    }
}

// 6. Change directions
const changeDirection = (e)=> {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    if (changingDirection) return
    changingDirection = true;

    const keyPressed = e.keyCode

    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingRight = dx === 10
    const goingLeft = dx === -10

    if (keyPressed === LEFT && !goingRight){
        dx = -10
        dy = 0
    }

    if (keyPressed === UP && !goingDown) {
        dx = 0
        dy = -10
    }

    if (keyPressed === RIGHT && !goingLeft) {
        dx = 10
        dy = 0
    }

    if (keyPressed === DOWN && !goingUp) {
        dx = 0
        dy = 10
    }
}

// 7. Collision => Snakes hits wall or bites itself

const hasGameEnded =()=> {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

    const hitLeftWall = snake[0].x < 0
    const hitRightWall = snake[0].x > snakeBoard.width - 10
    const hitTopWall = snake[0].y < 0
    const hitBottomWall = snake[0].y > snakeBoard.height - 10

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

// 8. Collision => snake eats food
//  Draw food
const drawFood = ()=> {
    snakeBoardCtx.fillStyle = 'brown'
    snakeBoardCtx.strokeStyle = 'tan'
    snakeBoardCtx.fillRect(foodX, foodY, 10, 10)
    snakeBoardCtx.strokeRect(foodX, foodY, 10, 10)
}

// Randomize food
const randomFood =(min, max)=> {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10
}

//  generate food
const generateFood =()=> {
    foodX = randomFood(0, snakeBoard.width - 10)
    foodY = randomFood(0, snakeBoard.height - 10)

    snake.forEach(part => {
        const hasEaten = part.x === foodX && part.y === foodY

        if (hasEaten) {
            generateFood()
        }
    })
}

const init =()=> {
    
    if (hasGameEnded()) return

    changingDirection = false;

    // Set a timer
    // SetTimeout(callback function, time in milliseconds)
    setTimeout(()=>{
    makeCanvas()
    drawSnake()
    drawFood()
    moveSnake()

    //call init()
    init();
    }, 100)
}

init()
document.addEventListener('keydown', changeDirection)

generateFood()