let buttonStart, buttonSettings;
let layerMainMenuMain, layerMainMenuOverlay;


function setupMenu() {
    // Audio

    // Initial setup
    // - Layers
    layerMainMenuMain = new Group();
    layerMainMenuOverlay = new Group();

    // - Inherited properties
    layerMainMenuMain.collider = 'kinematic';

    buttonStart = new layerMainMenuMain.Sprite();
    buttonSettings = new layerMainMenuMain.Sprite();

    // - Properties
    buttonStart.img = assetButtonStart;
    buttonStart.scale = 80 / buttonStart.h;
    buttonStart.x = gameWidth / 2;
    buttonStart.y = gameHeight / 2;

    buttonSettings.x = gameWidth - 20 - buttonSettings.w / 2;
    buttonSettings.y = 20 + buttonSettings.h / 2;
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


}
