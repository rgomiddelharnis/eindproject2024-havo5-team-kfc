let buttonStart, buttonSettings;
let spriteLayerOverlayScreenMainMenu;
let layerMainScreenMainMenu, layerOverlayScreenMainMenu;
let gameArt;


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
    gameArt = new layerMainScreenMainMenu.Sprite(gameWidth / 2, gameHeight / 2 - 250);
    gameArt.img = assetGameArt;
    gameArt.scale = 0.4;

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

    buttonSettings.visible = false;
    buttonSettings.img = assetButtonSettings;
    buttonSettings.scale = 0.25;
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
    if (buttonStart.mouse.hovering()) buttonStart.scale = 1.1;
    else buttonStart.scale = 1;

    if (mouse.presses("left")) {
        switch (Math.floor(Math.random(2))) {
            case 0:
                audioMouseClickA.play();
                break;
            case 1:
                audioMouseClickB.play();
                break;
        }
    }

    if (buttonStart.mouse.presses("left")) switchScreen("game");
}
