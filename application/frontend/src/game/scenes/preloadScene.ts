import Phaser from 'phaser';
import { GameData } from '../stores/gameData';

export default class Preload extends Phaser.Scene {
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
        this.load.font("text_font", "assets/game/fonts/Kenney-Pixel.ttf", "truetype");
        this.load.font("text_font_square", "assets/game/fonts/Kenney-Pixel-Square.ttf", "truetype");
        this.load.font("title_font", "assets/game/fonts/Kenney-Blocks.ttf", "truetype");
        this.load.font("text_font_small", "assets/game/fonts/Kenney-Mini.ttf", "truetype");
        this.load.pack("pack", "assets/game/boot-asset-pack.json");
        GameData.populateInventory();
    }

    create() {
        // this.scene.start('TitleScene');
        this.scene.start('MainGameScene');
        // this.scene.start('InventoryMenu');
        // this.scene.start('CraftingMenu');
        // this.scene.start('BuildMenu');
        this.scene.start('MinerPlacementMenu');
        
    }
}