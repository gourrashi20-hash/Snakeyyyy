let inputdir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const backgroundSound = new Audio("background.mp3");
const gameOver = new Audio("gameover.mp3");
const move = new Audio("move.mp3");
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
let score = 0;
let hiscoreval = 0;        // CHANGE: hiscoreval ko pehle hi declare kiya
let gameOverFlag = false;

function main(cTime) {
    window.requestAnimationFrame(main);//ye loop bnaiga game ka
    //nsole.log(cTime);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;

    if (!gameOverFlag) {   // CHANGE: game over hone par gameEngine call nahi hoga
        gameEngine();
    }//ye function game ko chlaiga
}

function isCollide(snake) {
    //agar snake khudme ghus jai
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // agar saap diwal me ghus jai
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    //part1 update karna snake or food ko
    if (isCollide(snakeArr)) {
        gameOver.play();
        backgroundSound.pause();
        gameOverFlag = true;

        setTimeout(() => {    // CHANGE: safe reset, JS block nahi hota
            snakeArr = [{ x: 13, y: 15 }];
            inputdir = { x: 0, y: 0 };
            score = 0;
            scoreBox.innerHTML = "SCORE: 0";
        }, 500);
return;

    }

    // agar saap ne khana kha liya,then increament the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        foodSound.play();
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(hiscoreval));
            highscorebox.innerHTML = "HIGH SCORE:" + hiscoreval;
        }
        scoreBox.innerHTML = "SCORE=" + score;

        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;



    //part2 game me snake or food ko display krna
    //snake display
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);


    });

    //food display
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);


}
let hiscore = localStorage.getItem("highscore");
if (hiscore == null) {
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(0));
} else {
    hiscoreval = JSON.parse(hiscore);
    highscorebox.innerHTML = "HIGH SCORE:" + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    backgroundSound.play();
    if (gameOverFlag) {     // CHANGE: key press par game restart
        gameOverFlag = false;

        return;
    }
    switch (e.key) {
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            console.log("ArrowUp");
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            console.log("ArroLeft");
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            console.log("ArrowRight");
            break;
        default:
            break;
    }
})