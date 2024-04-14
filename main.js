const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1900;
canvas.height = 900;
const scaledCanvas = {
    width: canvas.width,
    height: canvas.height,
}

const wallCollisions2D = [];
for (let i = 0; i < wallCollisions.length; i += 55) {
    wallCollisions2D.push(wallCollisions.slice(i, i + 55));
}

const collisionBlocks = [];

wallCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 32 + 70,
                    y: y * 32,
                }
            }))
        }
    })
})
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
            image: new Image(),
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
    }
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


   /*collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })*/
    player.update();
    player.velocity.x = 0;
    player.velocity.y = 0;
    if (keys.d.pressed) {
        player.switchSprite('RunRight')
        player.velocity.x = 1;
    }
     if (keys.a.pressed) {player.velocity.x = -1;
    player.switchSprite('RunLeft')}
     if (keys.w.pressed) player.velocity.y = -1;
     if (keys.s.pressed) player.velocity.y = 1;
     if ( player.velocity.y === 0 && player.velocity.x === 0){
        player.switchSprite('Idle')
    }
    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({camera, canvas});
    } else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({camera, canvas});
    }

    c.restore();
}

animate();

window.addEventListener('keydown', (event) => {
    //console.log(event);
    switch (event.keyCode) {
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
    //console.log(event);
    switch (event.keyCode) {
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