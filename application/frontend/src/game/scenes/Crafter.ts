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

    constructor() {
        super({ key: "Crafter" })
    }

    create() {
        // Listen for crafting start events
        this.events.on("startCrafting", (recipe: Recipe) => {
            this.addCrafter(recipe)
        })
    }

    // Add a new crafter instance
    addCrafter(recipe: Recipe) {
        const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu
        const craftInterval = 3000 // Crafting every 3 seconds
        const crafterId = `${recipe.outputItem}-${Phaser.Math.RND.uuid()}` // Unique ID for each crafter

        console.log(`Adding crafter for ${recipe.outputItem} with ID ${crafterId}...`)

        const timer = this.time.addEvent({
            delay: craftInterval,
            loop: true,
            callback: () => {
                const canCraft = recipe.ingredients.every(ingredient =>
                    inventoryScene.inventory[ingredient.item]?.count >= ingredient.amount
                )

                if (canCraft) {
                    // Deduct ingredients
                    recipe.ingredients.forEach(ingredient => {
                        inventoryScene.inventory[ingredient.item].count -= ingredient.amount
                        inventoryScene.inventory[ingredient.item].textObject?.setText(
                            `${inventoryScene.inventory[ingredient.item].count}`
                        )
                    })

                    // Add crafted item
                    inventoryScene.inventory[recipe.outputItem].count += recipe.outputAmount
                    inventoryScene.inventory[recipe.outputItem].textObject?.setText(
                        `${inventoryScene.inventory[recipe.outputItem].count}`
                    )

                    // Show floating text
                    this.displayFloatingText(recipe.outputItem)
                    console.log(`Crafted ${recipe.outputAmount} ${recipe.outputItem}`)
                } else {
                    console.log(`Not enough resources to craft ${recipe.outputItem}`)
                }
            }
        })

        // Add the new crafter instance to the crafters array
        this.crafters.push({ id: crafterId, recipe, timer })

        // Emit an event to update the display in RunningCraftersScene
        this.events.emit("crafterAdded", this.crafters)
    }

    // Remove a crafter instance by its ID
    removeCrafter(crafterId: string) {
        const crafterIndex = this.crafters.findIndex(c => c.id === crafterId)
        if (crafterIndex !== -1) {
            this.crafters[crafterIndex].timer.remove() // Remove the timer
            this.crafters.splice(crafterIndex, 1) // Remove from array
            this.events.emit("crafterRemoved", this.crafters)
        }
    }

    // Display floating text
    displayFloatingText(producedItem: string) {
        const floatingText = this.add.text(1142, 141, `+1 ${producedItem}`, {
            fontSize: "16px",
            color: "#ffffff",
        })

        this.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50,
            alpha: 0,
            duration: 1000,
            ease: "Power1",
            onComplete: () => floatingText.destroy(),
        })
    }
}
