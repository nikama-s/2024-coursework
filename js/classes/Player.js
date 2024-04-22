class Player extends Sprite {
    constructor({position, collisionBlocks, imageSrc, frameRate, frameBuffer, scale, animations, characters}) {
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
        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 400,
        }
        this.animations = animations;
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
        }
        this.characters = characters;
    }

    shouldPanCameraDown({canvas, camera}) {
        if (this.camerabox.position.y <= 0) return;
        if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }

    shouldPanCameraUp({canvas, camera}) {
        if (this.camerabox.position.y + this.camerabox.height >= canvas.height * 2 - 65) return;
        if (this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + canvas.height) {
            camera.position.y -= this.velocity.y;
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key] || !this.loaded) return
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;

    }

    update() {
        //this.updateFrames();
        this.updateHitbox();
        this.updateCamerabox();
        /*
        s        c.fillStyle = 'rgba(0, 255, 0, 0.2)';
                c.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height);

                c.fillStyle = 'rgba(0, 255, 0, 0.2)';
                c.fillRect(this.position.x, this.position.y, this.width, this.height);

                c.fillStyle = 'rgba(255, 0, 0, 0.2)';
                c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        */
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions(this.collisionBlocks);
        this.checkForHorizontalCollisions(this.characters)
        this.position.y += this.velocity.y;
        this.updateHitbox();
        this.checkForVerticalCollisions(this.collisionBlocks);
        this.checkForVerticalCollisions(this.characters);
    }

    updateCamerabox() {
        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y - 100,
            },
            width: 200,
            height: 400,
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 50,
                y: this.position.y + 45,
            },
            width: 80,
            height: 100

        }
    }

    checkForHorizontalCollisions(arr) {
        for (let i = 0; i < arr.length; i++) {
            const collisionBlock = arr[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock.hitbox,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.hitbox.position.x - 0.1 - offset;
                    break;
                } else if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.hitbox.position.x + collisionBlock.hitbox.width + 0.1 - offset;
                    break;
                }
            }
        }
    }
    checkForVerticalCollisions(arr) {
        for (let i = 0; i < arr.length; i++) {
            const collisionBlock = arr[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock.hitbox,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.hitbox.position.y - offset - 0.1;
                    break;
                } else if (this.velocity.y < 0) {
                    const offset = this.hitbox.position.y - this.position.y;
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.hitbox.position.y + collisionBlock.hitbox.height + 0.1 - offset;
                    break;
                }
            }
        }
    }
}
