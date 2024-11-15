import Phaser from 'phaser';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        this.add.image(0, -400, "pink_bg").setOrigin(0, 0).setScale(0.74);
        this.add.nineslice(1100, 720, "button1",0 , 550, 120, 32, 32, 32, 32).setOrigin(0.5, 0.5).setTint(0xEF9DE9);
    }
}