class Cloud {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    move() {
        this.x += this.speed;
    }

    draw() {
        // Draw the cloud on the canvas
        // ...
    }
}


export default Cloud;