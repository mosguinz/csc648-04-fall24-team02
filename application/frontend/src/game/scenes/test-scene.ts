import Phaser from 'phaser';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }

    create() {
        this.add.text(100, 100, 'Hello Phaser!');
        this.add.image(100, 200, "smelter");
    }
}