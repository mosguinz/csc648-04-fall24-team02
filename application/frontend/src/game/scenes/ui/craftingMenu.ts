import Phaser from "phaser";
import { TEXT_STYLE, TEXT_STYLE_SMALL } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP, recipes } from '../../stores/constants';
import { GameData } from "../../stores/gameData";

export default class CraftingMenu extends Phaser.Scene {

    private recipeIndex = 0;
    private recipeContainer: Phaser.GameObjects.Container;

    private CRAFTING_WIDTH = GAME_WIDTH / 2.8;
    private CRAFTING_HEIGHT = GAME_HEIGHT / 1.5;
    private SLOT_SIZE = 120;

    private leftArrow!: Phaser.GameObjects.Image;
    private rightArrow!: Phaser.GameObjects.Image;

    constructor() {
        super({
            key: 'CraftingMenu',
        });
    }

    create() {
        GameData.addResource(1, 10);
        GameData.addResource(2, 10);
        GameData.addResource(3, 10);
        GameData.addResource(4, 10);
        GameData.addResource(5, 10);
        GameData.addResource(6, 10);

        this.add.nineslice(GAME_WIDTH / 2.3, GAME_HEIGHT / 9, 'inventory_panel', 0,
            this.CRAFTING_WIDTH, this.CRAFTING_HEIGHT / 1.4, NSP, NSP, NSP, NSP).setOrigin(0, 0).setTint(0x707070);

        const craftingContainer = this.add.container(GAME_WIDTH / 2.3, GAME_HEIGHT / 9);

        craftingContainer.add(this.add.nineslice(this.CRAFTING_WIDTH / 12, this.CRAFTING_HEIGHT / 5, 'recipe_panel',
            0, this.CRAFTING_WIDTH - this.CRAFTING_WIDTH / 6, this.CRAFTING_HEIGHT / 2.3, NSP, NSP, NSP, NSP).setOrigin(0, 0).setTint(0x505050));

        this.recipeContainer = this.add.container(this.CRAFTING_WIDTH / 5 - 60, this.CRAFTING_HEIGHT / 3);
        craftingContainer.add(this.recipeContainer);

        // Crafting text
        craftingContainer.add(
            this.add.text(this.CRAFTING_WIDTH / 2, this.CRAFTING_HEIGHT / 15, "MORTAR", TEXT_STYLE)
                .setOrigin(.5, .5).setColor("black").setFontSize(64)
        );

        const closeButton = this.add.image(this.CRAFTING_WIDTH - 50, 50, 'close_button').setOrigin(.5, .5).setScale(3).setInteractive()
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
        const craftingInput1 = this.add.nineslice(this.CRAFTING_WIDTH / 5, this.CRAFTING_HEIGHT / 3, 'crafting_slot',
            0, this.SLOT_SIZE, this.SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingInput1);

        const craftingInput2 = this.add.nineslice(this.CRAFTING_WIDTH / 5 + this.SLOT_SIZE + 5, this.CRAFTING_HEIGHT / 3, 'crafting_slot',
            0, this.SLOT_SIZE, this.SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingInput2);

        const craftingOutput = this.add.nineslice(this.CRAFTING_WIDTH / 1.25, this.CRAFTING_HEIGHT / 3, 'crafting_slot',
            0, this.SLOT_SIZE, this.SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingOutput);

        // Crafting result arrow
        craftingContainer.add(this.add.image(this.CRAFTING_WIDTH / 1.7, this.CRAFTING_HEIGHT / 3, 'button_arrow')
            .setOrigin(.5, .5).setScale(0.9, 1));

        // Craft button
        const craftingButtonText = this.add.text(this.CRAFTING_WIDTH / 2, this.CRAFTING_HEIGHT / 2 - 9, "CRAFT", TEXT_STYLE)
            .setOrigin(.5, .5).setFontSize(60);
        const craftingButton = this.add.nineslice(this.CRAFTING_WIDTH / 2, this.CRAFTING_HEIGHT / 2, 'crafting_slot',
            0, 200, 80, NSP, NSP, NSP, NSP).setOrigin(.5, .5);
        craftingContainer.add(craftingButtonText);
        craftingContainer.add(craftingButton);
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
            if (this.canCraft(recipes[this.recipeIndex])) {
                this.craftItem(recipes[this.recipeIndex]);
                this.updateRecipeDisplay();
                this.updateButtonState(craftingButton, recipes[this.recipeIndex]);
            }
        });


        // Left Arrow
        this.leftArrow = this.add.image(this.CRAFTING_WIDTH / 3.5, 385, 'left_arrow')
            .setOrigin(0.5, 0.5).setInteractive().setScale(3);
        craftingContainer.add(this.leftArrow);

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
        this.rightArrow = this.add.image(this.CRAFTING_WIDTH / 1.4, 385, 'right_arrow')
            .setOrigin(0.5, 0.5).setInteractive().setScale(3); // Flip horizontally
        craftingContainer.add(this.rightArrow);

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
                .setOrigin(.5, .5).setScale(2.5);
            this.recipeContainer.add(ingredientIcon);

            const ingredientCount = this.add.text(this.SLOT_SIZE / 2 + index * (this.SLOT_SIZE + 5) + 30, 30, `${ingredient.amount}`, TEXT_STYLE_SMALL)
                .setOrigin(.5, .5).setColor("black").setFontSize(24);
            this.recipeContainer.add(ingredientCount);

            const ingredientItem = this.add.text(this.SLOT_SIZE /2, 30, `${ingredient.item}`, TEXT_STYLE_SMALL)
            .setOrigin(.5, .5).setColor("black").setFontSize(24);
            this.recipeContainer.add(ingredientItem);
        }

        // Display output

        const outputIcon = this.add.image(this.SLOT_SIZE * 4.15, 0, currentRecipe.outputItem)
            .setOrigin(.5, .5).setScale(2.5);
        this.recipeContainer.add(outputIcon);

        const outputCount = this.add.text(this.SLOT_SIZE * 4.15 + 30, 30, `${currentRecipe.outputAmount}`, TEXT_STYLE_SMALL)
            .setOrigin(.5, .5).setColor("black").setFontSize(24);
        this.recipeContainer.add(outputCount);

        const outputItem = this.add.text(this.SLOT_SIZE * 4.15, 30, `${currentRecipe.outputItem}`, TEXT_STYLE_SMALL)
            .setOrigin(.5, .5).setColor("black").setFontSize(24);
        this.recipeContainer.add(outputItem);
    }

    private canCraft(recipe: { ingredients: { item: string; amount: number }[] }): boolean {
        return recipe.ingredients.every(ingredient => {
            const resource = GameData.resources.find(res => res.resource_type_id === parseInt(ingredient.item, 10));
            return resource && resource.quantity >= ingredient.amount;
        });
    }

    private craftItem(recipe: { outputItem: string; outputAmount: number; ingredients: { item: string; amount: number }[] }) {
        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i];
            const resourceKey = parseInt(ingredient.item, 10);

            GameData.removeResource(resourceKey, ingredient.amount);
        }

        GameData.addResource(parseInt(recipe.outputItem, 10), recipe.outputAmount);
    }


}
