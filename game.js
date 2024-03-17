const enemyStartLine = gameWidth - 150;

let startTime, runtime, timer;
let defenderGroup, attackerGroup, overlayGroup, hudGroup;
let frontLineXPos = 500;
let levelData = {};
let ghostTypes = {1: 1, 2: 2, 3: 3, 4: 4};



function setupGame() {
    // Timer
    timer = new Sprite();
    timer.x = timer.w / 2 + 20;
    timer.y = timer.h / 2 + 20;
    timer.textSize = 24;

    defenderGroup = new Group();
    defenderGroup.layer = 1;


    attackerGroup = new Group();
    attackerGroup.layer = 1;
    attackerGroup.h = attackerGroup.w = 50;
    attackerGroup.x = gameWidth - 300;
    attackerGroup.y = () => random(120, gameHeight - 120);
    // attackerGroup.vel.x = () => random(-3, -0.5);
    attackerGroup.vel.x = -4;
    attackerGroup.collider = 'kinematic';

    overlayGroup = new Group();
    overlayGroup.collider = 'none';

    hudGroup = new Group();
    hudGroup.collider = 'none';

    // Test spawning
    let randomSpawn = setInterval(() => {
        new attackerGroup.Sprite();
    }, 4 * 1000);

    startTime = new Date();
}

function drawGame() {
    runtime = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);

    clear();
    background(assetGameBackGround);

    // Entity logic
    for (let i = 0; i < attackerGroup.length; i++) {
        let attacker = attackerGroup[i];

        // Location checkers
        if (attacker.x <= frontLineXPos) {
            attacker.moveTowards(150, gameHeight/2, 1);

        }
        // Overlap checkers

    }

    for (let i = 0; i < defenderGroup.length; i++) {
        let defender = defenderGroup[i];

    }

    timer.text = runtime;
}

function loadLevel(level) {
    let currentLevel = levels.get(level);
    for (const key in currentLevel) {
        levelData.put(key, currentLevel.get(key));
    }
}

function getRandomEnemyPos() {
    let ypos;
    let randomrow = random(5);
    let rows = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}

    return [enemyStartLine, 140 + (randomrow - 1) * 160 + 80];
}