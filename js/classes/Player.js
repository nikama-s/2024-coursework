class Player extends Sprite {
    constructor({position, collisionBlocks, imageSrc, frameRate, frameBuffer, scale, animations, characters}) {
        super({imageSrc, frameRate, frameBuffer, scale});
        this.position = position;
        this.width = 100;
        this.height = 100;
        this.velocity = {x: 0, y: 0};
        this.collisionBlocks = collisionBlocks;
        this.hitbox = createBox(this, 0, 0.1, 0.1);
        this.camerabox = createBox(this,-100, 2, 2);
        this.animations = this.loadAnimations(animations);
        this.characters = characters;
    }

    loadAnimations(animations) {
        const loadedAnimations = {};
        for (const key in animations) {
            const animation = animations[key];
            const image = new Image();
            image.src = animation.imageSrc;
            loadedAnimations[key] = {...animation, image};
        }
        return loadedAnimations;
    }

    shouldPanCameraDown({camera}) {
        if (this.camerabox.position.y > 0 && this.camerabox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }

    shouldPanCameraUp({canvas, camera}) {
        const { position: { y: cameraY } } = camera;
        const { position: { y: cameraBoxY }, height: cameraBoxHeight } = this.camerabox;

        const maxY = canvas.height * 2 - 65;
        const cameraTopY = cameraBoxY + cameraBoxHeight;

        if (cameraTopY < maxY && cameraTopY >= Math.abs(cameraY) + canvas.height) {
            camera.position.y -= this.velocity.y;
        }

    }

    switchSprite(key) {
        if (this.image !== this.animations[key] && this.loaded) {
            const { image, frameBuffer, frameRate } = this.animations[key];
            this.image = image;
            this.frameBuffer = frameBuffer;
            this.frameRate = frameRate;
        }
    }

    update() {
        this.updateHitBox();
        this.updateCameraBox();
        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollisions(this.collisionBlocks);
        this.checkForHorizontalCollisions(this.characters)

        this.position.y += this.velocity.y;
        this.updateHitBox();
        this.checkForVerticalCollisions(this.collisionBlocks);
        this.checkForVerticalCollisions(this.characters);
    }
    updateCameraBox() {
        this.camerabox = createBox(this,-100, 2, 2);
    }

    updateHitBox() {
        this.hitbox = createBox(this, 50, 0.4, 0.5);
    }

    checkForHorizontalCollisions(arr) {
        for (const collisionBlock of arr) {
            if (collision({ object1: this.hitbox, object2: collisionBlock.hitbox })) {
                if (this.velocity.x > 0) {
                    this.handleRightCollision(collisionBlock);
                } else if (this.velocity.x < 0) {
                    this.handleLeftCollision(collisionBlock);
                }
            }
        }
    }
    handleRightCollision(collisionBlock) {
        this.velocity.x = 0;
        const offset = this.hitbox.position.x + this.hitbox.width - this.position.x;
        this.position.x = collisionBlock.hitbox.position.x - offset - 0.1;
    }
    handleLeftCollision(collisionBlock) {
        this.velocity.x = 0;
        const offset = this.hitbox.position.x - this.position.x;
        this.position.x = collisionBlock.hitbox.position.x + collisionBlock.hitbox.width + 0.1 - offset;
    }
    checkForVerticalCollisions(arr) {
        for (const collisionBlock of arr) {
            if (collision({ object1: this.hitbox, object2: collisionBlock.hitbox })) {
                if (this.velocity.y > 0) {
                    this.handleBottomCollision(collisionBlock);
                } else if (this.velocity.y < 0) {
                    this.handleTopCollision(collisionBlock);
                }
            }
        }
    }
    handleBottomCollision(collisionBlock) {
        this.velocity.y = 0;
        const offset = this.hitbox.position.y + this.hitbox.height - this.position.y;
        this.position.y = collisionBlock.hitbox.position.y - offset - 0.1;
    }

    handleTopCollision(collisionBlock) {
        this.velocity.y = 0;
        const offset = this.hitbox.position.y - this.position.y;
        this.position.y = collisionBlock.hitbox.position.y + collisionBlock.hitbox.height + 0.1 - offset;
    }
}
