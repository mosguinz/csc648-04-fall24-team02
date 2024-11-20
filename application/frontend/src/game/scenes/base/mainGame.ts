import Phaser from "phaser";
import { defineAnimations } from "../../utils/animations";
import { GameData } from "../../stores/gameData";
import Miner from "../../hooks/miner";
import { controlCamera } from "../../utils/controlCamera";
import { position } from "../../stores/constants";

export let mainGameCursor: position = { x: 0, y: 0 };
export default class MainGameScene extends Phaser.Scene {

    private humanSprites: { [id: number]: Phaser.GameObjects.Sprite } = {};
    private treeSprites: { [id: number]: Phaser.GameObjects.Sprite } = {};
    private carSprites: { [id: number]: Phaser.GameObjects.Sprite } = {};

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
        this.scene.launch('Cursor');
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('RPG Urban Pack', 'tileset')!; // ! is used to tell TypeScript that the value will not be null
        map.createLayer('Tile Layer 1', tileset, 0, 0);
        map.createLayer('Tile Layer 2', tileset, 0, 0);

        // Miner import for auto harvesting stuff
        const minerScene = this.scene.get('Miner') as Miner;

        const humanLayerX = map.getObjectLayer('human_x');

        defineAnimations(this, 'human1');

        if (humanLayerX && humanLayerX.objects) {
            for (let i = 0; i < humanLayerX.objects.length; i++) {
                const { x = 0, y = 0 } = humanLayerX.objects[i];

                // Create human sprite
                const humanSprite = this.add.sprite(x, y, 'human1');

                // Align to bottom-center
                humanSprite.setOrigin(1, 1);

                humanSprite.setInteractive();

                humanSprite.on('pointerover', () => {
                    humanSprite.setTint(0x00ff00);
                });

                humanSprite.on('pointerout', () => {
                    humanSprite.clearTint();
                });

                // Add an onClick event listener
                humanSprite.on('pointerdown', () => {
                    if (humanSprite.visible === true) {
                        GameData.addResource(1, 1);
                        this.#displayFloatingText(this, humanSprite, 1, '1');
                        this.tweens.add({
                            targets: humanSprite,
                            y: y - 500,
                            duration: 100,
                            onComplete: () => {
                                // Disappear after flying up
                                humanSprite.setVisible(false);
                                tween.pause();
                                // After a delay
                                this.time.delayedCall(2000, () => {
                                    tween.resume();
                                    humanSprite.setPosition(x, y);
                                    humanSprite.setVisible(true);
                                });
                            },
                        });
                    }
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
                        const randomPause = Phaser.Math.Between(500, 1500);
                        tween.pause();
                        humanSprite.anims.pause();
                        humanSprite.setFrame(12); // Adjust frame as needed
                        this.time.delayedCall(randomPause, () => {
                            humanSprite.play('walk-left');
                            tween.resume();
                        });
                    },
                    onRepeat: () => {
                        const randomPause = Phaser.Math.Between(500, 1500);
                        tween.pause();
                        humanSprite.anims.pause();
                        humanSprite.setFrame(0); // Adjust frame as needed
                        this.time.delayedCall(randomPause, () => {
                            humanSprite.play('walk-right');
                            tween.resume();
                        });
                    },
                });

                // Store the human sprite into global array
                const currentIndex = Object.keys(this.humanSprites).length;
                this.humanSprites[currentIndex] = humanSprite;
            }
        }

        const humanLayerY = map.getObjectLayer('human_y');

        if (humanLayerY && humanLayerY.objects) {
            for (let i = 0; i < humanLayerY.objects.length; i++) {
                const { x = 0, y = 0 } = humanLayerY.objects[i];

                // Create human sprite
                const humanSprite = this.add.sprite(x, y, 'human1');

                // Align to bottom-center
                humanSprite.setOrigin(0, 0);

                humanSprite.setInteractive();

                humanSprite.on('pointerover', () => {
                    humanSprite.setTint(0x00ff00);
                });

                humanSprite.on('pointerout', () => {
                    humanSprite.clearTint();
                });

                // Add an onClick event listener
                humanSprite.on('pointerdown', () => {
                    if (humanSprite.visible === true) {
                        GameData.addResource(1, 1);
                        this.#displayFloatingText(this, humanSprite, 1, '1');
                        this.tweens.add({
                            targets: humanSprite,
                            y: y - 500,
                            duration: 100,
                            onComplete: () => {
                                // Disappear after flying up
                                humanSprite.setVisible(false);
                                tween.pause();
                                // After a delay
                                this.time.delayedCall(2000, () => {
                                    tween.resume();
                                    humanSprite.setPosition(x, y);
                                    humanSprite.setVisible(true);
                                });
                            },
                        });
                    }
                });

                // Move back and forth with animation
                const randomDelay = Phaser.Math.Between(0, 2000);
                const tween = this.tweens.add({
                    targets: humanSprite,
                    y: y + Phaser.Math.Between(50, 70),
                    duration: 3000,
                    repeat: -1,
                    yoyo: true,
                    delay: randomDelay,
                    onStart: () => humanSprite.play('walk-down'),
                    onYoyo: () => {
                        const randomPause = Phaser.Math.Between(500, 1500);
                        tween.pause();
                        humanSprite.anims.pause();
                        humanSprite.setFrame(4); // Adjust frame as needed
                        this.time.delayedCall(randomPause, () => {
                            humanSprite.play('walk-up');
                            tween.resume();
                        });
                    },
                    onRepeat: () => {
                        const randomPause = Phaser.Math.Between(500, 1500);
                        tween.pause();
                        humanSprite.anims.pause();
                        humanSprite.setFrame(8); // Adjust frame as needed
                        this.time.delayedCall(randomPause, () => {
                            humanSprite.play('walk-down');
                            tween.resume();
                        });
                    },
                });

                // Store the human sprite into global array
                const currentIndex = Object.keys(this.humanSprites).length;
                this.humanSprites[currentIndex] = humanSprite;
            }
        }

        minerScene.events.on('human-clicked', (humanId: number) => {
            const newID = humanId - 1; // Adjust ID because Miners are 1-indexed
            const humanSprite = this.humanSprites[newID];
            if (humanSprite) {
                // Click that human
                humanSprite.emit('pointerdown');
            }
        });

        // Car layer
        const carLayer = map.getObjectLayer('cars_x');
        let rightCount = 0;
        let leftCount = 0;

        if (carLayer && carLayer.objects) {
            for (let i = 0; i < carLayer.objects.length; i++) {
                const { x = 0, y = 0, properties = [] } = carLayer.objects[i];

                const isRight = properties.some((prop: any) => prop.name === 'right' && prop.value === true);

                // Create car sprite
                const carSprite = this.add.sprite(x, y, 'pink_car');

                // Align to bottom-center
                carSprite.setOrigin(0, 1);

                carSprite.setInteractive();

                carSprite.on('pointerover', () => {
                    carSprite.setTint(0x00FF00);
                });

                carSprite.on('pointerout', () => {
                    carSprite.clearTint();
                });

                // Add an onClick event listener
                carSprite.on('pointerdown', () => {
                    if (carSprite.visible === true) {
                        GameData.addResource(3, 1);
                        this.#displayFloatingText(this, carSprite, 1, '3');
                        this.tweens.add({
                            targets: carSprite,
                            y: -500,
                            duration: 100,
                            onComplete: () => {
                                // Disappear after moving
                                carSprite.setVisible(false);
                                // After a delay
                                this.time.delayedCall(2000, () => {
                                    carSprite.setPosition(x, y);
                                    carSprite.setVisible(true);
                                });
                            },
                        });
                    }
                });

                // Drive animation
                const screenWidth = this.scale.width;
                const randomDelay = Phaser.Math.Between(1, 3);

                if (isRight) {
                    console.log(rightCount);
                    // Move to the right
                    carSprite.setX(-32);
                    this.tweens.add({
                        targets: carSprite,
                        x: screenWidth + 32,
                        duration: 50000,
                        repeat: -1,
                        delay: rightCount * 4000 + randomDelay * 1000,
                    });
                    rightCount++;
                } else {
                    console.log(leftCount);
                    // Move to the left
                    carSprite.setX(2048);
                    this.tweens.add({
                        targets: carSprite,
                        x: -32,
                        duration: 50000,
                        repeat: -1,
                        delay: leftCount * 2000 + randomDelay * 2000,
                    });
                    leftCount++;
                }

                // Store the car sprite into global array
                const currentIndex = Object.keys(this.carSprites).length;
                this.carSprites[currentIndex] = carSprite;
            }
        }

        minerScene.events.on('car-clicked', (carId: number) => {
            const newID = carId - 1; // Adjust ID because Miners are 1-indexed
            const carSprite = this.carSprites[newID];
            if (carSprite) {
                // Click that car
                carSprite.emit('pointerdown');
            }
        });


        map.createLayer('Tile Layer 3', tileset, 0, 0);
        map.createLayer('Tile Layer 4', tileset, 0, 0);
        map.createLayer('Tile Layer 5', tileset, 0, 0);

        // Tree layer
        const treeLayer = map.getObjectLayer('trees');

        if (treeLayer && treeLayer.objects) {
            for (let i = 0; i < treeLayer.objects.length; i++) {
                const { x = 0, y = 0 } = treeLayer.objects[i];

                // Create tree sprite
                const treeSprite = this.add.sprite(x, y, 'blue_tree');

                // Align to map
                treeSprite.setOrigin(0, 1);

                treeSprite.setInteractive();

                treeSprite.on('pointerover', () => {
                    treeSprite.setTint(0x00ff00);
                });

                treeSprite.on('pointerout', () => {
                    treeSprite.clearTint();
                });

                // Add an onClick event listener
                treeSprite.on('pointerdown', () => {
                    if (treeSprite.visible === true) {
                        GameData.addResource(2, 1);
                        this.#displayFloatingText(this, treeSprite, 1, '2');
                        this.tweens.add({
                            targets: treeSprite,
                            y: y - 500,
                            duration: 100,
                            onComplete: () => {
                                // Disappear after flying up
                                treeSprite.setVisible(false);
                                // After a delay
                                this.time.delayedCall(2000, () => {
                                    treeSprite.setPosition(x, y);
                                    treeSprite.setVisible(true);
                                });
                            },
                        });
                    }
                });

                // Tree idle animation
                this.tweens.add({
                    targets: treeSprite,
                    scaleY: 1.1,
                    duration: 500,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                });

                // Store the tree sprite into global array
                const currentIndex = Object.keys(this.treeSprites).length;
                this.treeSprites[currentIndex] = treeSprite;
            }
        }

        minerScene.events.on('tree-clicked', (treeId: number) => {
            const newID = treeId - 1; // Adjust ID because Miners are 1-indexed
            const treeSprite = this.treeSprites[newID];
            if (treeSprite) {
                // Click that tree
                treeSprite.emit('pointerdown');
            }
        });



        map.createLayer('Tile Layer 6', tileset, 0, 0);
        map.createLayer('Tile Layer 7', tileset, 0, 0);
        map.createLayer('Tile Layer 8', tileset, 0, 0);
        map.createLayer('Tile Layer 9', tileset, 0, 0);

        // Set camera bounds and zoom
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.camera.setZoom(3);
        this.camera.centerOn(0, 0);

        this.time.addEvent({
            delay: 16,
            callback: () => {
                mainGameCursor = { x: this.input.activePointer.x, y: this.input.activePointer.y };
                controlCamera(this.camera);
            },
            loop: true,
        });

    }

    #displayFloatingText(scene : Phaser.Scene, sprite : Phaser.GameObjects.Sprite, count : number, icon : string) {
        const text = scene.add.text(sprite.x, sprite.y, `+${count}`, { color: '#247B7F', fontSize: '12px' })
        .setShadow(2, 2, "#000000", 2, true, true).setOrigin(0.5);

    const itemIcon = scene.add.image(sprite.x + 20, sprite.y, icon).setOrigin(0.5);
    
    scene.tweens.add({
        targets: text,
        y: sprite.y - 50,
        alpha: 0,
        duration: 1000,
        ease: 'Linear',
        onComplete: () => {
            text.destroy();
        }
    });
    scene.tweens.add({
        targets: itemIcon,
        y: sprite.y - 50,
        alpha: 0,
        duration: 1000,
        ease: 'Linear',
        onComplete: () => {
            text.destroy();
        }
    });
    }

}
