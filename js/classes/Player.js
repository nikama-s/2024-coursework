class Player {
    constructor({ position, collisionBlocks }) {
        this.position = position ;

        this.velocity = {
            x: 0,
            y: 0,
        }
        this.collisionBlocks = collisionBlocks;
        this.width = 60;
        this.height = 60;

    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.checkForHorizontalCollisions();
        this.position.y += this.velocity.y;
        this.checkForVerticalCollisions();
    }
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision ({
                    object1:this,
                    object2: collisionBlock,
                })
            ){
                if (this.velocity.x > 0 ) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.1;
                    break;
                }
                else if (this.velocity.x < 0 ) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.1;
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
                    object1:this,
                    object2: collisionBlock,
                })
            ){
                if (this.velocity.y > 0 ) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.1;
                    break;
                }
                else if (this.velocity.y < 0 ) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.1;
                    break;
            }
        }
    }
}}