import { recipes, Recipe } from './Recipes'; // Import the recipes data
import InventoryMenu from './InventoryMenu';

export default class CraftingMenu extends Phaser.Scene {
    private currentPage: number = 0;
    private craftingItemsPerPage: number = 5; // Number of crafting items per page
    private totalCraftingItems: number = recipes.length;
    private craftingItems: Phaser.GameObjects.Container[] = []; // Store crafting item containers
    private leftArrow!: Phaser.GameObjects.Text; // Left arrow
    private rightArrow!: Phaser.GameObjects.Text; // Right arrow

    constructor() {
        super({ key: 'CraftingMenu' });
    }

    create() {
        const craftingBackground = this.add.rectangle(645, 640, 900, 160, 0x333333);
        craftingBackground.fillColor = 9539985;
        craftingBackground.postFX!.addShadow(1, 1, 0.1, 1, 0, 4, 1);

        // Left arrow button
        this.leftArrow = this.add.text(210, 620, '<', { fontSize: '40px' }).setInteractive();
        this.leftArrow.on('pointerdown', () => this.switchPage(-1));

        // Right arrow button
        this.rightArrow = this.add.text(1050, 620, '>', { fontSize: '40px' }).setInteractive();
        this.rightArrow.on('pointerdown', () => this.switchPage(1));

        this.updateArrowVisibility();

        // Display the first page of crafting items
        this.displayCraftingItems();
    }

    // Switch between pages (-1 for left, 1 for right)
    switchPage(direction: number) {
        this.currentPage += direction;

        const maxPage = Math.floor(this.totalCraftingItems / this.craftingItemsPerPage);
        if (this.currentPage < 0) this.currentPage = 0;
        if (this.currentPage > maxPage) this.currentPage = maxPage;

        this.displayCraftingItems();
        this.updateArrowVisibility();
    }

    // Function to display the crafting items on the current page
    displayCraftingItems() {
        // Clear any previously displayed items
        this.craftingItems.forEach(item => item.destroy());
        this.craftingItems = [];

        const startIndex = this.currentPage * this.craftingItemsPerPage;
        const endIndex = Math.min(startIndex + this.craftingItemsPerPage, this.totalCraftingItems);

        for (let i = startIndex; i < endIndex; i++) {
            const recipe = recipes[i];

            // Create a container for each crafting item
            const itemContainer = this.add.container(300 + (i - startIndex) * 153, 600);

            // Add the item image
            const itemImage = this.add.image(35, 0, recipe.outputItem).setScale(4);
            itemContainer.add(itemImage);

            const outputQuantityText = this.add.text(70, -25, `x ${recipe.outputAmount}`, { fontSize: '16px', color: '#ffffff' });
            itemContainer.add(outputQuantityText);

            recipe.ingredients.forEach((ingredient, index) => {
                // Create a container for each ingredient's cost
                const ingredientContainer = this.add.container(0, 40 + index * 30); // Adjust position for each ingredient

                // Add the quantity text
                const quantityText = this.add.text(0, 0, `${ingredient.amount}x`, { fontSize: '16px' });
                ingredientContainer.add(quantityText);

                // Add the item image next to the quantity text
                const ingredientImage = this.add.image(44, 6, ingredient.item).setScale(1.5); // Use the item key for the image
                ingredientContainer.add(ingredientImage);

                // Add the ingredient container to the crafting item container
                itemContainer.add(ingredientContainer);
            });

            // Add the craft button
            const craftButton = this.add.text(0, 80, 'Craft', { fontSize: '20px', backgroundColor: '#555', padding: { x: 10, y: 5 } }).setInteractive();
            craftButton.on('pointerdown', () => this.craftItem(recipe));
            itemContainer.add(craftButton);

            this.craftingItems.push(itemContainer);
        }
    }

    updateArrowVisibility() {
        const maxPage = Math.floor((this.totalCraftingItems - 1) / this.craftingItemsPerPage);

        // Hide the left arrow if on the first page
        if (this.currentPage === 0) {
            this.leftArrow.setVisible(false);
        } else {
            this.leftArrow.setVisible(true);
        }

        // Hide the right arrow if on the last page
        if (this.currentPage === maxPage) {
            this.rightArrow.setVisible(false);
        } else {
            this.rightArrow.setVisible(true);
        }
    }

    // Craft the selected item
    craftItem(recipe) {
    const inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu;

    // Check if the player has enough resources
    if (recipe.ingredients.every(ingredient => inventoryScene.deductFromInventory(ingredient.item, ingredient.amount))) {
        // Add the crafted item to the Inventory
        inventoryScene.addToInventory(recipe.outputItem, recipe.outputAmount);

        console.log(`Crafted ${recipe.outputAmount} ${recipe.outputItem}`);
    } else {
        const pointer = this.input.activePointer; // Get the current pointer (cursor) position

        // Create the floating text near the cursor
        const floatingText = this.add.text(pointer.worldX, pointer.worldY, "Not enough resources to craft item.", {
            fontSize: '16px',
            color: '#ff0000'
        });

        // Apply tween to animate the text (move up and fade out)
        this.tweens.add({
            targets: floatingText,
            y: pointer.worldY - 50, // Move up by 50 pixels
            alpha: 0,  // Fade out the text
            duration: 1000, // 1 second animation
            ease: 'Power1',
            onComplete: () => {
                floatingText.destroy(); // Destroy the text after the animation
            }
        });
    }
}
}