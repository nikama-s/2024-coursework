class Character extends Sprite {
    constructor({position, imageSrc, frameRate, frameBuffer, scale, dialogue = ['']}) {
        super({imageSrc, frameRate, frameBuffer, scale});
        this.dialogue = dialogue;
        this.position = position;
        this.hitbox = {
            position: {
                x: this.position.x + 110,
                y: this.position.y + 150,
            },
            width: 100,
            height: 100,
        }
        this.interactionBox = {
            position: {
                x: this.position.x + 110,
                y: this.position.y + 150,
            },
            width: 200,
            height: 300,
        }
        this.dialogueIndex = 0;

    }
    update() {
        this.updateFrames();
        this.draw();
    }

}