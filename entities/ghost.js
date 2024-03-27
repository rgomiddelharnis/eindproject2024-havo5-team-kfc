class Ghost {
    constructor(x, y) {
        this.x = x; // X position on the grid
        this.y = y; // Y position on the grid
        this.speed = 1; // Grids per second
        this.health = 100; // Health points
    }

    update() {
        // Add logic to update the ghost's position, behavior, etc.
    }
    
    kill() {
        // Add logic to kill the ghost
        // return this.Ghost;
    }

    draw() {
        // Add logic to draw the ghost on the game canvas
    }
}

export default Ghost;
