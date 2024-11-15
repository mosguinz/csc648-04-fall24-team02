import Phaser from 'phaser';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        this.add.image(0, -400, "pink_bg").setOrigin(0, 0).setScale(0.74);
        this.add.image(100, 100, "button1");
        this.add.nineslice(500, 500, "button1",0 , 600, 400, 32, 32, 32, 32);
    }
}