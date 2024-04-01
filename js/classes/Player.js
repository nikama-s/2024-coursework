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