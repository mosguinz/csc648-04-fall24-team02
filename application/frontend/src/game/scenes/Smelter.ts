import Phaser from 'phaser';
import InventoryMenu from './InventoryMenu';

export default class Smelter extends Phaser.Scene {

    private smelterTimers: { [key: string]: Phaser.Time.TimerEvent } = {} // Track smelter timers

    constructor() {
        super({ key: "Smelter" })
    }

    create() {
        // Listen for miner placement events from MinerPlacementScene
        this.events.on("startSmelter", (resource: string) => {
        this.startSmelterTimer(resource)
      })
    }

    startSmelterTimer(resource: string) {
        const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu

        // Automatically smelt resources
        const smeltInterval = 3000 // Smelting every 3 seconds
        console.log(`Starting smelter for ${resource}...`)

        this.smelterTimers[resource] = this.time.addEvent({
            delay: smeltInterval,
            loop: true,
            callback: () => {
                if (
                    resource === "iron" &&
                    inventoryScene.inventory.iron_ore.count >= 1
                ) {
                    // Deduct iron ore and add iron ingot
                    inventoryScene.inventory.iron_ore.count -= 1
                    inventoryScene.inventory.iron_ingot.count += 1

                    // Update the iron ore and iron ingot count displays
                    inventoryScene.inventory.iron_ore.textObject!.setText(
                        `${inventoryScene.inventory.iron_ore.count}`,
                    )
                    inventoryScene.inventory.iron_ingot.textObject!.setText(
                        `${inventoryScene.inventory.iron_ingot.count}`,
                    )

                    // Show floating text for iron ingot
                    this.displayFloatingText("Iron Ingot")
                    console.log("Smelting iron ore to iron ingot.")
                } else if (
                    resource === "copper" &&
                    inventoryScene.inventory.copper_ore.count >= 1
                ) {
                    // Deduct copper ore and add copper ingot
                    inventoryScene.inventory.copper_ore.count -= 1
                    inventoryScene.inventory.copper_ingot.count += 1
                    inventoryScene.inventory.copper_ore.textObject!.setText(
                        `${inventoryScene.inventory.copper_ore.count}`,
                    )
                    inventoryScene.inventory.copper_ingot.textObject!.setText(
                        `${inventoryScene.inventory.copper_ingot.count}`,
                    )

                    // Show floating text for copper ingot
                    this.displayFloatingText("Copper Ingot")
                    console.log("Smelting copper ore to copper ingot.")
                } else if (
                    resource === "rock" &&
                    inventoryScene.inventory.rock.count >= 1
                ) {
                    // Deduct rock and add concrete
                    inventoryScene.inventory.rock.count -= 1
                    inventoryScene.inventory.concrete.count += 1
                    inventoryScene.inventory.rock.textObject!.setText(
                        `${inventoryScene.inventory.rock.count}`,
                    )
                    inventoryScene.inventory.concrete.textObject!.setText(
                        `${inventoryScene.inventory.concrete.count}`,
                    )

                    // Show floating text for concrete
                    this.displayFloatingText("Concrete")
                    console.log("Turning rock into concrete.")
                }
            },
        })
    }

    // Function for floating text
    displayFloatingText(producedItem: string) {
        const floatingText = this.add.text(1142, 100, `+1 ${producedItem}`, {
            fontSize: "16px",
            color: "#ffffff",
        })

        // Apply tween to animate the text (move up and fade out)
        this.tweens.add({
            targets: floatingText,
            y: floatingText.y - 50, // Move up by 50 pixels
            alpha: 0, // Fade out the text
            duration: 1000, // 1 second animation
            ease: "Power1",
            onComplete: () => {
                floatingText.destroy() // Destroy the text after the animation
            },
        })
    }
}
