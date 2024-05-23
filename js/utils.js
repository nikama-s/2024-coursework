function collision({object1, object2}) {
    const object1Bottom = object1.position.y + object1.height;
    const object1Right = object1.position.x + object1.width;
    const object2Bottom = object2.position.y + object2.height;
    const object2Right = object2.position.x + object2.width;

    const isVerticalOverlap = object1Bottom >= object2.position.y && object1.position.y <= object2Bottom;
    const isHorizontalOverlap = object1.position.x <= object2Right && object1Right >= object2.position.x;

    return isVerticalOverlap && isHorizontalOverlap;
}

function playerInteractsWithCharacter(characters) {
    player.interactionAsset = false;
    for (const character of characters) {
        if (collision({ object1: player.hitbox, object2: character.interactionBox })) {
            player.interactionAsset = character;
            break;
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

function getKey(keyCode){
    switch (keyCode) {
        case 69:
            return 'e';
        case 68:
            return 'd';
        case 65:
            return 'a';
        case 87:
            return 'w';
        case 83:
            return 's';
    }
}