import Phaser from "phaser";
import { defineAnimations } from "../../utils/animations";

export default class MainGameScene extends Phaser.Scene {

    private camera!: Phaser.Cameras.Scene2D.Camera;

    constructor() {
        super({
            key: 'MainGameScene',
        });
    }

    create() {
        this.scene.launch('GameMenu');
        this.scene.launch('Miner');
        this.scene.launch('Crafter');
        console.log('main game running');

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('RPG Urban Pack', 'tileset')!; // ! is used to tell TypeScript that the value will not be null
        map.createLayer('Tile Layer 1', tileset, 0, 0);
        map.createLayer('Tile Layer 2', tileset, 0, 0);
        map.createLayer('Tile Layer 3', tileset, 0, 0);
        map.createLayer('Tile Layer 4', tileset, 0, 0);
        map.createLayer('Tile Layer 5', tileset, 0, 0);
        map.createLayer('Tile Layer 6', tileset, 0, 0);
        map.createLayer('Tile Layer 7', tileset, 0, 0);
        map.createLayer('Tile Layer 8', tileset, 0, 0);
        map.createLayer('Tile Layer 9', tileset, 0, 0);
        map.createLayer('cars_X', tileset, 0, 0);
        map.createLayer('trees', tileset, 0, 0);

        const humanLayer = map.getObjectLayer('human_x');

        defineAnimations(this, 'human1');

        if (humanLayer && humanLayer.objects) {
            humanLayer.objects.forEach((humanObj) => {
                const { x = 0, y = 0 } = humanObj;

                // Create human sprite
                const humanSprite = this.add.sprite(x, y, 'human1');

                // Align to bottom-center
                humanSprite.setOrigin(0.5, 1);

                humanSprite.setInteractive();

                // Add an onClick event listener
                humanSprite.on('pointerdown', () => {
                    this.tweens.add({
                        targets: humanSprite,
                        y: y - 500,
                        duration: 100,
                        onComplete: () => {
                            // Disappear after flying up
                            humanSprite.setVisible(false);

                            // After a delay
                            this.time.delayedCall(2000, () => {
                                humanSprite.setPosition(x, y);
                                humanSprite.setVisible(true);
                            });
                        },
                    });
                });

                // Move back and forth with animation
                const randomDelay = Phaser.Math.Between(0, 2000);
                const tween = this.tweens.add({
                    targets: humanSprite,
                    x: x + Phaser.Math.Between(100, 120),
                    duration: 3000,
                    repeat: -1,
                    yoyo: true,
                    delay: randomDelay,
                    onStart: () => humanSprite.play('walk-right'),
                    onYoyo: () => {
                        // Pause for a random time
                        const randomPause = Phaser.Math.Between(500, 1500);
                        tween.pause();
                        humanSprite.anims.pause();
                        // TODO: DONT HARDCODE FRAME
                        humanSprite.setFrame(12);
                        this.time.delayedCall(randomPause, () => {
                            humanSprite.play('walk-left');
                            tween.resume();
                        });
                    },
                    onRepeat: () => {
                        // Pause for a random time
                        const randomPause = Phaser.Math.Between(500, 1500);
                        tween.pause();
                        humanSprite.anims.pause();
                        // TODO: DONT HARDCODE FRAME
                        humanSprite.setFrame(0);
                        this.time.delayedCall(randomPause, () => {
                            humanSprite.play('walk-right');
                            tween.resume();
                        });
                    },
                });
            });
        }


        // Set camera bounds and zoom
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.camera.setZoom(2.5);
        this.camera.centerOn(0, 0);

        this.#cursorCheck();

    }

    #cursorCheck() {
        const edgeThreshold = 50;
        const panSpeed = 3;

        // Checks cursor position
        this.time.addEvent({
            delay: 16,
            loop: true,
            callback: () => {

                // Cursor position
                const pointer = this.input.activePointer;

                // Check cursor position and move camera
                if (pointer.x < edgeThreshold) {
                    // Move left
                    this.camera.scrollX -= panSpeed;
                } else if (pointer.x > this.scale.width - edgeThreshold) {
                    // Move right
                    this.camera.scrollX += panSpeed;
                }

                if (pointer.y < edgeThreshold) {
                    // Move up
                    this.camera.scrollY -= panSpeed;
                } else if (pointer.y > this.scale.height - edgeThreshold) {
                    // Move down
                    this.camera.scrollY += panSpeed;
                }
            }
        });
    }

}
