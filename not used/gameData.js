// Save game data to local storage
function saveGame(data) {
    localStorage.setItem('gameData', JSON.stringify(data));
}

// Retrieve game data from local storage
function retrieveGame() {
    const data = localStorage.getItem('gameData');
    return JSON.parse(data);
}

function newGame() {
    const gameData = {
        name: "Player",
        firstPlayed: new Date(),
        lastPlayed: new Date(),
        score: 0,
        points: 0,
        settings: {
            sound: 100,
            music: 100,
            notifications: true
        },
        inventory: [],
        achievements: {
            unlocked: [],
            locked: []
        },
        progress: {},
        characters: [],
        location: {
            x: 0,
            y: 0
        }
    };

    saveGame(gameData);
}

const gameData = {
    name: "John",
    firstPlayed: new Date(),
    lastPlayed: new Date(),
    score: 1000,
    points: 1000,
    settings: {
        sound: 100,
        music: 100,
        notifications: true
    },
    inventory: ["sword", "shield", "potion"],
    achievements: {
        unlocked: ["First Blood", "Master of the Sword"],
        locked: ["Pacifist", "Speed Runner"]
    },
    progress: {
        level1: 100,
        level2: 50,
        level3: 0
    },
    characters: [
        {
            name: "Warrior",
            level: 10,
            items: ["sword", "shield"]
        },
        {
            name: "Mage",
            level: 8,
            items: ["staff", "robe"]
        }
    ],
    location: {
        x: 100,
        y: 200
    }
};

saveGame(gameData);
