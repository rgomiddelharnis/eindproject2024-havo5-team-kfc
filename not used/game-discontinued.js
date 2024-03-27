// Global variables
let game;
let currentScreen, leftSidebar, main, rightSidebar;

// Clock class
class Clock {
    constructor() {
        this.time = 0;
    }

    // Start the clock
    start() {
        this.interval = setInterval(() => {
            this.time++;
            console.log(`The time is now ${this.time}`);
        }, 1000);
    }

    // Pause the clock
    break() {
        clearInterval(this.interval);
        console.log(`The clock stopped at ${this.time}`);
    }

    // Reset the clock
    restart() {
        this.time = 0;
        this.start();
    }
}

// Game class
class Game {
    constructor() {
        this.clock = new Clock();
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) {
            console.log("The game is already running.");
            return;
        }

        this.isRunning = true;
        console.log("Game mechanics are starting...");
        // Add your game logic here
    }

    stop() {
        // if the game is not running, do nothing
        if (!this.isRunning) {
            console.log("The game is not running.");
            return;
        }

        // Stop the game
        console.log("Stopping the game...");
        this.isRunning = false;
        // Add any cleanup or finalization logic here
    }

    save() {
        console.log("Saving game data...");
        // Add logic to save the game data
    }
}

// START Main canvas
function drawMain() {
    main.background(180);
    // Add your drawing code here
}

function mainMenu() {
    console.log("Welcome to the game!");
    currentScreen = "mainMenu";
}

function gameLoop() {
    console.log("Starting the game loop...");
    currentScreen = "gameLoop";
}

function gameOver() {
    console.log("Game over!");
    currentScreen = "gameOver";
}

function gamePaused() {
    console.log("Game paused.");
    currentScreen = "gamePaused";
}
// END Main canvas

const gameWidth = 1400;
const gameHeight = 800;
var sideBarWidth = (window.innerWidth - gameWidth) / 2;

function setup() {
    // Main canvas
    createCanvas(window.innerWidth, 800);

    // Sub canvases
    main = createGraphics(gameWidth, gameHeight);
    leftSidebar = createGraphics(sideBarWidth, gameHeight);
    rightSidebar = createGraphics(sideBarWidth, gameHeight);
    currentScreen = "mainMenu";
}

// Function called when screen is resized
function handleResize() {

    console.log("Screen resized");
    width = window.innerWidth;
    sideBarWidth = (width - gameWidth) / 2;
    leftSidebar.resizeCanvas(sideBarWidth, gameHeight);
    rightSidebar.resizeCanvas(sideBarWidth, gameHeight);
}

// Add event listener for screen resize
window.addEventListener('resize', handleResize);


function draw() {
    sideBarWidth = (window.innerWidth - gameWidth) / 2;
    image(leftSidebar, 0, 0);
    image(main, sideBarWidth, 0);
    image(rightSidebar, gameWidth + sideBarWidth, 0);
    leftSidebar.background(100);
    main.background(180);
    rightSidebar.background(100);
}

// Setup canvas

// // Runtime
// while (true) {
//     // Starting screen

//     // Main menu

//     // Game loop

//     // Game over screen

//     // Pause menu

//     // Game save

//     // Game load

//     // Game exit
//     break;
// }

// // On browser join
// switch (localStorage.getItem('game_save')) {
//     // If game_save data does not exist, start a new game
//     case null:
//         console.log('No game save found. Starting a new game...');
//         game = new Game();
//         break;
//     // If game_save data exists, load the game
//     default:
//         console.log('Loading game save...');
//         break;