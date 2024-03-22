const enemyStartLine = gameWidth - 150;


let mouseOnGrid;
let timer, runtime = 0;
let defenderGroup, attackerGroup, overlayGroup, hudGroup, projectilesGroup;
let frontLineXPos = 500;
let levelData = {};
let grid, gridSelector;
let ghostTypes = {1: 1, 2: 2, 3: 3, 4: 4};

let testSprite;

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
    attackerGroup.y = () => getGridPos(1920, random(140, 940));
    // attackerGroup.vel.x = () => random(-3, -0.5);
    attackerGroup.vel.x = -4;
    attackerGroup.collider = 'kinematic';

    projectilesGroup = new Group();

    overlayGroup = new Group();
    overlayGroup.collider = 'none';

    hudGroup = new Group();
    hudGroup.collider = 'none';

    testSprite = new Sprite();

    // Test spawning
    let randomSpawn = setInterval(() => {
        new attackerGroup.Sprite();
    }, 4 * 1000);
}

function drawGame() {
    runtime = Math.floor(frameCount / 60);

    clear();
    background(assetGameBackGround);

    // Entity logic
    for (let i = 0; i < attackerGroup.length; i++) {
        let attacker = attackerGroup[i];

        // Location checkers
        if (attacker.x <= frontLineXPos) {
            attacker.moveTowards(150, gameHeight / 2, 1);

        }
        // Overlap checkers

    }

    for (let i = 0; i < defenderGroup.length; i++) {
        let defender = defenderGroup[i];

    }

    mouseOnGrid = getGridPos(mouse.x, mouse.y);
    testSprite.x = mouseOnGrid[0];
    testSprite.y = mouseOnGrid[1];

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

function getGridPos(xPos = 0, yPos = 0) {
    let columns = {
        column1: {minInc: 502, maxExc: 662, center: 582},
        column2: {minInc: 662, maxExc: 790, center: 726},
        column3: {minInc: 790, maxExc: 918, center: 854},
        column4: {minInc: 918, maxExc: 1046, center: 982},
        column5: {minInc: 1046, maxExc: 1174, center: 1110},
        column6: {minInc: 1174, maxExc: 1302, center: 1238},
        column7: {minInc: 1302, maxExc: 1430, center: 1366},
        column8: {minInc: 1430, maxExc: 1558, center: 1494},
        column9: {minInc: 1558, maxExc: 1718, center: 1638},
        spawningColumn: {minInc: 1718, maxExc: 1920, center: 2000}
    }
    let rows = {
        row1: {minInc: 140, maxExc: 300, center: 220},
        row2: {minInc: 300, maxExc: 460, center: 380},
        row3: {minInc: 460, maxExc: 620, center: 540},
        row4: {minInc: 620, maxExc: 780, center: 700},
        row5: {minInc: 780, maxExc: 940, center: 860}
    }
    let xNew = xPos, yNew = yPos, columnName = "", rowName = "";

    for (const [column, columnProperties] of Object.entries(columns)) {
        if (xPos >= columnProperties["minInc"] && xPos < columnProperties["maxExc"]) {
            columnName = column;
            xNew = columnProperties["center"];
            break;
        }

    }
    for (const [row, rowProperties] of Object.entries(rows)) {
        if (yPos >= rowProperties["minInc"] && yPos < rowProperties["maxExc"]) {
            rowName = row;
            yNew = rowProperties["center"];
            break;
        }
    }

    return [xNew, yNew, columnName, rowName]
}