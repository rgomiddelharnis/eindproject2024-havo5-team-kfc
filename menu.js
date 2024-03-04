let buttonStart;
let buttonSettings;

function setupMenu() {
    // Audio


    // Initial setup
    buttonStart = new Sprite();
    buttonSettings = new Sprite();

    // - Properties
    buttonStart.img = assetButtonStart;
    buttonStart.scale = 80 / buttonStart.h;
    buttonStart.x = gameWidth / 2;
    buttonStart.y = gameHeight / 2;
    buttonStart.collider = 'kinematic';

    buttonSettings.x = gameWidth - 20 - buttonSettings.w / 2;
    buttonSettings.y = 20 + buttonSettings.h / 2;
    buttonSettings.collider = 'kinematic';
}

function drawMenu() {
    clear();

    // Background
    background(assetBackgroundMainMenu);


    // Main

    // - Animation buttonSettings
    if (buttonSettings.mouse.hovering()) buttonSettings.moveTowards(null, 10 + buttonSettings.h / 2);
    else buttonSettings.moveTowards(null, 20 + buttonSettings.h / 2);

    // - Animation buttonStart
    if (buttonStart.mouse.hovering()) buttonStart.moveTowards(null, gameHeight / 2 - 10);
    else buttonStart.moveTowards(null, gameHeight / 2);

    if (buttonStart.mouse.presses("left")) {
    }
    if (buttonSettings.mouse.presses("right") && buttonStart == null) {
    }


}
