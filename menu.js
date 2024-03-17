let buttonStart, buttonSettings;
let spriteLayerOverlayScreenMainMenu;
let layerMainScreenMainMenu, layerOverlayScreenMainMenu;


function setupMenu() {
    // Audio

    // Initial setup
    // - Layers
    layerMainScreenMainMenu = new Group();
    layerOverlayScreenMainMenu = new Group();

    // - Inherited properties
    // - - Layer main
    layerMainScreenMainMenu.collider = 'kinematic';

    buttonStart = new layerMainScreenMainMenu.Sprite();
    buttonSettings = new layerMainScreenMainMenu.Sprite();

    // // - - Layer overlay
    // layerOverlayScreenMainMenu.collider = 'kinematic';
    //
    // spriteLayerOverlayScreenMainMenu = new layerOverlayScreenMainMenu.Sprite();
    // spriteLayerOverlayScreenMainMenu.h = gameHeight * 0.75;
    // spriteLayerOverlayScreenMainMenu.w = gameWidth * 0.75;

    // - Properties
    buttonStart.img = assetButtonStart;
    buttonStart.x = gameWidth / 2;
    buttonStart.y = gameHeight - buttonStart.h - 100;

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
    else buttonStart.moveTowards(null, gameHeight - buttonStart.h - 100);


}
