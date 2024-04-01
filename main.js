const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1900;
canvas.height = 900;
const scaledCanvas  = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

class Sprite {
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw()
    }
}

class Player {
    constructor() {
        this.position = {
            x: 170,
            y: 200,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 40, 40);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const player = new Player();

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
            x: 140,
            y: 0,
        },
        imageSrc: './img/room35x35.png'
    }
)

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(1/2,1/2);
   // c.translate(0, -background.image.height + scaledCanvas.height);
    background.update();
    c.restore();
    player.update();
    player.velocity.x = 0;
    player.velocity.y = 0;
    if (keys.d.pressed) player.velocity.x = 1;
    if (keys.a.pressed) player.velocity.x = -1;
    if (keys.w.pressed) player.velocity.y = -1;
    if (keys.s.pressed) player.velocity.y = 1;
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event);
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
    console.log(event);
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