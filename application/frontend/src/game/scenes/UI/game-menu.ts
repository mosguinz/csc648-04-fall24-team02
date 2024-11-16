import Phaser from "phaser";
import { TEXT_STYLE } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../data/constants';

export default class GameMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameMenu',
        });
    }

    create() {
        const menuWidth = 450;
        const menuHeight = 180;

        const iconWidth = 90;
        const iconHeight = 90;

        this.add.nineslice(GAME_WIDTH - 10, GAME_HEIGHT - 10, 'menu', 0, menuWidth, menuHeight, NSP, NSP, NSP, NSP).setOrigin(1, 1);

        const gameMenuContainer = this.add.container(GAME_WIDTH - 10, GAME_HEIGHT - 10);

        // Inventory button
        const inventoryButton = this.add.nineslice(
            -(menuWidth / 2),
            -(menuHeight / 2),
            'menu_icon',
            0,
            iconWidth,
            iconHeight,
            NSP,
            NSP,
            NSP,
            NSP
        ).setOrigin(0.5, 0.5).setInteractive();
        gameMenuContainer.add(inventoryButton);

        // Build button
        const buildButton = this.add.nineslice(
            -(menuWidth / 2) - iconWidth * 1.5,
            -(menuHeight / 2),
            'menu_icon',
            0,
            iconWidth,
            iconHeight,
            NSP,
            NSP,
            NSP,
            NSP
        ).setOrigin(0.5, 0.5).setInteractive();
        gameMenuContainer.add(buildButton);

        // Crafting button
        const craftingButton = this.add.nineslice(
            -(menuWidth / 2) + iconWidth * 1.5,
            -(menuHeight / 2),
            'menu_icon',
            0,
            iconWidth,
            iconHeight,
            NSP,
            NSP,
            NSP,
            NSP
        ).setOrigin(0.5, 0.5).setInteractive();
        gameMenuContainer.add(craftingButton);
    }
}