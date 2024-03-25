const enemyStartLine = gameWidth - 150;

// let cursor;

let selectorOnGrid;
let clockInfoSprite, timeHandler;
let selectingInfoSprite;
let defenderGroup, attackerGroup, overlayGroup, hudGroup, projectilesGroup, informationHUDGroup;
let frontLineXPos = 500;
let levelData = {};

// Grid related
let columns = {
    column1: {minInc: 502, maxExc: 662, center: 582, width: 160},
    column2: {minInc: 662, maxExc: 790, center: 726, width: 128},
    column3: {minInc: 790, maxExc: 918, center: 854, width: 128},
    column4: {minInc: 918, maxExc: 1046, center: 982, width: 128},
    column5: {minInc: 1046, maxExc: 1174, center: 1110, width: 128},
    column6: {minInc: 1174, maxExc: 1302, center: 1238, width: 128},
    column7: {minInc: 1302, maxExc: 1430, center: 1366, width: 128},
    column8: {minInc: 1430, maxExc: 1558, center: 1494, width: 128},
    column9: {minInc: 1558, maxExc: 1718, center: 1638, width: 160},
    spawningColumn: {minInc: 1718, maxExc: 1920, center: 2000, width: 0}
};
let rows = {
    row1: {minInc: 140, maxExc: 300, center: 220, height: 160},
    row2: {minInc: 300, maxExc: 460, center: 380, height: 160},
    row3: {minInc: 460, maxExc: 620, center: 540, height: 160},
    row4: {minInc: 620, maxExc: 780, center: 700, height: 160},
    row5: {minInc: 780, maxExc: 940, center: 860, height: 160}
};
let grid = {
    row1: {
        column1: null,
        column2: null,
        column3: null,
        column4: null,
        column5: null,
        column6: null,
        column7: null,
        column8: null,
        column9: null
    },
    row2: {
        column1: null,
        column2: null,
        column3: null,
        column4: null,
        column5: null,
        column6: null,
        column7: null,
        column8: null,
        column9: null
    },
    row3: {
        column1: null,
        column2: null,
        column3: null,
        column4: null,
        column5: null,
        column6: null,
        column7: null,
        column8: null,
        column9: null
    },
    row4: {
        column1: null,
        column2: null,
        column3: null,
        column4: null,
        column5: null,
        column6: null,
        column7: null,
        column8: null,
        column9: null
    },
    row5: {
        column1: null,
        column2: null,
        column3: null,
        column4: null,
        column5: null,
        column6: null,
        column7: null,
        column8: null,
        column9: null
    }
};

let isSelectingOnGrid = false;
let gridSelectorMode = "";

let gridSelectorSprite;
let ghostTypes = {
    normal: {health: 200, damage: 30, velocity: 2.5},
    female: 2,
    cool: 3,
    angry: 4
};

class gameTimer {

    intervals = {};

    constructor(fps = 60) {
        this.runtime = 0;
        this.time = 0;
        this.frame = 0;
        this.fps = fps;
        this.startDate = new Date();
    }

    getRuntime() {
        return this.runtime;
    }

    getTime() {
        return this.time;
    }

    update() {
        // Update frame and runtime
        this.frame = ++this.runtime % this.fps;
        // update time
        if (this.frame === 0) {
            this.time++;
        }

        for (const [interval, intervalData] of Object.entries(this.intervals)) {
            if (this.runtime - intervalData[1] === intervalData[3]) {
                delete this.intervals[interval];
                console.log("Deleted interval: " + interval);
            }
            // if (this.getIntervalTimeLeft(interval) === 0) {
            //     intervalData[4]();
            // }
        }
    }

    setInterval(name, interval, deleteAfter /*, task = () => {}*/) {
        this.intervals[name] = [new Date(), this.runtime, interval, deleteAfter/*, task*/];
    }

    getIntervalTimeLeft(name) {
        if (this.intervals.hasOwnProperty(name)) {
            let interval = this.intervals[name]
            return (this.runtime - interval[1]) % interval[2];
        }
    }

    removeInterval() {
        if (this.intervals.hasOwnProperty(name)) {
            delete this.intervals[name];
        } else {
            console.log("Interval \"{name}\" does not exist.".replace("{name}", name))
        }
    }


}

function setupGame() {
    timeHandler = new gameTimer(60);
    // Defender group
    defenderGroup = new Group();
    defenderGroup.layer = 1;
    defenderGroup.collider = "kinematic";

    // Attacker group
    attackerGroup = new Group();
    attackerGroup.layer = 1;
    attackerGroup.h = attackerGroup.w = 50;
    attackerGroup.x = 2000;
    attackerGroup.y = () => getGridPos(1920, random(140, 940))[1];
    // attackerGroup.vel.x = () => random(-3, -0.5);
    attackerGroup.vel.x = -4;
    attackerGroup.collider = "kinematic";

    projectilesGroup = new Group();

    overlayGroup = new Group();
    overlayGroup.layer = 10;
    overlayGroup.collider = 'none';
    // Timer

    informationHUDGroup = new overlayGroup.Group();
    informationHUDGroup.fill = color(0, 0);
    informationHUDGroup.strokeWeight = 0;
    informationHUDGroup.textSize = 24;
    informationHUDGroup.textFill = "white";

    clockInfoSprite = new informationHUDGroup.Sprite(80, 60);
    selectingInfoSprite = new informationHUDGroup.Sprite(80, 80)

    gridSelectorSprite = new overlayGroup.Sprite();

    // mouse.visible = false;
    // cursor = new overlayGroup.Sprite();
    // // cursor.x = cursor.y = -50;
    // cursor.addAni("default", "asset/cursor/default.png");
    // cursor.scale = 0.04;
    // cursor.changeAni("default");

    hudGroup = new Group();
    hudGroup.collider = 'none';


    // Test spawning
    // let randomSpawn = setInterval(() => {
    //     new attackerGroup.Sprite();
    // }, 4 * 1000);
    timeHandler.setInterval("ghostSpawn", 4 * 60, 120 * 60);
}

function drawGame() {
    timeHandler.update();

    // console.log(timer.getRuntime() + " " + frameCount + " " + timer.getTime());

    clear();
    background(assetGameBackGround);

    selectorOnGrid = getGridPos(mouse.x, mouse.y);

    if (selectorOnGrid["onGrid"] && grid[selectorOnGrid["rowName"]][selectorOnGrid["columnName"]] == null && isSelectingOnGrid) {
        gridSelectorSprite.stroke = "red";
        gridSelectorSprite.w = selectorOnGrid["width"];
        gridSelectorSprite.h = selectorOnGrid["height"];
        gridSelectorSprite.visible = true;
    } else {
        gridSelectorSprite.visible = false;
    }

    gridSelectorSprite.x = selectorOnGrid["x"];
    gridSelectorSprite.y = selectorOnGrid["y"];

    // Stage 1
    gameStageOne();

    // ghostSpawn interval
    if (timeHandler.getIntervalTimeLeft("ghostSpawn") === 0) {
        new attackerGroup.Sprite();
    }

    // Spawn on grid
    if (selectorOnGrid["onGrid"] && grid[selectorOnGrid["rowName"]][selectorOnGrid["columnName"]] == null && mouse.presses("left") && isSelectingOnGrid) {
        grid[selectorOnGrid["rowName"]][selectorOnGrid["columnName"]] = new defenderGroup.Sprite(selectorOnGrid["x"], selectorOnGrid["y"]);
        isSelectingOnGrid = !isSelectingOnGrid;
    }

    // Toggle grid selector mode
    if (mouse.presses("left")) {
        isSelectingOnGrid = !isSelectingOnGrid;
    }

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

    // cursor.moveTowards(mouse, 0.5);
    // cursor.x = mouse.x;
    // cursor.y = mouse.y;

    // Update time display
    clockInfoSprite.text = timeHandler.getTime() < 60 ? timeHandler.getTime() + "s" : Math.floor(timeHandler.getTime() / 60) + "m " + timeHandler.getTime() % 60 + "s";
    selectingInfoSprite.text = "Selecting: " + isSelectingOnGrid;
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
    let xNew = xPos, yNew = yPos, columnName = "unknown", rowName = "unknown", posMatch = false, width = 0, height = 0;

    for (const [column, columnProperties] of Object.entries(columns)) {
        if (xPos >= columnProperties["minInc"] && xPos < columnProperties["maxExc"]) {
            columnName = column;
            width = columnProperties["width"];
            xNew = columnProperties["center"];
            break;
        }
    }

    for (const [row, rowProperties] of Object.entries(rows)) {
        if (yPos >= rowProperties["minInc"] && yPos < rowProperties["maxExc"]) {
            rowName = row;
            height = rowProperties["height"];
            yNew = rowProperties["center"];
            break;
        }
    }

    if (rowName !== "unknown" && columnName !== "unknown") posMatch = true;

    return {x: xNew, y: yNew, columnName: columnName, rowName: rowName, onGrid: posMatch, width: width, height: height}
}

function gameStageOne() {
}