const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let playerState = 'Right';

const wallCollisions2D = [];
const rowSize = 55;

for (let i = 0; i < wallCollisions.length; i += rowSize) {
    wallCollisions2D.push(wallCollisions.slice(i, i + rowSize));
}
const collisionBlocks = [];
const characters = [];

const background = new Sprite({
        position: {
            x: 70,
            y: 0,
        },
        imageSrc: './img/room35x35.png',
        scale: 1 / 2,
    },
)

const blockSize = 32;
const createCollisionBlock = (x, y) => new CollisionBlock({
    position: {
        x: x * blockSize + background.position.x,
        y: y * blockSize,
    }
});

const createHemlin = (x, y) => new Character({
    position: {
        x: x * 32,
        y: y * 27,
    },
    imageSrc: './img/hemlin.png',
    frameRate: 5,
    frameBuffer: 100,
    scale: 2 / 3,
    width: 100,
    height: 100,
    dialogue: ["Hemlin — Hi there! I'm a mystical plant, that lives in this dungeon, my name is Hemlin", "Hemlin? What a strange name. How did you end up here", "Hemlin — Oh, it's a long story. In short, was captured and tortured for 200 years", "Hemlin — What's more important, i haven't drunk any water in 81 years, 9 month, 14 days, 5 hours, 42 minutes and 5 seconds... Could you bring me some?"]
});

let y = 0;
for (const row of wallCollisions2D) {
    let x = 0;
    for (const symbol of row) {
        if (symbol === 1) {
            collisionBlocks.push(createCollisionBlock(x, y));
        } else if (symbol === 2) {
            characters.push(createHemlin(x, y));
        }
        x++;
    }
    y++;
}

const player = new Player({
    position: {
        x: 170,
        y: 150,
    },
    collisionBlocks,
    imageSrc: './img/miner/idle.png',
    frameRate: 5,
    frameBuffer: 20,
    animations: {
        IdleRight: createAnimation('./img/miner/idle.png', 5, 20),
        RunRight: createAnimation('./img/miner/RunR.png', 8, 20),
        RunLeft: createAnimation('./img/miner/RunL.png', 8, 20),
        IdleLeft: createAnimation('./img/miner/idleL.png', 5, 20),
    },
    characters,
});

function createKey() {
    return {
        pressed: false,
    };
}

const keys = {
    d: createKey(),
    a: createKey(),
    w: createKey(),
    s: createKey(),
    e: createKey(),
};

const camera = {
    position: {
        x: 0,
        y: 0,
    },
}

function movePlayer() {
    if (keys.d.pressed) {
        playerState = 'Right';
        player.velocity.x = 1;
    } else if (keys.a.pressed) {
        player.velocity.x = -1;
        playerState = 'Left';
    }
    if (keys.w.pressed) {
        player.velocity.y = -1;
    } else if (keys.s.pressed) {
        player.velocity.y = 1;
    }
    player.switchSprite(`Run${playerState}`);
}

function switchPlayerToIdle() {
    if (playerState === 'Right') {
        player.switchSprite('IdleRight');
    } else {
        player.switchSprite('IdleLeft');
    }
}

function handleCamera() {
    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({camera, canvas});
    } else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({camera, canvas});
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.translate(camera.position.x, camera.position.y);
    background.update();

    for (const character of characters) {
        character.update();
    }
    player.update();

    player.velocity.x = 0;
    player.velocity.y = 0;
    if (!player.isInteracting) {
        movePlayer();
        if (player.velocity.y === 0 && player.velocity.x === 0) switchPlayerToIdle();
        handleCamera();
    }
    playerInteractsWithCharacter(characters);

    c.restore();
}

animate();

function startConversation() {
    document.querySelector('#characterDialogueBox').innerHTML = player.interactionAsset.dialogue[0];
    document.querySelector('#characterDialogueBox').style.display = 'flex';
    player.isInteracting = true;
}

function continueConversation() {
    player.interactionAsset.dialogueIndex++;
    keys.e.pressed = true;
    const {dialogueIndex, dialogue} = player.interactionAsset;
    if (dialogueIndex <= dialogue.length - 1) {
        document.querySelector('#characterDialogueBox').innerHTML = player.interactionAsset.dialogue[dialogueIndex];
    } else {
        player.isInteracting = false;
        player.interactionAsset.dialogueIndex = 0;
        document.querySelector('#characterDialogueBox').style.display = 'none';
    }
}

window.addEventListener('keydown', (event) => {
    const key = getKey(event.keyCode);

    if (player.isInteracting && key === 'e') {
        continueConversation();
        return;
    }
    switch (key) {
        case 'e':
            keys.e.pressed = true
            if (!player.interactionAsset) return;
            switchPlayerToIdle();
            startConversation();
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            keys.w.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    const key = getKey(event.keyCode);
    switch (key) {
        case 'e':
            keys.e.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
    }
})