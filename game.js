let startTime, runtime, timerSprite;

let defenderGroup, attackerGroup;
let allDefenders, allAttackers = [];


function setupGame() {
    // Timer
    timerSprite = new Sprite();
    timerSprite.x = timerSprite.w / 2 + 20;
    timerSprite.y = timerSprite.h / 2 + 20;
    timerSprite.textSize = 24;

    defenderGroup = new Group();
    attackerGroup = new Group();
    attackerGroup.h = attackerGroup.w = 50;
    attackerGroup.x = gameWidth - 300;
    attackerGroup.y = () => random(120, gameHeight - 120);
    // attackerGroup.vel.x = () => random(-3, -0.5);
    attackerGroup.vel.x = -4;

    // Test spawning
    let randomSpawn = setInterval(() => {
        new attackerGroup.Sprite();
    }, 7 * 1000);

    startTime = new Date();
}

function drawGame() {
    runtime = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);

    clear();
    background(assetGameBackGround);

    // Entity logic
    for (let i = 0; i < attackerGroup.length; i++) {
        // Location checkers
        let attacker = attackerGroup[i];
        if (attacker.x <= frontLineXPos) {
            // Point of no return
        }

        // Overlap checkers



    }

    for (let i = 0; i < defenderGroup.length; i++) {
    }

    timerSprite.text = runtime;
}
