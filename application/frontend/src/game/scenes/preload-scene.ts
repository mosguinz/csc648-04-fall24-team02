import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }


    init() {

        // Loading bar for preloading assets
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        this.load.on('progress', (progress: number) => {

            bar.width = 4 + (460 * progress);

        });
    }
    preload() {
        this.load.pack("pack", "assets/boot-asset-pack.json")
    }

    create() {
        this.scene.start('TitleScene');
        
    }
}