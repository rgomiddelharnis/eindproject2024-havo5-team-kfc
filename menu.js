let startButton, settingsButton;

function setupMenu() {
// Background
    background(bgMainMenuAsset);
// Initial setup
    startButton = new Sprite();
    settingsButton = new Sprite();
    
    startButton.img = startButtonAsset;
    startButton.y = 20;
    startButton.collider = 'none';
}

function drawMenu() {
    if (startButton.mouseClicked) {

    }
}