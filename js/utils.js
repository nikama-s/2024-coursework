function collision({object1, object2}) {
    return (
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    );
}

function playerInteractsWithCharacter(characters) {
    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        if (
            collision({
                object1: player.hitbox,
                object2: character.interactionBox,
            })) {
            player.interactionAsset = character;
            break;
        }
        else {
            player.interactionAsset = false;
        }
    }
}

function createAnimation(imageSrc, frameRate, frameBuffer) {
    return {
        imageSrc,
        frameRate,
        frameBuffer,
    };
}