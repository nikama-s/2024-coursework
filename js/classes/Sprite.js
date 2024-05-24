class Sprite {
    constructor({position, imageSrc, frameRate = 1, frameBuffer = 0, scale = 1}) {
        this.position = position;
        this.scale = scale;
        this.frameRate = frameRate;
        this.frameBuffer = frameBuffer;

        this.currentFrame = 0;
        this.elapsedFrames = 0;

        this.loaded = false;
        this.image = new Image();
        this.image.onload = this.onImageLoad.bind(this);
        this.image.src = imageSrc;
    }
    onImageLoad() {
        this.width = (this.image.width / this.frameRate) * this.scale;
        this.height = this.image.height * this.scale;
        this.loaded = true;
    }

    draw() {
        if (!this.loaded) return;
        this.updateFrames();
        if (this.currentFrame >= this.frameRate) this.currentFrame = 0;
        const frameWidth = this.image.width / this.frameRate;

        const cropBox = {
            position: {
                x: this.currentFrame * frameWidth,
                y: 0,
            },
            width: frameWidth,
            height: this.image.height,
        }
        c.drawImage(this.image, cropBox.position.x, cropBox.position.y, cropBox.width, cropBox.height, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
    updateFrames(){
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0){
            if (this.currentFrame < this.frameRate-1) {
                this.currentFrame++;
            }
            else this.currentFrame = 0;
        }
    }
}