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
        this.load.font("text_font", "assets/game_fonts/Kenney-Pixel.ttf", "truetype");
        this.load.font("text_font_square", "assets/game_fonts/Kenney-Pixel-Square.ttf", "truetype");
        this.load.font("title_font", "assets/game_fonts/Kenney-Blocks.ttf", "truetype");
        this.load.pack("pack", "assets/boot-asset-pack.json")
    }

    create() {
        // this.scene.start('TitleScene');
        this.scene.start('MainGameScene');
        
    }
}