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
    attackerGroup.vel.x = () => random(-3, -0.5);

    setInterval(() => {
        allAttackers.push(new attackerGroup.Sprite());
    }, 3 * 1000);


    startTime = new Date();
}

function drawGame() {
    runtime = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);

    clear();
    background(assetGameBackGround);

    for (let i = 0; i < allAttackers.length; i++) {
        if (allAttackers[i].x <= 250) {
            allAttackers[i].remove();
        }
    }

    timerSprite.text = runtime;
}
