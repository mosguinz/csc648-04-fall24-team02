import Phaser from 'phaser';
import { TITLE_STYLE, TEXT_STYLE } from '../../config';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TitleScene',
        });
    }

    create() {
        // Title text
        this.add.text(1100, 390, "CLICK AND MORTAR", TITLE_STYLE).setOrigin(0.5, 0.5).setFontSize(128);

        // Start button
        const startButton = this.add.nineslice(1100, 620, "button_transparent", 0, 550, 120, 32, 32, 32, 32).setOrigin(0.5, 0.5).setInteractive();
        startButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            startButton.disableInteractive();
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('MainGameScene');
            });
        });


        this.add.text(startButton.x, startButton.y - 12, "START", TEXT_STYLE).setOrigin(0.5, 0.5).setFontSize(94);

        // Quit button
        const quitButton = this.add.nineslice(1100, 770, "button_transparent", 0, 500, 120, 32, 32, 32, 32).setOrigin(0.5, 0.5).setInteractive();
        this.add.text(quitButton.x, quitButton.y - 12, "QUIT", TEXT_STYLE).setOrigin(0.5, 0.5).setFontSize(94);

        // Side arrows for hover effect
        const arrowsContainer = this.add.container(startButton.x, startButton.y).setVisible(false);
        const startButtonArrowLeft = this.add.image(-400, 0, "button_arrow").setOrigin(0.5, 0.5);
        const startButtonArrowRight = this.add.image(400, 0, "button_arrow").setOrigin(0.5, 0.5).setScale(-1, 1);
        arrowsContainer.add(startButtonArrowLeft);
        arrowsContainer.add(startButtonArrowRight);

        // Hover effect
        startButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            arrowsContainer.setPosition(startButton.x, startButton.y);
            arrowsContainer.setVisible(true);
            this.tweens.add({
                targets: arrowsContainer,
                y: '+=10',
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        });
        startButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            arrowsContainer.setVisible(false);
            this.tweens.killTweensOf(arrowsContainer);
        });

        quitButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            arrowsContainer.setPosition(quitButton.x, quitButton.y);
            console.log(arrowsContainer.x, arrowsContainer.y);
            arrowsContainer.setVisible(true);
            this.tweens.add({
                targets: arrowsContainer,
                y: '+=10',
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        });
        quitButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            arrowsContainer.setVisible(false);
            this.tweens.killTweensOf(arrowsContainer);
        });



    }
}