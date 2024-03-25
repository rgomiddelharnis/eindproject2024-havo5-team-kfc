const gameWidth = 1920;
const gameHeight = 1080;

let canvas;

let gameState = 'game';
let gameStage = 0;
let points = 0;
let score = 0;
let alive = true;
let level = 1;

function setup() {
    canvas = new Canvas(gameWidth, gameHeight, "fullscreen");
    // Initial setup
    // setupMenu();
    setupGame();
}

function draw() {
    switch (gameState) {
        case "mainMenu":
            drawMenu();
            break;
        case "game":
            drawGame();
            break;
        case "gamePaused":
            // Draw the game
            break;
        case "gameOver":
            // Draw the game
            break;
        case "gameWon":
            // Draw the game
            break;
    }
}