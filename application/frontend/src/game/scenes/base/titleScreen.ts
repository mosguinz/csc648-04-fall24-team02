import Phaser from 'phaser';
import { TEXT_STYLE, TITLE_STYLE } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../stores/constants';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TitleScene',
        });
    }

    create() {

        // Title text
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3, "CLICK AND MORTAR", TITLE_STYLE).setOrigin(0.5, 0.5).setFontSize(128);

        // Start button
        const startButton = this.add.nineslice(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, "button", 0, 550, 120, NSP, NSP, NSP, NSP).setOrigin(0.5, 0.5).setInteractive();
        this.add.text(startButton.x, startButton.y - 12, "START", TEXT_STYLE).setOrigin(0.5, 0.5).setFontSize(94).setColor("black");

        startButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            const camera = this.cameras.main;

            // Move camera to the right
            camera.pan(camera.width * 2, camera.centerY, 1000, 'Sine.easeInOut', false);

            // Switch to main game once finished
            camera.once(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
                this.scene.start('MainGameScene');
            });
        });

        // Quit button
        const quitButton = this.add.nineslice(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 180, "button", 0, 500, 120, 32, 32, 32, 32).setOrigin(0.5, 0.5).setInteractive();
        this.add.text(quitButton.x, quitButton.y - 12, "QUIT", TEXT_STYLE).setOrigin(0.5, 0.5).setFontSize(94).setColor("black");

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