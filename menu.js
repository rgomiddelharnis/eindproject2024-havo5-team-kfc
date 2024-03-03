let startButton, settingsButton;

function setupMenu() {
// Background
    background(bgMainMenuAsset);
// Button
    world.gravity = 10;

    startButton = new Sprite();
    startButton.img = startButtonAsset;
    startButton.y = 20;
    startButton.collider = 'none';
    startButton.scale = 0.2;
}

function drawMenu() {
    // clear();
    background(bgMainMenuAsset);

    if (mouse.pressed("left")) {
        startButton.x = mouse.x;
        startButton.y = mouse.y;
    }

}