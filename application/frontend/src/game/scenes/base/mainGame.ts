import Phaser from "phaser";

export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainGameScene',
        });
    }

    create() {
        this.scene.start('GameMenu');
        this.scene.start('Miner');
    }
}
