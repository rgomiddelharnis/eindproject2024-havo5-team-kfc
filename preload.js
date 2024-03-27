// Main menu
let assetBackgroundMainMenu;

let assetButtonStart, assetButtonSettings;

let assetGameOverScreen;

// Game
let assetGameBackGround;

let assetCharacter, assetBubble;

let assetGhostNormal, assetGhostGangster, assetGhostMysterious, assetGhostFemale;
let assetWaterGun, assetWaterPistolActivate, assetWaterPistolShooting;
let assetVacuum, assetBrokenFloor, assetMirror, assetMirrorBroken, assetCloud;

let assetWaterProjectile;

let assetGameBackgroundHUD;
let assetHUDCardBrokenFloor, assetHUDCardCloud, assetHUDCardWaterGun, assetHUDCardMirror;

// Audio
let audioBackgroundMain, audioBackgroundWave, audioBreakMirror, audioDestroyMirror, audioGhostDying,
    audioGhostFemaleDying, audioGhostFemaleRoamingA, audioGhostFemaleRoamingB, audioGhostRoamingA, audioGhostRoamingB,
    audioGrumble, audioMouseClickA, audioMouseClickB, audioPlop, audioRaining, audioSplashA, audioSplashB, audioVacuum,
    audioWaterDrop;

let assetGameArt;

function preload() {
    // Background assets
    assetBackgroundMainMenu = customLoadArt("asset/art/background/mainMenu.jpg");
    assetGameBackGround = customLoadArt("asset/art/background/Speelveld.jpg")
    assetGameOverScreen = customLoadArt("asset/art/background/gameover.png");

    // Game art
    assetGameArt = customLoadArt("asset/art/Titel.jpg");

    // Button assets
    assetButtonStart = customLoadArt("asset/art/button/start.png");
    assetButtonSettings = customLoadArt("asset/art/button/settings.png");

    // Character

    assetCharacter = customLoadArt("asset/art/character/deGroot.png");
    assetBubble = customLoadArt("asset/art/character/TekstWolkje.png");

    // HUD assets
    assetGameBackgroundHUD = customLoadArt("asset/art/hud/Overlay.png");
    assetHUDCardBrokenFloor = customLoadArt("asset/art/hud/Kaartje vloer.png");
    assetHUDCardCloud = customLoadArt("asset/art/hud/Kaartje wolk.png");
    assetHUDCardWaterGun = customLoadArt("asset/art/hud/Kaartje waterpistool.png");
    assetHUDCardMirror = customLoadArt("asset/art/hud/Kaartje spiegel.png");

    // Projectiles
    assetWaterProjectile = customLoadArt("asset/art/projectiles/Ronde waterdruppel.png");

    // Ghost assets
    assetGhostNormal = customLoadArt("asset/art/ghost/normal.png");
    assetGhostGangster = customLoadArt("asset/art/ghost/gangster.png");
    assetGhostMysterious = customLoadArt("asset/art/ghost/mysterious.png");
    assetGhostFemale = customLoadArt("asset/art/ghost/female.png");

    // Defenders & producers
    assetWaterGun = customLoadArt("asset/art/defender/Waterpistool.png");
    assetWaterPistolActivate = customLoadArt("asset/art/defender/Waterpistool met druppel klein.png");
    assetWaterPistolShooting = customLoadArt("asset/art/defender/Waterpistool met druppel groot.png");

    assetVacuum = customLoadArt("asset/art/defender/Stofzuiger.png");
    assetCloud = customLoadArt("asset/art/defender/Wolk.png");
    assetBrokenFloor = customLoadArt("asset/art/defender/brokenFloorUniversal.png");
    assetMirror = customLoadArt("asset/art/defender/Spiegel.png");
    assetMirrorBroken = customLoadArt("asset/art/defender/Spiegel gebroken.png");

    // Levels
    // levels = loadJSON('levels.json');

    // Audio
    soundFormats('mp3');
    audioBackgroundMain = customLoadAudio("asset/audio/backGroundMain.mp3");
    audioBackgroundWave = customLoadAudio("asset/audio/backgroundWave.mp3");
    audioBreakMirror = customLoadAudio("asset/audio/breakMirror.mp3");
    audioDestroyMirror = customLoadAudio("asset/audio/destroyMirror.mp3");
    audioGhostDying = customLoadAudio("asset/audio/ghostDying.mp3");
    audioGhostFemaleDying = customLoadAudio("asset/audio/ghostFemaleDying.mp3");
    audioGhostFemaleRoamingA = customLoadAudio("asset/audio/ghostFemaleRoamingA.mp3");
    audioGhostFemaleRoamingB = customLoadAudio("asset/audio/ghostFemaleRoamingB.mp3");
    audioGhostRoamingA = customLoadAudio("asset/audio/ghostRoamingA.mp3");
    audioGhostRoamingB = customLoadAudio("asset/audio/ghostRoamingB.mp3");
    audioGrumble = customLoadAudio("asset/audio/grumble.mp3");
    audioMouseClickA = customLoadAudio("asset/audio/mouseClickA.mp3");
    audioMouseClickB = customLoadAudio("asset/audio/mouseClickB.mp3");
    audioPlop = customLoadAudio("asset/audio/plop.mp3");
    audioRaining = customLoadAudio("asset/audio/raining.mp3");
    audioSplashA = customLoadAudio("asset/audio/splashA.mp3");
    audioSplashB = customLoadAudio("asset/audio/splashB.mp3");
    audioVacuum = customLoadAudio("asset/audio/vacuum.mp3");
    audioWaterDrop = customLoadAudio("asset/audio/waterDrop.mp3");
}

function customLoadArt(path) {
    return loadImage(
        path,
        () => console.log("Successfully loaded art asset by " + path),
        () => console.log("An error occurred while loading art asset by " + path)
    )
}

function customLoadAudio(path) {
    return loadSound(
        path,
        () => console.log("Successfully loaded audio asset by " + path),
        () => console.log("An error occurred while loading audio asset by " + path)
    )
}