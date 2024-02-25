const gameWidth = 960;
const gameHeight = 540;
// const sideBarWidth = 200;

let bgMainMenu, bgGame, bgGamePaused, bgGameOver, bgGameWon;

let startButton, settingsButton;

// let sprite;

let gameState = 'mainMenu';
let gameStage = 'first';
let points = 0;
let score = 0;
let alive = true;
let level = 1;

let levels = {}; // Refer to levels.js

// Left sidebar
// var myLeftSideBar = new p5(leftSideBar, 'leftSideBar');
// Main game
// var myGame = new p5(game, 'game');
// Right sidebar
// var myRightSideBar = new p5(rightSideBar, 'rightSideBar');

function preload() {
    // Load the game assets
    bgMainMenu = loadImage("assets/background/mainMenu.jpg");
    // bgGame = loadImage("assets/background/game.png");
    // bgGamePaused = loadImage("assets/background/gamePaused.png");
    // bgGameOver = loadImage("assets/background/gameOver.png");
    // bgGameWon = loadImage("assets/background/gameWon.png");

    // levels = loadJSON('levels.json');
}

function setup() {
    switch (gameState) {
        case "mainMenu":
            // Setup the main menu
            new Canvas(gameWidth, gameHeight, "fullscreen");
            // background(bgMainMenu);
            draw();
            break;
        case "game":
            // Setup the game
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(100);
            break;
        case "gamePaused":
            // Setup the game
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(17)
            break;
        case "gameOver":
            // Setup the game
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(17)
            break;
        case "gameWon":
            // Setup the game
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(17)
            break;
    }
}

function draw() {
    switch (gameState) {
        case "mainMenu":
            drawMenu();
            break;
        case "game":
            // Draw the game
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