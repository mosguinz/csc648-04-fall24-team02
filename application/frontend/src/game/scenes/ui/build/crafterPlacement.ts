import Phaser from "phaser";
import { TEXT_STYLE, TEXT_STYLE_SMALL } from '../../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP, recipes } from '../../../stores/constants';
import { GameData } from "../../../stores/gameData";
import { UserAssembler } from "../../../../client";

export default class CrafterPlacementMenu extends Phaser.Scene {

    private CRAFTER_PLACEMENT_WIDTH = GAME_WIDTH / 3;
    private CRAFTER_PLACEMENT_HEIGHT = GAME_HEIGHT / 5;
    private SLOT_SIZE = 100;

    private recipeIndex = 0;
    private recipeContainer: Phaser.GameObjects.Container;

    private leftArrow: Phaser.GameObjects.Image;
    private rightArrow: Phaser.GameObjects.Image;

    constructor() {
        super({
            key: 'CrafterPlacementMenu',
        });
    }

    create() {
        this.add.nineslice(GAME_WIDTH / 2, 0, 'inventory_panel', 0,
            this.CRAFTER_PLACEMENT_WIDTH, this.CRAFTER_PLACEMENT_HEIGHT, NSP, NSP, NSP, NSP).setOrigin(0.5, 0).setTint(0x707070);

        const placementContainer = this.add.container(GAME_WIDTH / 2 - this.CRAFTER_PLACEMENT_WIDTH / 2, 0);

        // Build menu text
        placementContainer.add(
            this.add.text(this.CRAFTER_PLACEMENT_WIDTH / 2, this.CRAFTER_PLACEMENT_HEIGHT / 7, "AUTO-CRAFT", TEXT_STYLE)
                .setOrigin(.5, .5).setColor("white").setFontSize(64)
        );

        // Close button
        const closeButton = this.add.image(this.CRAFTER_PLACEMENT_WIDTH - 35, 35, 'close_button').setOrigin(.5, .5).setScale(3).setInteractive()
        placementContainer.add(closeButton);
        closeButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            closeButton.setTint(0xff0000);
        });
        closeButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            closeButton.clearTint();
        });
        closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start("GameMenu");
            this.scene.stop('CrafterPlacementMenu');
        });

        // Getting the Miner scene
        const CrafterScene = this.scene.get('Crafter');

        // Crafting slots
        const craftingInput1 = this.add.nineslice(this.CRAFTER_PLACEMENT_WIDTH / 5, this.CRAFTER_PLACEMENT_HEIGHT / 3 + 35, 'crafting_slot',
            0, this.SLOT_SIZE, this.SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        placementContainer.add(craftingInput1);

        const craftingInput2 = this.add.nineslice(this.CRAFTER_PLACEMENT_WIDTH / 5 + this.SLOT_SIZE + 5, this.CRAFTER_PLACEMENT_HEIGHT / 3 + 35, 'crafting_slot',
            0, this.SLOT_SIZE, this.SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        placementContainer.add(craftingInput2);

        const craftingOutput = this.add.nineslice(this.CRAFTER_PLACEMENT_WIDTH / 1.25, this.CRAFTER_PLACEMENT_HEIGHT / 3 + 35, 'crafting_slot',
            0, this.SLOT_SIZE, this.SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        placementContainer.add(craftingOutput);

        // Result arrow
        placementContainer.add(this.add.image(this.CRAFTER_PLACEMENT_WIDTH / 1.7, this.CRAFTER_PLACEMENT_HEIGHT / 3 + 35, 'button_arrow')
            .setOrigin(.5, .5).setScale(0.9, 1));

        // Build button
        const craftingButtonText = this.add.text(this.CRAFTER_PLACEMENT_WIDTH / 2 + 50, this.CRAFTER_PLACEMENT_HEIGHT / 2 + 48, "BUILD", TEXT_STYLE)
            .setOrigin(.5, .5).setFontSize(50);
        const craftingButton = this.add.nineslice(this.CRAFTER_PLACEMENT_WIDTH / 2 + 50, this.CRAFTER_PLACEMENT_HEIGHT / 2 + 55, 'crafting_slot',
            0, 140, 70, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        placementContainer.add(craftingButtonText);
        placementContainer.add(craftingButton);
        craftingButton.setInteractive();

        craftingButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            craftingButton.setPosition(craftingButton.x, craftingButton.y + 5);
            craftingButtonText.setPosition(craftingButtonText.x, craftingButtonText.y + 5);

        });
        craftingButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            craftingButton.setPosition(craftingButton.x, craftingButton.y - 5);
            craftingButtonText.setPosition(craftingButtonText.x, craftingButtonText.y - 5);
        });
        craftingButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            const newCrafter: UserAssembler = {
                id: GameData.nextCrafterId.toString(),
                facility_type_id: 2,
                user_id: "12345", // TODO: Get user id from auth
                recipe_id: this.recipeIndex,
                status: "active",
            };
            CrafterScene.events.emit('add-crafter', newCrafter);
            console.log(newCrafter);
            this.scene.start("GameMenu");
            this.scene.stop('crafterPlacementMenu');
        });

        // Left Arrow
        this.leftArrow = this.add.image(this.CRAFTER_PLACEMENT_WIDTH / 13, this.CRAFTER_PLACEMENT_HEIGHT / 2, 'left_arrow')
            .setOrigin(0.5, 0.5).setInteractive().setScale(3);
        placementContainer.add(this.leftArrow);

        this.leftArrow.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.leftArrow.setTint(0x505050);
        });
        this.leftArrow.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.leftArrow.clearTint();
        });

        this.leftArrow.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.recipeIndex > 0) {
                this.recipeIndex--;
                this.updateRecipeDisplay();
                this.updateArrows();
            }
        });

        this.tweens.add({
            targets: this.leftArrow,
            x: '+=8',
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        // Right Arrow
        this.rightArrow = this.add.image(this.CRAFTER_PLACEMENT_WIDTH / 1.07, this.CRAFTER_PLACEMENT_HEIGHT / 2, 'right_arrow')
            .setOrigin(0.5, 0.5).setInteractive().setScale(3); // Flip horizontally
        placementContainer.add(this.rightArrow);

        this.rightArrow.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.rightArrow.setTint(0x505050);
        });
        this.rightArrow.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.rightArrow.clearTint();
        });

        this.tweens.add({
            targets: this.rightArrow,
            x: '-=8',
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        this.rightArrow.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.recipeIndex < recipes.length - 1) {
                this.recipeIndex++;
                this.updateRecipeDisplay();
                this.updateArrows();
            }
        });

        this.recipeContainer = this.add.container(this.CRAFTER_PLACEMENT_WIDTH / 8 , this.CRAFTER_PLACEMENT_HEIGHT / 2 - 5);
        placementContainer.add(this.recipeContainer);

        this.updateArrows();
        this.updateRecipeDisplay();

    }

    private updateArrows() {
        this.leftArrow.setVisible(this.recipeIndex > 0);
        this.rightArrow.setVisible(this.recipeIndex < recipes.length - 1);
    }

    private updateRecipeDisplay() {
        this.recipeContainer.removeAll(true);

        const currentRecipe = recipes[this.recipeIndex];

        // Looping through ingredient array
        for (let index = 0; index < currentRecipe.ingredients.length; index++) {
            const ingredient = currentRecipe.ingredients[index];

            const ingredientIcon = this.add.image(this.SLOT_SIZE / 2 + index * (this.SLOT_SIZE + 5), 0, ingredient.item)
                .setOrigin(.5, .5).setScale(2);
            this.recipeContainer.add(ingredientIcon);

            const ingredientCount = this.add.text(this.SLOT_SIZE / 2 + index * (this.SLOT_SIZE) + 20, 27, `${ingredient.amount}`, TEXT_STYLE_SMALL)
                .setOrigin(.5, .5).setColor("black").setFontSize(24);
            this.recipeContainer.add(ingredientCount);

            const ingredientItem = this.add.text(this.SLOT_SIZE / 2, 30, `${ingredient.item}`, TEXT_STYLE_SMALL)
                .setOrigin(.5, .5).setColor("black").setFontSize(24);
            this.recipeContainer.add(ingredientItem);
        }

        // Display output

        const outputIcon = this.add.image(this.SLOT_SIZE * 4.62, 0, currentRecipe.outputItem)
            .setOrigin(.5, .5).setScale(2);
        this.recipeContainer.add(outputIcon);

        const outputCount = this.add.text(this.SLOT_SIZE * 4.62 + 20, 25, `${currentRecipe.outputAmount}`, TEXT_STYLE_SMALL)
            .setOrigin(.5, .5).setColor("black").setFontSize(24);
        this.recipeContainer.add(outputCount);

        const outputItem = this.add.text(this.SLOT_SIZE * 4.62, 25, `${currentRecipe.outputItem}`, TEXT_STYLE_SMALL)
            .setOrigin(.5, .5).setColor("black").setFontSize(24);
        this.recipeContainer.add(outputItem);
    }
}
