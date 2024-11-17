import Phaser from "phaser";
import { TEXT_STYLE } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../data/constants';

export default class CraftingMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'CraftingMenu',
        });
    }

    create() {
        // Crafting menu dimensions
        const CRAFTING_WIDTH = GAME_WIDTH / 2.8;
        const CRAFTING_HEIGHT = GAME_HEIGHT / 1.5;

        this.add.nineslice(GAME_WIDTH / 2.3, GAME_HEIGHT / 9, 'inventory_panel', 0,
            CRAFTING_WIDTH, CRAFTING_HEIGHT, NSP, NSP, NSP, NSP).setOrigin(0, 0).setTint(0x707070);

        const craftingContainer = this.add.container(GAME_WIDTH / 2.3, GAME_HEIGHT / 9);

        // Crafting text
        craftingContainer.add(
            this.add.text(CRAFTING_WIDTH / 2, CRAFTING_HEIGHT / 15, "MORTAR", TEXT_STYLE)
                .setOrigin(.5, .5).setColor("black").setFontSize(64)
        );

        const closeButton = this.add.image(CRAFTING_WIDTH - 50, 50, 'close_button').setOrigin(.5, .5).setScale(3).setInteractive()
        craftingContainer.add(closeButton);
        closeButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            closeButton.setTint(0xff0000);
        });
        closeButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            closeButton.clearTint();
        });
        closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.stop('CraftingMenu');
        });

        // Crafting slots
        const craftingInput1 = this.add.nineslice(CRAFTING_WIDTH / 5, CRAFTING_HEIGHT / 3, 'crafting_slot',
            0, 100, 100, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingInput1);

        const craftingInput2 = this.add.nineslice(CRAFTING_WIDTH / 3, CRAFTING_HEIGHT / 3, 'crafting_slot',
            0, 100, 100, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingInput2);

        const craftingOutput = this.add.nineslice(CRAFTING_WIDTH / 1.3, CRAFTING_HEIGHT / 3, 'crafting_slot',
            0, 100, 100, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingOutput);

        // Crafting result arrow
        craftingContainer.add(this.add.image(CRAFTING_WIDTH / 1.8, CRAFTING_HEIGHT / 3, 'button_arrow').setOrigin(.5, .5));

        // Craft button
        craftingContainer.add(this.add.text(CRAFTING_WIDTH / 2, CRAFTING_HEIGHT / 2 - 9, "CRAFT", TEXT_STYLE)
            .setOrigin(.5, .5).setFontSize(60));
        const craftingButton = this.add.nineslice(CRAFTING_WIDTH / 2, CRAFTING_HEIGHT / 2, 'crafting_slot',
            0, 200, 80, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingButton);
        craftingButton.setInteractive();

        craftingButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            craftingButton.setTint(0x00FF00);
        });
        craftingButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            craftingButton.clearTint();
        });
        // TODO: Add crafting functionality

        // Crafting recipes
        craftingContainer.add(this.add.nineslice(CRAFTING_WIDTH / 12, CRAFTING_HEIGHT / 1.7, 'recipe_panel',
            0, CRAFTING_WIDTH - CRAFTING_WIDTH / 6, CRAFTING_HEIGHT / 2.7, NSP, NSP, NSP, NSP).setOrigin(0, 0));
        craftingContainer.add(this.add.text(CRAFTING_WIDTH / 2, CRAFTING_HEIGHT / 1.7 + 30, "RECIPES", TEXT_STYLE)
            .setColor("black").setOrigin(.5, .5).setFontSize(60));

        // Recipe slots
        // TODO: populate recipe container with recipes
        // TODO: Select button next to recipe to input into mortar
        // const recipeContainer = this.add.container(CRAFTING_WIDTH / 12, CRAFTING_HEIGHT / 1.7);
    }
}