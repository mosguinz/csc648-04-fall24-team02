import Phaser from 'phaser'
import InventoryMenu from './InventoryMenu'

// TODO: Use gameData.ts to store the smelter data
export interface SmelterInstance {
    id: string
    resource: string
    timer: Phaser.Time.TimerEvent
}

export default class Smelter extends Phaser.Scene {

    private smelters: SmelterInstance[] = [] // Track individual smelters

    constructor() {
        super({ key: "Smelter" })
    }

    create() {
        // Listen for smelter placement events
        this.events.on("startSmelter", (resource: string) => {
            this.addSmelter(resource)
        })
    }

    // Add a new smelter instance
    addSmelter(resource: string) {
        const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu
        const smeltInterval = 3000 // Smelting every 3 seconds
        const smelterId = `${resource}-${Phaser.Math.RND.uuid()}` // Unique ID for each smelter

        console.log(`Adding smelter for ${resource} with ID ${smelterId}...`)

        const timer = this.time.addEvent({
            delay: smeltInterval,
            loop: true,
            callback: () => {
                if (resource === "iron" && inventoryScene.inventory.iron_ore.count >= 1) {
                    inventoryScene.inventory.iron_ore.count -= 1
                    inventoryScene.inventory.iron_ingot.count += 1
                    inventoryScene.inventory.iron_ore.textObject!.setText(`${inventoryScene.inventory.iron_ore.count}`)
                    inventoryScene.inventory.iron_ingot.textObject!.setText(`${inventoryScene.inventory.iron_ingot.count}`)
                    this.displayFloatingText("Iron Ingot")
                } else if (resource === "copper" && inventoryScene.inventory.copper_ore.count >= 1) {
                    // Copper ore to copper ingot
                    inventoryScene.inventory.copper_ore.count -= 1;
                    inventoryScene.inventory.copper_ingot.count += 1;

                    // Update display
                    inventoryScene.inventory.copper_ore.textObject!.setText(`${inventoryScene.inventory.copper_ore.count}`);
                    inventoryScene.inventory.copper_ingot.textObject!.setText(`${inventoryScene.inventory.copper_ingot.count}`);
                    this.displayFloatingText("Copper Ingot");

                } else if (resource === "rock" && inventoryScene.inventory.rock.count >= 1) {
                    // Rock to concrete
                    inventoryScene.inventory.rock.count -= 1;
                    inventoryScene.inventory.concrete.count += 1;

                    // Update display
                    inventoryScene.inventory.rock.textObject!.setText(`${inventoryScene.inventory.rock.count}`);
                    inventoryScene.inventory.concrete.textObject!.setText(`${inventoryScene.inventory.concrete.count}`);
                    this.displayFloatingText("Concrete");
                }

            },
        })

        // Add the new smelter instance to the smelters array
        this.smelters.push({ id: smelterId, resource, timer })

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
