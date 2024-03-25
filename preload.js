let assetBackgroundMainMenu, assetBackgroundGame, assetBackgroundGamePaused, assetBackgroundGameOver,
    assetBackgroundGameWon;
let assetGameBackGround;
let assetButtonStart, assetButtonSettings;
let assetGhostNormal, assetGhostGangster, assetGhostMysterious, assetGhostFemale;

let assetWaterPistol, assetWaterPistolActivate, assetWaterPistolShooting;

let audioBackgroundMain, audioBackgroundWave, audioBreakMirror, audioDestroyMirror, audioGhostDying,
    audioGhostFemaleDying, audioGhostFemaleRoamingA, audioGhostFemaleRoamingB, audioGhostRoamingA, audioGhostRoamingB,
    audioGrumble, audioMouseClickA, audioMouseClickB, audioPlop, audioRaining, audioSplashA, audioSplashB, audioVacuum,
    audioWaterDrop;

function preload() {
    // Background assets
    assetBackgroundMainMenu = customLoadArt("asset/art/background/mainMenu.jpg");
    assetGameBackGround = customLoadArt("asset/art/background/Speelveld.jpg")

    // Button assets
    assetButtonStart = customLoadArt("asset/art/button/start.png");
    assetButtonSettings = customLoadArt("asset/art/button/settings.png")

    // HUD assets

    // Ghost assets
    assetGhostNormal = customLoadArt("asset/art/ghost/normal.png")
    assetGhostGangster = customLoadArt("asset/art/ghost/gangster.png")
    assetGhostMysterious = customLoadArt("asset/art/ghost/mysterious.png")
    assetGhostFemale = customLoadArt("asset/art/ghost/female.png")

    // Defenders
    assetWaterPistol = customLoadArt("asset/art/defender/Waterpistool.png");
    assetWaterPistolActivate = customLoadArt("asset/art/defender/Waterpistool met druppel klein.png");
    assetWaterPistolShooting = customLoadArt("asset/art/defender/Waterpistool met druppel groot.png");

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