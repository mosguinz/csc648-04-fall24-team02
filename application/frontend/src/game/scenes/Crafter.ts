import Phaser from 'phaser';
import InventoryMenu from './InventoryMenu';
import { Recipe } from '../data/Constants';

export interface CrafterInstance {
    id: string;
    recipe: Recipe;
    timer: Phaser.Time.TimerEvent;
}

export default class Crafter extends Phaser.Scene {
    private crafters: CrafterInstance[] = [];
    private inventoryScene!: InventoryMenu;
    private static readonly CRAFT_INTERVAL = 3000;
    private static readonly FLOATING_TEXT_DURATION = 1000;
    private static readonly FLOATING_TEXT_Y_OFFSET = 50;

    constructor() {
        super({ key: 'Crafter' });
    }

    create() {
        this.inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu;
        this.events.on('startCrafting', this.addCrafter, this);
    }

    // Add a new crafter instance
    private addCrafter(recipe: Recipe) {
        const crafterId = this.generateCrafterId(recipe);
        const timer = this.createCraftingTimer(recipe);

        this.crafters.push({ id: crafterId, recipe, timer });
        this.events.emit('crafterAdded', this.crafters);
    }

    // Remove a crafter instance by its ID
    removeCrafter(crafterId: string) {
        const crafterIndex = this.crafters.findIndex(c => c.id === crafterId);
        if (crafterIndex !== -1) {
            this.crafters[crafterIndex].timer.remove();
            this.crafters.splice(crafterIndex, 1);
            this.events.emit('crafterRemoved', this.crafters);
        }
    }

    // Create a timer for crafting
    private createCraftingTimer(recipe: Recipe): Phaser.Time.TimerEvent {
        return this.time.addEvent({
            delay: Crafter.CRAFT_INTERVAL,
            loop: true,
            callback: () => this.craftItem(recipe),
        });
    }

    // Crafting logic
    private craftItem(recipe: Recipe) {
        if (this.canCraft(recipe)) {
            this.updateInventory(recipe, 'consume');
            this.updateInventory(recipe, 'produce');
            this.displayFloatingText(recipe.outputItem);
        }
    }

    // Check if there are enough resources to craft the item
    private canCraft(recipe: Recipe): boolean {
        return recipe.ingredients.every(ingredient =>
            this.inventoryScene.inventory[ingredient.item]?.count >= ingredient.amount
        );
    }

    // Update inventory (consume or produce)
    private updateInventory(recipe: Recipe, action: 'consume' | 'produce') {
        const multiplier = action === 'consume' ? -1 : 1;

        const itemsToUpdate = action === 'consume' ? recipe.ingredients : [{ item: recipe.outputItem, amount: recipe.outputAmount }];

        for (const item of itemsToUpdate) {
            const inventoryItem = this.inventoryScene.inventory[item.item];
            inventoryItem.count += item.amount * multiplier;
            inventoryItem.textObject?.setText(`${inventoryItem.count}`);
        }
    }

    // Generate a unique ID for the crafter instance
    private generateCrafterId(recipe: Recipe): string {
        return `${recipe.outputItem}-${Phaser.Math.RND.uuid()}`;
    }

    // Display floating text for crafted item
    private displayFloatingText(producedItem: string) {
        const floatingText = this.add.text(1142, 141, `+1 ${producedItem}`, {
            fontSize: '16px',
            color: '#ffffff',
        });

        this.tweens.add({
            targets: floatingText,
            y: floatingText.y - Crafter.FLOATING_TEXT_Y_OFFSET,
            alpha: 0,
            duration: Crafter.FLOATING_TEXT_DURATION,
            ease: 'Power1',
            onComplete: () => floatingText.destroy(),
        });
    }
}
