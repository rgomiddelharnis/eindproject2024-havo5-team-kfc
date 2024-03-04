let game = function (p) {
    p.setup = function () {
        new Canvas(gameWidth, gameHeight);
    };

    p.draw = function () {
        // Check the game state
        switch (gameState) {
            case 'mainMenu':
                // Draw the main menu
                break;
            case 'game':
                // General checks & updates
                if (health = 0) {
                    break;
                } // Game over
                if (score >= 1000) {
                    gameState = 'gameWon';
                    break;
                } // Game won
                // Draw the background

                // Draw the overlay
                overlay = rect(0, 0, gameWidth, gameHeight);
                overlay.background(0, 0, 0, 100);

                // Draw the objects
                for (let i = 0; i < ghosts.length; i++) {
                    ghosts[i].draw();
                }
                for (let row = 0; row < obstacles.length; row++) {
                    for (let pos = 0; j < obstacles[row].length; j++) {
                        obstacles[row][pos].draw();
                    }
                }
                break;
            case 'gamePaused':
                // Draw the game paused screen
                break;
            case 'gameOver':
                // Draw the game over screen
                break;

            default:
                p.text('Error: Unknown game state', 10, 10);
                break;
        }

        // Background
        p.background(100);
        p.text('Game', 10, 50);

    };
};

let ghosts = [];
let obstacles = {0: [], 1: [], 2: [], 3: [], 4: []};

function setupGame() {

}

function drawGame() {

}