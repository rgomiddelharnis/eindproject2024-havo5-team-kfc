let grid;
let playerBase;
let sunPoints = 50;
let sunflowerTimer = 0;
let sunflowers = [];

function setup() {
    createCanvas(800, 600);

    // Initialize game grid
    grid = create2DArray(5, 9);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = null;
        }
    }

    // Initialize player base
    playerBase = new Sprite(width / 2, height - 50, 100, 100);

    // Start spawning ghosts
    setInterval(spawnGhost, 2000);
}

function draw() {
    background(220);

    // Update sunflower timer
    if (frameCount % 60 === 0) {
        sunflowerTimer++;
        if (sunflowerTimer >= 10) {
            sunflowerTimer = 0;
            sunflowers.push(createSunflower());
        }
    }

    // Update and draw sunflowers
    for (let i = sunflowers.length - 1; i >= 0; i--) {
        let sunflower = sunflowers[i];
        if (sunflower.removed) {
            sunflowers.splice(i, 1);
        }
    }

    // Display sun points
    textSize(20);
    fill(255, 255, 0);
    text(`Sun Points: ${sunPoints}`, 20, 30);

    // drawSprites();
}

function mouseClicked() {
    let col = Math.floor(mouseX / 100);
    let row = Math.floor(mouseY / 100);

    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
        if (!grid[row][col]) {
            if (sunPoints >= 25) {
                sunPoints -= 25;
                grid[row][col] = createPlant(col * 100 + 50, row * 100 + 50);
            }
        }
    }
}

function spawnGhost() {
    let ghost = new Sprite(random(width), -50, 50, 50);
    ghost.velocity.y = 1;
    ghost.damage = 10;
}

function createPlant(x, y) {
    let plant = new Sprite(x, y, 50, 50);
    plant.shapeColor = color(0, 255, 0);
    return plant;
}

function createSunflower() {
    let sunflower = new Sprite(random(width), random(height), 50, 50);
    sunflower.shapeColor = color(255, 255, 0);
    return sunflower;
}

function create2DArray(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}
