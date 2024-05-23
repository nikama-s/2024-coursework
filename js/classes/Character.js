class Character extends Sprite {
    constructor({position, imageSrc, frameRate, frameBuffer, scale, width, height, dialogue = ['']}) {
        super({imageSrc, frameRate, frameBuffer, scale});
        this.dialogue = dialogue;
        this.position = position;
        this.width = width;
        this.height = height;
        this.hitbox = createBox(this, 120);
        this.interactionBox = createBox(this, 120, 2, 3);
        this.dialogueIndex = 0;

    }
    update() {
        this.draw();
    }

}