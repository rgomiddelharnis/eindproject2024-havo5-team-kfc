const gameWidth = 960;
const gameHeight = 540;
const sideBarWidth = 200;

let bgMainMenu, bgGame, bgGamePaused, bgGameOver, bgGameWon;

let sprite;

let gameState = 'game';
let points = 0;
let score = 0;
let health = 1;
let level = 1;

let levels = {}; // Refer to levels.js

// Left sidebar
// var myLeftSideBar = new p5(leftSideBar, 'leftSideBar');
// Main game
// var myGame = new p5(game, 'game');
// Right sidebar
// var myRightSideBar = new p5(rightSideBar, 'rightSideBar');

function preload() {
    bgGame = loadImage("images/bgGame.png");
    bgMainMenu = loadImage("images/bgMainMenu.png");
    bgGamePaused = loadImage("images/bgGamePaused.png");
    bgGameOver = loadImage("images/bgGameOver.png");
    bgGameWon = loadImage("images/bgGameWon.png");
    // Load the game assets
    // levels = loadJSON('levels.json');
}

function setup() {
    switch (gameState) {
        case "mainMenu":
            // Setup the main menu
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(200);
            break;
        case "game":
            // Setup the game
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(100);
            break;
        case "":
            // Setup the game
            new Canvas(gameWidth, gameHeight, "fullscreen");
            background(17)
            break;
    }
}

function draw() {
}