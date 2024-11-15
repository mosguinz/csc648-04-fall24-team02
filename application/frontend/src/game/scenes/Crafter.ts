import Phaser from 'phaser'
import InventoryMenu from './InventoryMenu'
import { Recipe } from '../data/Constants'

// Define CrafterInstance to represent each individual crafting unit
export interface CrafterInstance {
    id: string
    recipe: Recipe
    timer: Phaser.Time.TimerEvent
}

export default class Crafter extends Phaser.Scene {
    private crafters: CrafterInstance[] = [] // Track individual crafters
    private inventoryScene!: InventoryMenu

    constructor() {
        super({ key: 'Crafter' })
    }

    create() {
        this.inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu
        this.events.on('startCrafting', this.addCrafter, this)
    }

    // Add a new crafter instance
    private addCrafter(recipe: Recipe) {
        const crafterId = this.generateCrafterId(recipe)
        const timer = this.createCraftingTimer(recipe, crafterId)

        this.crafters.push({ id: crafterId, recipe, timer })
        this.events.emit('crafterAdded', this.crafters)

        console.log(`Crafter added for ${recipe.outputItem} with ID ${crafterId}`)
    }

    // Remove a crafter instance by its ID
    removeCrafter(crafterId: string) {
        const crafterIndex = this.crafters.findIndex(c => c.id === crafterId)
        if (crafterIndex !== -1) {
            this.crafters[crafterIndex].timer.remove()
            this.crafters.splice(crafterIndex, 1)
            this.events.emit('crafterRemoved', this.crafters)

            console.log(`Crafter removed with ID ${crafterId}`)
        }
    }

    // Create a timer for crafting
    private createCraftingTimer(recipe: Recipe, crafterId: string): Phaser.Time.TimerEvent {
        const craftInterval = 3000 // Crafting every 3 seconds

        return this.time.addEvent({
            delay: craftInterval,
            loop: true,
            callback: () => this.craftItem(recipe),
        })
    }

    // Handle crafting logic
    private craftItem(recipe: Recipe) {
        if (this.canCraft(recipe)) {
            this.consumeIngredients(recipe)
            this.produceOutput(recipe)
            this.displayFloatingText(recipe.outputItem)

            console.log(`Crafted ${recipe.outputAmount} ${recipe.outputItem}`)
        } else {
            console.log(`Not enough resources to craft ${recipe.outputItem}`)
        }
    }

    // Check if there are enough resources to craft the item
    private canCraft(recipe: Recipe): boolean {
        return recipe.ingredients.every(ingredient =>
            this.inventoryScene.inventory[ingredient.item]?.count >= ingredient.amount
        )
    }

    // Deduct ingredients from the inventory
    private consumeIngredients(recipe: Recipe) {
        for (const ingredient of recipe.ingredients) {
            const inventoryItem = this.inventoryScene.inventory[ingredient.item]
            inventoryItem.count -= ingredient.amount
            inventoryItem.textObject?.setText(`${inventoryItem.count}`)
        }
    }

    // Add crafted item to the inventory
    private produceOutput(recipe: Recipe) {
        const outputItem = this.inventoryScene.inventory[recipe.outputItem]
        outputItem.count += recipe.outputAmount
        outputItem.textObject?.setText(`${outputItem.count}`)
    }

    // Generate a unique ID for the crafter instance
    private generateCrafterId(recipe: Recipe): string {
        return `${recipe.outputItem}-${Phaser.Math.RND.uuid()}`
    }

    // Display floating text
    private displayFloatingText(producedItem: string) {
        const floatingText = this.add.text(1142, 141, `+1 ${producedItem}`, {
            fontSize: '16px',
            color: '#ffffff',
        })

        this.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => floatingText.destroy(),
        })
    }
}
