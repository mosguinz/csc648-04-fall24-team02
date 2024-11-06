import Phaser from 'phaser'
import InventoryMenu from './InventoryMenu'
import { Recipe } from '../data/Constants'

// TODO: Use gameData.ts to store the smelter data
export interface SmelterInstance {
    id: string
    recipe: Recipe
    timer: Phaser.Time.TimerEvent
}

export default class Smelter extends Phaser.Scene {

    private smelters: SmelterInstance[] = [] // Track individual smelters

    constructor() {
        super({ key: "Smelter" })
    }

    create() {
        // Listen for smelter placement events
        this.events.on("startSmelter", (recipe: Recipe) => {
            this.addSmelter(recipe)
        })
    }

    // Add a new smelter instance
    addSmelter(recipe: Recipe) {
        const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu
        const smeltInterval = 3000 // Smelting every 3 seconds
        const smelterId = `${recipe.outputItem}-${Phaser.Math.RND.uuid()}` // Unique ID for each smelter

        console.log(`Adding smelter for ${recipe} with ID ${smelterId}...`)

        const timer = this.time.addEvent({
            delay: smeltInterval,
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
                    console.log(`Smelted ${recipe.outputAmount} ${recipe.outputItem}`)
                } else {
                    console.log(`Not enough resources to smelt ${recipe.outputItem}`)
                }

            },
        })

        // Add the new smelter instance to the smelters array
        this.smelters.push({ id: smelterId, recipe, timer })

        // Emit an event to update the display in RunningSmeltersScene
        this.events.emit("smelterAdded", this.smelters)
    }

    // Remove a smelter instance by its ID
    removeSmelter(smelterId: string) {
        const smelterIndex = this.smelters.findIndex(s => s.id === smelterId)
        if (smelterIndex !== -1) {
            this.smelters[smelterIndex].timer.remove() // Remove the timer
            this.smelters.splice(smelterIndex, 1) // Remove from array
            this.events.emit("smelterRemoved", this.smelters)
        }
    }

    // Display floating text
    displayFloatingText(producedItem: string) {
        const floatingText = this.add.text(1142, 100, `+1 ${producedItem}`, { fontSize: "16px", color: "#ffffff" })
        this.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50,
            alpha: 0,
            duration: 1000,
            ease: "Power1",
            onComplete: () => floatingText.destroy()
        })
    }
}
