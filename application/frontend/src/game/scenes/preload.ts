import Phaser from 'phaser';
import { GameData } from '../stores/gameData';

export default class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }


    init() {
        const image = new Image();
        image.src = 'assets/game/ui/preload.jpg';
        image.onload = () => {
            this.textures.addImage('preload', image);
            this.add.image(1024, 576, 'preload').setScale(1.9, 1.2).setOrigin(0.5, 0.5);
        };
    }
    preload() {
        this.load.font("text_font", "assets/game/fonts/Kenney-Pixel.ttf", "truetype");
        this.load.font("text_font_square", "assets/game/fonts/Kenney-Pixel-Square.ttf", "truetype");
        this.load.font("title_font", "assets/game/fonts/Kenney-Blocks.ttf", "truetype");
        this.load.font("text_font_small", "assets/game/fonts/Kenney-Mini.ttf", "truetype");

        // TODO: Put this in boot-asset-pack.json
        this.load.spritesheet('human1', 'assets/game/tilesets/sprite_sheets/human1.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.pack("pack", "assets/game/boot-asset-pack.json");
        GameData.populateInventory();
    }

    create() {
        // this.scene.start('TitleScene');
        this.scene.start('MainGameScene');
        // this.scene.start('InventoryMenu');
        // this.scene.start('CraftingMenu');
        // this.scene.start('BuildMenu');
        // this.scene.start('MinerPlacementMenu');
        // this.scene.start('CrafterPlacementMenu');

    }
}