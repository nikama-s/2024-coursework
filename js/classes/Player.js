class Player extends Sprite {
    constructor({position, collisionBlocks, imageSrc, frameRate, frameBuffer, scale}) {
        super({imageSrc, frameRate, frameBuffer, scale});
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.collisionBlocks = collisionBlocks;
        this.hitbox = {
            position: {
                 x: this.position.x,
                 y: this.position.y,
            },
            width: 10,
            height: 10

        }
    }
    update() {
        this.updateFrames();
        this.updateHitbox();

        c.fillStyle = 'rgba(0, 255, 0, 0.2)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        c.fillStyle = 'rgba(255, 0, 0, 0.2)';
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.position.y += this.velocity.y;
        this.updateHitbox();
        this.checkForVerticalCollisions();
    }
updateHitbox(){
    this.hitbox = {
        position: {
            x: this.position.x + 50,
            y: this.position.y + 45,
        },
        width: 80,
        height: 100

    }
}
    up
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision ({
                    object1:this.hitbox,
                    object2: collisionBlock,
                })
            ){
                if (this.velocity.x > 0 ) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x -  this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - 0.1 - offset;
                    break;
                }
                else if (this.velocity.x < 0 ) {
                    const offset = this.hitbox.position.x - this.position.x ;
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.1 - offset;
                    break;
                }
            }
        }
    }
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision ({
                    object1:this.hitbox,
                    object2: collisionBlock,
                })
            ){

                if (this.velocity.y > 0 ) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.1;
                    break;
                }
                else if (this.velocity.y < 0 ) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y ;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.1 - offset;
                    break;
            }
        }
    }
}}