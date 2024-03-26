const enemyStartLine = gameWidth - 150;

// let cursor;

// Time handler
let timeHandler;

let mouseOnGridPos;
let clockInfoSprite, selectingInfoSprite, pointsInfoSprite;
let defenderGroup, vacuumGroup, waterGunGroup, brokenFloorGroup, mirrorGroup, cloudGroup, attackerGroup, overlayGroup,
    hudGroup, hudCardsGroup, projectilesGroup, informationHUDGroup;
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
// let grid = {
//     row1: {
//         column1: null,
//         column2: null,
//         column3: null,
//         column4: null,
//         column5: null,
//         column6: null,
//         column7: null,
//         column8: null,
//         column9: null
//     },
//     row2: {
//         column1: null,
//         column2: null,
//         column3: null,
//         column4: null,
//         column5: null,
//         column6: null,
//         column7: null,
//         column8: null,
//         column9: null
//     },
//     row3: {
//         column1: null,
//         column2: null,
//         column3: null,
//         column4: null,
//         column5: null,
//         column6: null,
//         column7: null,
//         column8: null,
//         column9: null
//     },
//     row4: {
//         column1: null,
//         column2: null,
//         column3: null,
//         column4: null,
//         column5: null,
//         column6: null,
//         column7: null,
//         column8: null,
//         column9: null
//     },
//     row5: {
//         column1: null,
//         column2: null,
//         column3: null,
//         column4: null,
//         column5: null,
//         column6: null,
//         column7: null,
//         column8: null,
//         column9: null
//     }
// };
let gridMode = "";
let placingMode = "";

let isSelectingOnGrid = false;
let gridSelectorMode = "";
let gridSelectorSprite;

// HUD
let hud, hudCardFloor, hudCardCloud, hudCardWaterGun, hudCardMirror;

// Entities
let attackerTypes = {
    ghostNormal: {
        health: 200,
        damage: 30,
        velocity: 2.5,
        asset: assetGhostNormal,
        roamingSound: [audioGhostRoamingA],
        deathSound: audioGhostDying
    },
    ghostFemale: {
        health: 200,
        damage: 30,
        velocity: 2.5,
        asset: assetGhostFemale,
        roamingSound: [audioGhostFemaleRoamingA, audioGhostFemaleRoamingB],
        deathSound: audioGhostFemaleDying
    },
    ghostGangster: {
        health: 260,
        damage: 30,
        velocity: 2.5,
        asset: assetGhostGangster,
        roamingSound: [audioGhostRoamingA],
        deathSound: audioGhostDying
    },
    ghostMysterious: {
        health: 200,
        damage: 30,
        velocity: 2.5,
        asset: assetGhostMysterious,
        roamingSound: [audioGhostRoamingB],
        deathSound: audioGhostDying
    }
};
let defenderTypes = {
    vacuum: null,
    waterGun: {price: 100, damage: 20, health: 80},
    brokenFloor: {price: 25, slowingRate: 3, usageTime: 20},
    mirror: {price: 200, health: 40, life: 2},
    cloud: {price: 50, productionTime: 12, productionAmount: 10, health: 50}
}

class gameTimer {

    intervals = {};
    pinpoints = {};

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
            if (this.runtime - intervalData["runtimeCreated"] === intervalData["deleteAfter"] && intervalData["deleteAfter"] > 0) {
                delete this.intervals[interval];
                console.log("Deleted interval: " + interval);
            }
            // if (this.getIntervalTimeLeft(interval) === 0) {
            //     intervalData[4]();
            // }
        }
    }

    setInterval(name, interval, deleteAfter = -1 /*, task = () => {}*/) {
        this.intervals[name] = {
            dateCreated: new Date(),
            runtimeCreated: this.runtime,
            interval: interval,
            deleteAfter: deleteAfter/*, task*/
        };
        console.log("Interval \"{name}\" created at runtime {runtime} with interval {interval}".replace("{name}", name).replace("{runtime}", this.runtime).replace("{interval}", interval));
    }

    getIntervalTimeLeft(name) {
        if (this.intervals.hasOwnProperty(name)) {
            let interval = this.intervals[name]
            return (this.runtime - interval["runtimeCreated"]) % interval["interval"];
        }
    }

    removeInterval() {
        if (this.intervals.hasOwnProperty(name)) {
            delete this.intervals[name];
        } else {
            console.log("Interval \"{name}\" does not exist.".replace("{name}", name))
        }
    }

    setPinpoint(id = "") {
        if (id != null && id !== "") {
            this.pinpoints[id] = this.runtime;
        } else {
            console.log("Set pinpoint failed: Empty ID is not possible.")
        }
    }

    getTimeSincePinpoint(id = "") {
        if (id != null && id !== "") {
            if (this.pinpoints.has(id)) return this.runtime - this.pinpoints[id];
            else new Error("Pinpoint by id \"{id}\" was not found.".replace("{id}", id));
        } else {
            console.log("Get time since pinpoint failed: Empty ID is not possible.")
        }
    }


}

function setupGame() {
    timeHandler = new gameTimer(60);

    // Defender group
    defenderGroup = new Group();
    defenderGroup.layer = 1;
    // defenderGroup.collider = "kinematic";
    vacuumGroup = new defenderGroup.Group();


    waterGunGroup = new defenderGroup.Group();


    brokenFloorGroup = new defenderGroup.Group();


    mirrorGroup = new defenderGroup.Group();


    cloudGroup = new defenderGroup.Group();

    // Attacker group
    attackerGroup = new Group();
    attackerGroup.layer = 2;
    attackerGroup.h = attackerGroup.w = 50;
    attackerGroup.x = 2000;
    attackerGroup.y = () => getGridPos(1920, random(140, 940))["y"];
    // attackerGroup.vel.x = () => random(-3, -0.5);
    attackerGroup.vel.x = -4;
    attackerGroup.collider = "kinematic";

    projectilesGroup = new Group();

    overlayGroup = new Group();
    overlayGroup.layer = 10;
    overlayGroup.collider = 'none';
    // Timer

    informationHUDGroup = new Group();
    informationHUDGroup.collider = "none";
    informationHUDGroup.layer = 20;
    informationHUDGroup.fill = color(0, 0);
    informationHUDGroup.strokeWeight = 0;
    informationHUDGroup.textSize = 24;
    informationHUDGroup.textFill = "white";

    clockInfoSprite = new informationHUDGroup.Sprite(80, 60);
    selectingInfoSprite = new informationHUDGroup.Sprite(80, 80);
    pointsInfoSprite = new informationHUDGroup.Sprite(486, 100);

    gridSelectorSprite = new overlayGroup.Sprite();
    gridSelectorSprite.fill = color(40, 255, 40, 150);


    // mouse.visible = false;
    // cursor = new overlayGroup.Sprite();
    // // cursor.x = cursor.y = -50;
    // cursor.addAni("default", "asset/cursor/default.png");
    // cursor.scale = 0.04;
    // cursor.changeAni("default");

    hudGroup = new Group();
    hudGroup.layer = 15;
    hudGroup.collider = 'kinematic';

    hudCardsGroup = new hudGroup.Group();


    hud = new hudGroup.Sprite(700, 61);
    hud.img = assetGameBackgroundHUD;

    hudCardFloor = new hudCardsGroup.Sprite(611, 61);
    hudCardFloor.img = assetHUDCardBrokenFloor;
    hudCardFloor.price = 25;
    hudCardFloor.type = "brokenFloor";
    hudCardFloor.defaultX = hudCardFloor.x;
    hudCardFloor.defaultY = hudCardFloor.Y;

    hudCardCloud = new hudCardsGroup.Sprite(709, 61);
    hudCardCloud.img = assetHUDCardCloud;
    hudCardCloud.price = 50;
    hudCardCloud.type = "cloud";
    hudCardCloud.defaultX = hudCardCloud.x;
    hudCardCloud.defaultY = hudCardCloud.Y;

    hudCardWaterGun = new hudCardsGroup.Sprite(807, 61);
    hudCardWaterGun.img = assetHUDCardWaterGun;
    hudCardWaterGun.price = 100;
    hudCardWaterGun.type = "waterGun";
    hudCardWaterGun.defaultX = hudCardWaterGun.x;
    hudCardWaterGun.defaultY = hudCardWaterGun.Y;

    hudCardMirror = new hudCardsGroup.Sprite(905, 61);
    hudCardMirror.img = assetHUDCardMirror;
    hudCardMirror.price = 200;
    hudCardMirror.type = "mirror";
    hudCardMirror.defaultX = hudCardMirror.x;
    hudCardMirror.defaultY = hudCardMirror.Y;

    // hud.draw = () => {
    //
    // }

    // Test spawning
    // let randomSpawn = setInterval(() => {
    //     new attackerGroup.Sprite();
    // }, 4 * 1000);
    timeHandler.setInterval("ghostSpawn", 4 * 60, 120 * 60);
    timeHandler.setInterval("periodicPoints", 10 * 60);

    attackerGroup.overlaps(defenderGroup, attackerOverlapsDefender);
}

function drawGame() {
    timeHandler.update();

    // console.log(timer.getRuntime() + " " + frameCount + " " + timer.getTime());

    clear();
    background(assetGameBackGround);


    // Stage one

    gameStageOne();


    mouseOnGridPos = getGridPos(mouse.x, mouse.y);

    // console.log(world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"], attackerGroup));

    // HUD
    for (let card of hudCardsGroup) {
        if (points > card.price) {
            card.opacity = 1;
            if (card.mouse.hovering() && !isSelectingOnGrid) {
                mouse.cursor = "pointer";
                card.scale = 1.1;
            } else {
                mouse.cursor = "default";
                card.scale = 1;
            }

            if (card.mouse.presses("left")) {
                gridMode = "placing";
                isSelectingOnGrid = true;
                placingMode = card.type;
            }

        } else {
            card.opacity = 0.4;
        }
    }


    // When selecting on grid
    if (mouseOnGridPos["onGrid"]) {
        // Toggle grid selector mode
        if (mouse.presses("right")) {
            isSelectingOnGrid = !isSelectingOnGrid;
        }

        // When in selecting mode
        if (isSelectingOnGrid && world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"], defenderGroup).length === 0) {
            gridSelectorSprite.w = mouseOnGridPos["width"];
            gridSelectorSprite.h = mouseOnGridPos["height"];

            switch (gridMode) {
                case "placing":
                    if (mouse.presses("left")) {
                        if (points >= defenderTypes[placingMode]["price"]) {
                            new defenderGroup.Sprite(mouseOnGridPos["x"], mouseOnGridPos["y"]);
                            audioPlop.play();
                            // points -= 30;
                            isSelectingOnGrid = false;
                        } else {
                            isSelectingOnGrid = false;
                        }
                    }
                    break;
                case "removing":
                    break;

            }

            gridSelectorSprite.visible = true;
        } else {
            gridSelectorSprite.visible = false;
        }
        gridSelectorSprite.x = mouseOnGridPos["x"];
        gridSelectorSprite.y = mouseOnGridPos["y"];
    } else {
        gridSelectorSprite.visible = false;
    }


    // if (selectorOnGrid["onGrid"] && !gridSelectorSprite.overlaps(defenderGroup)) {
    //     gridSelectorSprite.stroke = "red";
    //     gridSelectorSprite.w = selectorOnGrid["width"];
    //     gridSelectorSprite.h = selectorOnGrid["height"];
    //     gridSelectorSprite.visible = true;
    //
    //
    //
    // } else {
    //     gridSelectorSprite.visible = false;
    //
    // }

    // ghostSpawn interval
    if (timeHandler.getIntervalTimeLeft("ghostSpawn") === 0) {
        new attackerGroup.Sprite();
    }

    // // Spawn on grid
    // if (
    //     selectorOnGrid["onGrid"]
    //     && grid[selectorOnGrid["rowName"]][selectorOnGrid["columnName"]] == null
    //     && mouse.presses("left")
    //     && isSelectingOnGrid
    //     // && points >= 30
    // ) {
    //     new defenderGroup.Sprite(selectorOnGrid["x"], selectorOnGrid["y"]);
    //     audioPlop.play();
    //     points -= 30;
    //     isSelectingOnGrid = !isSelectingOnGrid;
    // }

    // console.log(defenderGroup)

    // Entity logic
    for (let i = 0; i < attackerGroup.length; i++) {
        let attacker = attackerGroup[i];

        // Location checkers
        if (attacker.x <= frontLineXPos) {
            attacker.moveTowards(150, gameHeight / 2, 1);

        }
        // Overlap checkers
        // if (attacker.overlaps(defenderGroup)) {
        //     console.log("Test");
        // }

    }

    for (let i = 0; i < defenderGroup.length; i++) {
        let defender = defenderGroup[i];

    }

    // cursor.moveTowards(mouse, 0.5);
    // cursor.x = mouse.x;
    // cursor.y = mouse.y;

    // Click noise
    if (mouse.presses("left")) {
        switch (Math.floor(random(2))) {
            case 0:
                audioMouseClickA.play();
                break;
            case 1:
                audioMouseClickB.play();
                break;
        }
    }

    // Periodic points
    if (timeHandler.getIntervalTimeLeft("periodicPoints") === 0) {
        // audioWaterDrop.play();
        points += 20;
    }

    // Update info HUD
    clockInfoSprite.text = timeHandler.getTime() < 60 ? timeHandler.getTime() + "s" : Math.floor(timeHandler.getTime() / 60) + "m " + timeHandler.getTime() % 60 + "s";
    selectingInfoSprite.text = "Selecting: " + isSelectingOnGrid;
    pointsInfoSprite.text = points;
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

function attackerOverlapsDefender(attacker, defender) {
    attacker.remove();
    defender.remove();
}

function spawnDefender(type = "", x, y) {
    switch (type) {
        case "brokenFloor":
            break;
        case "waterGun":
            break;
        case "cloud":
            break;
        case "mirror":
            break;
    }
}