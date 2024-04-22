const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1900;
canvas.height = 930;
let playerState = 'right';


const wallCollisions2D = [];
for (let i = 0; i < wallCollisions.length; i += 55) {
    wallCollisions2D.push(wallCollisions.slice(i, i + 55));
}
const collisionBlocks = [];
const characters = [];
const hemlinImg = new Image()
hemlinImg.src = './img/hemlin.png'

wallCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 32 + 70,
                    y: y * 32,
                }
            }))
        } else if (symbol === 2) {
            characters.push(
                new Character({
                    position: {
                        x: x * 32,
                        y: y * 27,
                    },
                    imageSrc: './img/hemlin.png',
                    frameRate: 5,
                    frameBuffer: 100,
                    scale: 2 / 3,
                    dialogue: ["Hemlin — Hi there! I'm a mystical plant, that lives in this dungeon, my name is Hemlin", "Hemlin? What a strange name. How did you end up here", "Hemlin — Oh, it's a long story. In short, was captured and tortured for 200 years", "Hemlin — What's more important, i haven't drunk any water in 81 years, 9 month, 14 days, 5 hours, 42 minutes and 5 seconds... Could you bring me some?"]
                })
            )
        }
    })
})
console.log(characters)
console.log(collisionBlocks);

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
            Idle: {
                imageSrc: './img/miner/idle.png',
                frameRate: 5,
                frameBuffer: 20,
            },
            RunRight: {
                imageSrc: './img/miner/RunR.png',
                frameRate: 8,
                frameBuffer: 20,
            },
            RunLeft: {
                imageSrc: './img/miner/RunL.png',
                frameRate: 8,
                frameBuffer: 20,
            },
            IdleL: {
                imageSrc: './img/miner/idleL.png',
                frameRate: 5,
                frameBuffer: 20,
            }
        },
        characters,
    })
;
const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    e: {
        pressed: false,
    },
}
const background = new Sprite({
        position: {
            x: 70,
            y: 0,
        },
        imageSrc: './img/room35x35.png',
        scale: 1 / 2,
    },
)
const camera = {
    position: {
        x: 0,
        y: 0,
    },
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(1, 1);
    c.translate(camera.position.x, camera.position.y);
    background.update();

    characters.forEach(character => {
        character.update();
    })

    player.update();

    player.velocity.x = 0;
    player.velocity.y = 0;
    if (!keys.e.pressed) {
        if (keys.d.pressed) {
            player.switchSprite('RunRight')
            playerState = 'right';
            player.velocity.x = 1;
        }
        if (keys.a.pressed) {
            player.velocity.x = -1;
            player.switchSprite('RunLeft')
            playerState = 'left';
        }
        if (keys.w.pressed) {
            if (playerState === 'right') {
                player.switchSprite('RunRight')
            } else {
                player.switchSprite('RunLeft')
            }
            player.velocity.y = -1;
        }
        if (keys.s.pressed) {
            if (playerState === 'right') {
                player.switchSprite('RunRight')
            } else {
                player.switchSprite('RunLeft')
            }
            player.velocity.y = 1;
        }
        if (player.velocity.y === 0 && player.velocity.x === 0) {
            if (playerState === 'right') {
                player.switchSprite('Idle');
            } else {
                player.switchSprite('IdleL');
            }
        }
        if (player.velocity.y < 0) {
            player.shouldPanCameraDown({camera, canvas});
        } else if (player.velocity.y > 0) {
            player.shouldPanCameraUp({camera, canvas});
        }
    }
    playerInteractsWithCharacter(characters);

    c.restore();
}

animate();

window.addEventListener('keydown', (event) => {
    if (player.isInteracting) {
        switch (event.keyCode) {
            case 69:
                player.interactionAsset.dialogueIndex++

                const { dialogueIndex, dialogue } = player.interactionAsset
                if (dialogueIndex <= dialogue.length - 1) {
                    document.querySelector('#characterDialogueBox').innerHTML =
                        player.interactionAsset.dialogue[dialogueIndex]
                    return
                }
                player.isInteracting = false
                player.interactionAsset.dialogueIndex = 0
                document.querySelector('#characterDialogueBox').style.display = 'none'

                break
        }
        return
    }
    switch (event.keyCode) {
        case 69:
            keys.e.pressed = true
            if (!player.interactionAsset) return;
            const firstMessage = player.interactionAsset.dialogue[0];
            document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
            document.querySelector('#characterDialogueBox').style.display = 'flex';
            player.isInteracting = true;
            break;
        case 68:
            keys.d.pressed = true;
            break;
        case 65:
            keys.a.pressed = true;
            break;
        case 87:
            keys.w.pressed = true;
            break;
        case 83:
            keys.s.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 69:
            keys.e.pressed = false;
            break;
        case 68:
            keys.d.pressed = false;
            break;
        case 65:
            keys.a.pressed = false;
            break;
        case 87:
            keys.w.pressed = false;
            break;
        case 83:
            keys.s.pressed = false;
            break;
    }
})