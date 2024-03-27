const enemyStartLine = gameWidth - 150;

let cursor;
let gameOverButton;

// Time handler
let timeHandler;

let mouseOnGridPos;
let character, bubble;
let clockInfoSprite, pointsInfoSprite;
let defenderGroup, vacuumGroup, waterGunGroup, brokenFloorGroup, mirrorGroup, cloudGroup, attackerGroup, overlayGroup,
    hudGroup, hudCardsGroup, projectilesGroup, informationHUDGroup;
let normalGhostGroup, femaleGhostGroup, gangsterGhostGroup, mysteriousGhostGroup;
let frontLineXPos = 300;
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

let gridMode = "";
let placingMode = "";

let isSelectingOnGrid = false;
let gridSelectorMode = "";
let gridSelectorSprite;

// HUD
let hud, hudCardFloor, hudCardCloud, hudCardWaterGun, hudCardMirror;

// Entities
let attackerTypes;
let defenderTypes = {
    vacuum: null,
    waterGun: {price: 100, damage: 60, health: 80},
    brokenFloor: {price: 25, slowingRate: 3, usageTime: 20},
    mirror: {price: 200, health: 40, life: 2},
    cloud: {price: 50, productionTime: 12, productionAmount: 30, health: 50}
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

function activateVacuum(vacuum) {
    vacuum.activated = true;
    vacuum.vel.x = 3;
    vacuum.life = 20 * 60;
    audioVacuum.play();
}

function setupGame() {
    timeHandler = new gameTimer(60);

    defenderGroup = new Group();
    vacuumGroup = new defenderGroup.Group();
    waterGunGroup = new defenderGroup.Group();
    brokenFloorGroup = new defenderGroup.Group();
    mirrorGroup = new defenderGroup.Group();
    cloudGroup = new defenderGroup.Group();
    attackerGroup = new Group();
    normalGhostGroup = new attackerGroup.Group();
    femaleGhostGroup = new attackerGroup.Group();
    gangsterGhostGroup = new attackerGroup.Group();
    mysteriousGhostGroup = new attackerGroup.Group();
    projectilesGroup = new Group();

    attackerTypes = {
        1: {
            health: 200,
            damage: 30,
            velocity: -1.8,
            asset: assetGhostNormal,
            roamingSound: [audioGhostRoamingA],
            deathSound: audioGhostDying
        },
        2: {
            health: 160,
            damage: 30,
            velocity: -2.4,
            asset: assetGhostFemale,
            roamingSound: [audioGhostFemaleRoamingA, audioGhostFemaleRoamingB],
            deathSound: audioGhostFemaleDying
        },
        3: {
            health: 260,
            damage: 30,
            velocity: -1.4,
            asset: assetGhostGangster,
            roamingSound: [audioGhostRoamingA],
            deathSound: audioGhostDying
        },
        4: {
            health: 200,
            damage: 30,
            velocity: -2.2,
            asset: assetGhostMysterious,
            roamingSound: [audioGhostRoamingB],
            deathSound: audioGhostDying
        }
    };

    attackerGroup.overlaps(mirrorGroup, (attacker, mirror) => {
        if (attacker.type !== 3) {
            mirror.health--;
            attacker.remove();
            attackerTypes[attacker.type]["deathSound"].play();
            if (mirror.health === 1) {
                mirror.changeAni("broken");
                audioBreakMirror.play();
            } else if (mirror.health === 0) {
                mirror.remove();
                audioDestroyMirror.play();
            }
        }
    });

    vacuumGroup.scale = 0.9;
    vacuumGroup.img = assetVacuum;
    vacuumGroup.activated = false;
    for (let i = 0; i < 5; i++) {
        new vacuumGroup.Sprite(400, 220 + i * 160);

    }


    // Defender group
    defenderGroup.layer = 1;
    defenderGroup.collider = "none";

    projectilesGroup.vel.x = 5;
    projectilesGroup.collider = "none";
    projectilesGroup.img = assetWaterProjectile;

    attackerGroup.scale = 0.95;

    projectilesGroup.overlaps(attackerGroup, (projectile, attacker) => {
        if (!damageEntity(attacker, defenderTypes["waterGun"]["damage"])) {
            attackerTypes[attacker.type]["deathSound"].play();
        } else {
            audioPlop.play();
        }

        projectile.remove();
        audioSplashB.play();
    });

    attackerGroup.overlaps(vacuumGroup, (attacker, vacuum) => {
        if (vacuum.activated) {
            attacker.remove();
            attackerTypes[attacker.type]["deathSound"].play();
        } else {
            activateVacuum(vacuum);
            attacker.remove();
            attackerTypes[attacker.type]["deathSound"].play();
        }
    });

    attackerGroup.overlaps(brokenFloorGroup, (attacker, brokenFloor) => {
        attacker.vel.x /= defenderTypes["brokenFloor"]["slowingRate"];
    });

    attackerGroup.overlapped(brokenFloorGroup, (attacker, brokenFloor) => {
        attacker.vel.x *= defenderTypes["brokenFloor"]["slowingRate"];
    });


    waterGunGroup.addAni("idle", "asset/art/defender/Waterpistool.png");
    waterGunGroup.addAni("shooting", loadAnimation(
        "asset/art/defender/Waterpistool.png",
        "asset/art/defender/Waterpistool met druppel klein.png",
        "asset/art/defender/Waterpistool met druppel groot.png"
    ));

    brokenFloorGroup.img = assetBrokenFloor;

    mirrorGroup.health = 2;

    mirrorGroup.addAni("inTact", "asset/art/defender/Spiegel.png");
    mirrorGroup.addAni("broken", "asset/art/defender/Spiegel gebroken.png");

    cloudGroup.img = assetCloud;

    // Attacker group
    attackerGroup.layer = 2;
    attackerGroup.x = 2000;
    attackerGroup.y = () => getGridPos(1920, random(140, 940))["y"];
    attackerGroup.collider = "kinematic";

    normalGhostGroup.img = assetGhostNormal;
    normalGhostGroup.type = 1;
    normalGhostGroup.vel.x = attackerTypes[1]["velocity"];
    normalGhostGroup.health = attackerTypes[1]["health"];
    normalGhostGroup.damage = attackerTypes[1]["damage"];

    femaleGhostGroup.img = assetGhostFemale;
    femaleGhostGroup.type = 2;
    femaleGhostGroup.vel.x = attackerTypes[2]["velocity"];
    femaleGhostGroup.health = attackerTypes[2]["health"];
    femaleGhostGroup.damage = attackerTypes[2]["damage"];


    gangsterGhostGroup.img = assetGhostGangster;
    gangsterGhostGroup.type = 3;
    gangsterGhostGroup.vel.x = attackerTypes[3]["velocity"];
    gangsterGhostGroup.health = attackerTypes[3]["health"];
    gangsterGhostGroup.damage = attackerTypes[3]["damage"];


    mysteriousGhostGroup.img = assetGhostMysterious;
    mysteriousGhostGroup.type = 4;
    mysteriousGhostGroup.vel.x = attackerTypes[4]["velocity"];
    mysteriousGhostGroup.health = attackerTypes[4]["health"];
    mysteriousGhostGroup.damage = attackerTypes[4]["damage"];

    overlayGroup = new Group();
    overlayGroup.layer = 10;
    overlayGroup.collider = 'none';

    character = new overlayGroup.Sprite();
    character.img = assetCharacter;
    character.x = -120;

    bubble = new overlayGroup.Sprite();
    bubble.img = assetBubble;
    bubble.scale = 0.5
    bubble.x = 1000;
    bubble.y = gameHeight / 2 - 100;
    bubble.textSize = 24;
    bubble.visible = false;

    informationHUDGroup = new Group();
    {
        informationHUDGroup.collider = "none";
        informationHUDGroup.layer = 20;
        informationHUDGroup.fill = color(0, 0);
        informationHUDGroup.strokeWeight = 0;
        informationHUDGroup.textSize = 24;
        informationHUDGroup.textFill = "white";
    } // information hud group properties

    clockInfoSprite = new informationHUDGroup.Sprite(80, 60);
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
    hudGroup.collider = "kinematic";
    hudGroup.layer = 15;

    hud = new hudGroup.Sprite(700, 61);
    hud.img = assetGameBackgroundHUD;

    hudCardsGroup = new hudGroup.Group();
    hudCardsGroup.textSize = 24;
    hudCardsGroup.textFill = "white";

    hudCardFloor = new hudCardsGroup.Sprite();
    {
        hudCardFloor.img = assetHUDCardBrokenFloor;
        hudCardFloor.selected = false;
        hudCardFloor.text = "1";
        hudCardFloor.price = 25;
        hudCardFloor.type = "brokenFloor";
        hudCardFloor.defaultX = hudCardFloor.x = 611;
        hudCardFloor.defaultY = hudCardFloor.y = 61;
    } // broken floor card

    hudCardCloud = new hudCardsGroup.Sprite();
    {
        hudCardCloud.img = assetHUDCardCloud;
        hudCardCloud.selected = false;
        hudCardCloud.text = "2";
        hudCardCloud.price = 50;
        hudCardCloud.type = "cloud";
        hudCardCloud.defaultX = hudCardCloud.x = 709;
        hudCardCloud.defaultY = hudCardCloud.y = 61;
    } // cloud card

    hudCardWaterGun = new hudCardsGroup.Sprite();
    {
        hudCardWaterGun.img = assetHUDCardWaterGun;
        hudCardWaterGun.selected = false;
        hudCardWaterGun.text = "3";
        hudCardWaterGun.price = 100;
        hudCardWaterGun.type = "waterGun";
        hudCardWaterGun.defaultX = hudCardWaterGun.x = 807;
        hudCardWaterGun.defaultY = hudCardWaterGun.y = 61;
    } // waterGun card

    hudCardMirror = new hudCardsGroup.Sprite();

    {
        hudCardMirror.img = assetHUDCardMirror;
        hudCardMirror.selected = false;
        hudCardMirror.text = "4";
        hudCardMirror.price = 200;
        hudCardMirror.type = "mirror";
        hudCardMirror.defaultX = hudCardMirror.x = 905;
        hudCardMirror.defaultY = hudCardMirror.y = 61;
    } // mirror card

    // hud.draw = () => {
    //
    // }

    // Test spawning
    // let randomSpawn = setInterval(() => {
    //     new attackerGroup.Sprite();
    // }, 4 * 1000);
    timeHandler.setInterval("periodicPoints", 8 * 60);

    // attackerGroup.overlaps(defenderGroup, attackerOverlapsDefender);

}

function drawGame() {
    if (gameStage === 0) {
        timeHandler.update();

        // console.log(timer.getRuntime() + " " + frameCount + " " + timer.getTime());

        clear();
        background(assetGameBackGround);

        // cursor.x = mouse.x;
        // cursor.y = mouse.y;


        // Story logic

        if (timeHandler.getRuntime() === 1) {
            audioBackgroundMain.loop();
        } else if (timeHandler.getTime() > 0 && timeHandler.getTime() < 3) {
        } else if (timeHandler.getTime() >= 3 && timeHandler.getTime() < 4) {
            character.moveTowards(400, gameHeight / 2, 0.2);
        } else if (timeHandler.getTime() >= 4 && timeHandler.getTime() < 8) {
            if (timeHandler.getRuntime() === 4.5 * 60) {
                audioGrumble.play();
            }
            bubble.visible = true;
            bubble.text = "HELP, DE GEESTEN KOMEN ERAAN!";
        } else if (timeHandler.getTime() >= 8 && timeHandler.getTime() < 13) {
            bubble.text = "PLAATS SNEL VERDEDIGERS OM ZE TEGEN TE HOUDEN!";
        } else if (timeHandler.getTime() >= 13 && timeHandler.getTime() < 18) {
            bubble.text = "GEBRUIK DE KAARTEN AAN DE BOVENKANT VAN HET SCHERM!";
        } else if (timeHandler.getTime() >= 18 && timeHandler.getTime() < 18) {
            bubble.text = "VEEL SUCCES! EN BEDANKT!!";
        } else if (timeHandler.getTime() >= 18 && timeHandler.getTime() < 30) {
            bubble.visible = false;
            character.moveTowards(-400, gameHeight / 2, 0.3);
        } else if (timeHandler.getTime() >= 30) {
            character.visible = false;
        }
        if (timeHandler.getRuntime() / 60 === 20) {
            timeHandler.setInterval("ghostSpawn", 6 * 60, 4 * 6 * 60);
        }

        if (timeHandler.getRuntime() / 60 === 20 + 4 * 6 * 2) {
            timeHandler.setInterval("ghostSpawn", 4 * 60, 14 * 4 * 60);
            audioBackgroundWave.loop();
            audioBackgroundMain.pause();
        }
        if (timeHandler.getRuntime() / 60 === 20 + 4 * 8 + 14 * 4) {
            timeHandler.setInterval("ghostSpawn", 8 * 60);
            audioBackgroundWave.pause();
            audioBackgroundMain.loop();
        }

        mouseOnGridPos = getGridPos(mouse.x, mouse.y);
        // console.log(world.getSpriteAt(mouse.x, mouse.y, defenderGroup));

        let gridAvailable = !world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"]).some(sprite => sprite.groups.some(group => defenderGroup.subgroups.includes(group)));
        // let gridAvailable = !world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"]).some(sprite => sprite.groups.includes(defenderGroup));
        // console.log(world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"]).some(sprite => sprite.groups.some(group => defenderGroup.subgroups.includes(group))));
        // console.log(world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"], defenderGroup));
        // console.log(world.getSpritesAt(mouse.x, mouse.y));
        // console.log(allSprites);


        // console.log(world.getSpritesAt(mouseOnGridPos["x"], mouseOnGridPos["y"], attackerGroup));

        // HUD
        for (let card of hudCardsGroup) {
            if (points >= card.price) {
                card.opacity = 1;

                // if (card.mouse.hovering() > 0) {
                //     card.scale = 1.1;
                // } else {
                //     card.scale = 1;
                // }


                if (kb.presses(card.text)) {
                    if (card.selected) {
                        card.selected = false;
                        isSelectingOnGrid = false;
                        placingMode = "";
                        gridMode = "";
                    } else if (!isSelectingOnGrid) {
                        card.selected = true;
                        isSelectingOnGrid = true;
                        gridMode = "placing";
                        placingMode = card.type;
                    }
                }


                if (card.selected && mouseOnGridPos["onGrid"] && mouse.presses("left") && placingMode !== "" && isSelectingOnGrid && gridAvailable) {
                    spawnDefender(card.type, mouseOnGridPos["x"], mouseOnGridPos["y"]);
                    points -= card.price;
                    card.selected = false;
                    isSelectingOnGrid = false;
                    placingMode = "";
                    gridMode = "";
                }
            } else {
                card.opacity = 0.4;
            }


            if (mouse.presses("right")) {
                card.selected = false;
                isSelectingOnGrid = false;
                placingMode = "";
                gridMode = "";
            }

            // console.log(card.type + " " + card.selected);

            if (card.selected && isSelectingOnGrid) {
                // console.log("Debug");
                card.x = mouse.x;
                card.y = mouse.y;
            } else {
                card.x = card.defaultX;
                card.y = card.defaultY;
            }
        }

        // When selecting on grid
        if (mouseOnGridPos["onGrid"]) {

            // When in selecting mode
            if (isSelectingOnGrid && gridAvailable) {
                gridSelectorSprite.w = mouseOnGridPos["width"];
                gridSelectorSprite.h = mouseOnGridPos["height"];


                gridSelectorSprite.visible = true;
            } else {
                gridSelectorSprite.visible = false;
            }
            gridSelectorSprite.x = mouseOnGridPos["x"];
            gridSelectorSprite.y = mouseOnGridPos["y"];
        } else {
            gridSelectorSprite.visible = false;
        }

        // ghostSpawn interval
        if (timeHandler.getIntervalTimeLeft("ghostSpawn") === 0) {
            let num = Math.floor(random() * 4);
            switch (num) {
                case 0:
                    new normalGhostGroup.Sprite();
                    break;
                case 1:
                    new femaleGhostGroup.Sprite();
                    break;
                case 2:
                    new gangsterGhostGroup.Sprite();
                    break;
                case 3:
                    new mysteriousGhostGroup.Sprite();
                    break;
            }
            log("Ghost spawned: " + num);
        }

        // Entity logic
        for (let i = 0; i < attackerGroup.length; i++) {
            let attacker = attackerGroup[i];

            // Location checkers
            if (attacker.x <= frontLineXPos) {
                attacker.moveTowards(150, gameHeight / 2, 1);

            }

            if (attacker.x <= 150) {
                audioSplashA.play();
                gameStage++;
                audioBackgroundMain.pause();
                audioBackgroundWave.pause();
                allSprites.remove();
            }

        }

        for (let i = 0; i < defenderGroup.length; i++) {
            let defender = defenderGroup[i];

        }

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
            audioWaterDrop.play();
            points += 30;
        }

        for (let cloud of cloudGroup) {
            cloud.text = defenderTypes["cloud"]["productionTime"] - Math.floor(timeHandler.getIntervalTimeLeft("cloudProduce" + cloud.toString()) / 60);
            if (timeHandler.getIntervalTimeLeft("cloudProduce" + cloud.toString()) === 0) {
                points += defenderTypes["cloud"]["productionAmount"];
                audioWaterDrop.play();
            }
        }

        for (let waterGun of waterGunGroup) {
            if (timeHandler.getIntervalTimeLeft("waterGunShoot" + waterGun.toString()) === 0) {
                waterGun.changeAni("shooting").then(r => {
                    new projectilesGroup.Sprite(waterGun.x + 25, waterGun.y);
                    waterGun.changeAni("idle");
                });
            }
        }

        // Update info HUD
        clockInfoSprite.text = timeHandler.getTime() < 60 ? timeHandler.getTime() + "s" : Math.floor(timeHandler.getTime() / 60) + "m " + timeHandler.getTime() % 60 + "s";
        // selectingInfoSprite.text = "Selecting: " + placingMode;
        pointsInfoSprite.text = points;

        console.log("Grid available: GRIDAV, selecting: ISSEL, grid mode: GRIDMO; GRIDSELMO, placing: PLACINGMO".replace("GRIDAV", gridAvailable).replace("ISSEL", isSelectingOnGrid).replace("GRIDMO", gridMode).replace("GRIDSELMO", gridSelectorMode).replace("PLACINGMO", placingMode));

        allSprites.draw();
    } else if (gameStage > 0) {
        clear();
        if (gameStage === 1) {
            allSprites.remove();
            gameStage++;
            // gameOverButton = new overlayGroup.Sprite(gameWidth / 2, gameHeight / 3 * 2, 400, 100);
            // gameOverButton.text = "RESTART"

        }
        if (gameOverButton.mouse.presses("left")) {
            audioMouseClickA.play();
            switchScreen("game");

        }
        background(assetGameOverScreen);
    }
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

    posMatch = rowName !== "unknown" && columnName !== "unknown" && columnName !== "spawningColumn";

    return {x: xNew, y: yNew, columnName: columnName, rowName: rowName, onGrid: posMatch, width: width, height: height}
}

function attackerOverlapsDefender(attacker, defender) {
    attacker.remove();
    if (typeof defender !== vacuumGroup.Sprite) {
        defender.remove();
    }
}

function spawnDefender(type = "", x, y) {
    let spawnedDefender = null;
    switch (type) {
        case "brokenFloor":
            spawnedDefender = new brokenFloorGroup.Sprite(x, y);
            break;
        case "waterGun":
            spawnedDefender = new waterGunGroup.Sprite(x, y);
            timeHandler.setInterval("waterGunShoot" + spawnedDefender.toString(), 180);
            spawnedDefender.changeAni("idle");
            break;
        case "cloud":
            spawnedDefender = new cloudGroup.Sprite(x, y);
            timeHandler.setInterval("cloudProduce" + spawnedDefender.toString(), 60 * defenderTypes["cloud"]["productionTime"]);
            break;
        case "mirror":
            spawnedDefender = new mirrorGroup.Sprite(x, y);
            spawnedDefender.changeAni("inTact");
            break;
    }

    console.log("Spawned:");
    console.log(spawnedDefender);
    placingMode = "";
}

function damageEntity(entity, damage) {
    entity.health -= damage;
    if (entity.health <= 0) {
        entity.remove();
        attackerTypes[entity.type]["deathSound"].play();
        return false;
    } else {
        return true;
    }
}