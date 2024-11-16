import * as Phaser from 'phaser';
import * as Scenes from './scenes';

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        parent: 'game-container',
        width: 2048,
        height: 1152,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#000000',
    // Add new scenes here
    scene: [
        Scenes.PreloadScene,
        Scenes.MainGameScene,
        Scenes.TitleScene,
        Scenes.GameMenu,
        Scenes.InventoryMenu,
        Scenes.BuildMenu,
        Scenes.CraftingMenu,
    ],
}

export const TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'text_font',
    color: 'white',
    align: 'center',
};

export const TITLE_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'title_font',
    color: 'white',
    align: 'center',
};

export const TEXT_STYLE_SQUARE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'text_font_square',
    color: 'white',
    align: 'center',
};

export const TEXT_STYLE_SMALL: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'text_font_small',
    color: 'white',
    align: 'center',
};