import Phaser from 'phaser';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }

    preload() {
    }

    create() {
        this.add.text(100, 100, 'Hello Phaser!');
        background: '#000000';
    }
}