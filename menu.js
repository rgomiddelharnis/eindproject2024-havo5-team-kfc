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
}

function drawMenu() {
    if (startButton.mouseClicked) {
        console.log('Start button clicked')
    }
}