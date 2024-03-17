const gameWidth = 1920;
const gameHeight = 1080;

let canvas;
let assetBackgroundMainMenu, assetBackgroundGame, assetBackgroundGamePaused, assetBackgroundGameOver,
    assetBackgroundGameWon;
let assetGameBackGround;
let assetButtonStart, assetButtonSettings;
let assetGhostNormal, assetGhostGangster, assetGhostMysterious, assetGhostFemale;

// let sprite;

let gameState = 'game';
let gameStage = 0;
let points = 0;
let score = 0;
let alive = true;
let level = 1;

function preload() {
    // Background asset
    assetBackgroundMainMenu = loadImage("asset/background/mainMenu.jpg");
    assetGameBackGround = loadImage("images/image-3.png")

    // Button asset
    assetButtonStart = loadImage("asset/button/start.png");
    assetButtonSettings = loadImage("asset/button/settings.png")

    // HUD asset

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