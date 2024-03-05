const gameWidth = 1920;
const gameHeight = 1080;

let canvas;
let assetBackgroundMainMenu, assetBackgroundGame, assetBackgroundGamePaused, assetBackgroundGameOver,
    assetBackgroundGameWon;
let assetGameBackGround;
let assetButtonStart, settingsButtonAsset;

// let sprite;

let gameState = 'game';
let gameStage = 0;
let points = 0;
let score = 0;
let alive = true;
let level = 1;

let levels = {}; // Refer to levels.js

function preload() {
    // Background assets
    assetBackgroundMainMenu = loadImage("assets/background/mainMenu.jpg");
    // bgGameAsset = loadImage("assets/background/game.png");
    // bgGamePausedAsset = loadImage("assets/background/gamePaused.png");
    // bgGameOverAsset = loadImage("assets/background/gameOver.png");
    // bgGameWonAsset = loadImage("assets/background/gameWon.png");

    assetGameBackGround = loadImage("images/image-4.png")
    // Button assets
    assetButtonStart = loadImage("assets/button/start.jpg");

    // HUD assets

    // Levels
    // levels = loadJSON('levels.json');
}

function setup() {
    canvas = new Canvas(gameWidth, gameHeight, "fullscreen");
    // Initial setup
    // setupMenu();
    setupGame()
}

function draw() {
    switch (gameState) {
        case "mainMenu":
            drawMenu();
            break;
        case "game":
            drawGame()
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