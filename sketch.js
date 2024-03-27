const gameWidth = 1920;
const gameHeight = 1080;

let canvas;

let gameState = 'mainMenu';
let gameStage = 0;
let points = 100;
let score = 0;
let alive = true;
let level = 1;

function setup() {
    canvas = new Canvas(gameWidth, gameHeight, "fullscreen");
    // Initial setup
    setupMenu();
}

function draw() {
    switch (gameState) {
        case "mainMenu":
            drawMenu();
            break;
        case "game":
            drawGame();
            break;
    }
}

function switchScreen(screen) {
    gameState = screen;
    allSprites.remove();
    switch (screen) {
        case "mainMenu":
            setupMenu();
            break;
        case "game":
            setupGame();
            break;
    }
}