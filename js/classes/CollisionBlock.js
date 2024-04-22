class CollisionBlock {
    constructor({position}) {
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 32,
            height: 32,
        }
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
    }
}