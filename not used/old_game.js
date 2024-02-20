
function setup() {
    createCanvas(windowWidth, windowHeight);
    noScroll();
    canvas.classList.add('code-container');
}

function noScroll() {
    document.body.style.overflow = 'hidden';
}

function draw() {
    background(10);
    const gridSize = 80; // Adjust the size of each grid cell
    const numColumns = 10; // Number of columns in the grid
    const numRows = 5; // Number of rows in the grid
    const horizontalOffset = windowWidth * 0.2; // Horizontal offset as 10% of the window width
    const verticalOffset = (windowHeight - numRows * gridSize) / 2; // Vertical offset to center align the grid

    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
            const x = horizontalOffset + i * gridSize;
            const y = verticalOffset + j * gridSize;
            stroke(255);
            noFill();
            rect(x, y, gridSize, gridSize);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

window.addEventListener('resize', windowResized); // Add event listener for window resize
