import Phaser from 'phaser';

export function defineAnimations(scene: Phaser.Scene, spriteKey: string) {
    scene.anims.create({
        key: 'walk-left',
        frames: scene.anims.generateFrameNumbers(spriteKey, { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-down',
        frames: scene.anims.generateFrameNumbers(spriteKey, { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-up',
        frames: scene.anims.generateFrameNumbers(spriteKey, { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-right',
        frames: scene.anims.generateFrameNumbers(spriteKey, { start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1,
    });
}