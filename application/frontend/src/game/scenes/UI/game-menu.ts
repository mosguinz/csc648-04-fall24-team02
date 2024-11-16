import Phaser from "phaser";
import { TEXT_STYLE_SMALL } from '../../config';
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

        // Icon hover effect
        const iconHover = this.add.image(0, 0, 'button_hover',).setOrigin(.5, .5).setVisible(false).setScale(2);
        gameMenuContainer.add(iconHover);

        // Inventory button
        const inventoryButton = this.add.nineslice(-(menuWidth / 2), -(menuHeight / 2), 'menu_icon', 0,
            iconWidth, iconHeight, NSP, NSP, NSP, NSP).setOrigin(.5, .5).setInteractive();
        inventoryButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.launch('InventoryMenu');
        });
        gameMenuContainer.add(inventoryButton);

        // Inventory button text
        const inventoryButtonText = this.add.text(inventoryButton.x, inventoryButton.y + 60, "INVENTORY",
            TEXT_STYLE_SMALL).setOrigin(0.5, 0.5).setFontSize(25);
        gameMenuContainer.add(inventoryButtonText);

        // Inventory button icon
        // TODO: Add icon

        // Hover effect
        this.#updateHoverEffect(inventoryButton, iconHover);

        // Build button
        const buildButton = this.add.nineslice(-(menuWidth / 2) - iconWidth * 1.5, -(menuHeight / 2), 'menu_icon', 0,
            iconWidth, iconHeight, NSP, NSP, NSP, NSP).setOrigin(.5, .5).setInteractive();
        gameMenuContainer.add(buildButton);
        buildButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.launch('BuildMenu');
        });

        // Build button text
        const buildButtonText = this.add.text(buildButton.x, buildButton.y + 60, "BUILD",
            TEXT_STYLE_SMALL).setOrigin(0.5, 0.5).setFontSize(25);
        gameMenuContainer.add(buildButtonText);

        // Build button icon
        // TODO: Add icon

        // Hover effect
        this.#updateHoverEffect(buildButton, iconHover);

        // Crafting button
        const craftingButton = this.add.nineslice(-(menuWidth / 2) + iconWidth * 1.5, -(menuHeight / 2), 'menu_icon', 0,
            iconWidth, iconHeight, NSP, NSP, NSP, NSP).setOrigin(.5, .5).setInteractive();
        gameMenuContainer.add(craftingButton);
        craftingButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.launch('CraftingMenu');
        });

        // Crafting button text
        const craftingButtonText = this.add.text(craftingButton.x, craftingButton.y + 60, "CRAFTING",
            TEXT_STYLE_SMALL).setOrigin(0.5, 0.5).setFontSize(25);
        gameMenuContainer.add(craftingButtonText);

        // Crafting button icon
        // TODO: Add icon

        // Hover effect
        this.#updateHoverEffect(craftingButton, iconHover);
    }

    // Update arrow poisition and visibility on hover
    #updateHoverEffect(button: Phaser.GameObjects.NineSlice, arrow: Phaser.GameObjects.Image) {
        button.on(Phaser.Input.Events.POINTER_OVER, () => {
            arrow.setPosition(button.x, button.y - 65);
            arrow.setVisible(true);
            this.tweens.killTweensOf(arrow);
            this.tweens.add({
                targets: arrow,
                y: '+=5',
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        });
        button.on(Phaser.Input.Events.POINTER_OUT, () => {
            arrow.setVisible(false);
            this.tweens.killTweensOf(arrow);
        });
    }
}