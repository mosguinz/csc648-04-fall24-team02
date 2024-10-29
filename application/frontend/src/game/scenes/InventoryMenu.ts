import Phaser from "phaser"
import { ResourcesService, ResourceBase, TDataSetResources } from "../../client";
import { ResourceMap } from "../data/Constants";

export default class InventoryMenu extends Phaser.Scene {

    public inventory: {
        [key: string]: {
            count: number,
            textObject: Phaser.GameObjects.Text | null,
            name: string
        }
    } = {
            iron_ore: { count: 0, textObject: null, name:"Iron Ore"},
            copper_ore: { count: 0, textObject: null, name:"Copper Ore" },
            rock: { count: 0, textObject: null, name:"Rock" },
            iron_ingot: { count: 0, textObject: null, name:"Iron Ingot" },
            copper_ingot: { count: 0, textObject: null, name:"Copper Ingot" },
            concrete: { count: 0, textObject: null, name:"Concrete" },
            iron_plate: { count: 0, textObject: null, name:"Iron Plate" },
            copper_plate: { count: 0, textObject: null, name:"Copper Plate" },
            iron_rod: { count: 0, textObject: null, name:"Iron Rod" },
            screws: { count: 0, textObject: null, name:"Screws" },
            wire: { count: 0, textObject: null, name:"Wire" },
            cable: { count: 0, textObject: null, name:"Cable" },
        }

    private floatingTextOffsetY = 20 // Y offset for overlapping texts
    private activeFloatingTexts: Phaser.GameObjects.Text[] = [] // Store active floating texts to manage overlaps

    constructor() {
        super({ key: "InventoryMenu" })

        // TODO: Properly add syncing with the backend
        ResourcesService.readResources().then((response) => {
            for (const resource of response) {
                const key = ResourceMap[resource.resource_type_id];
                this.inventory[key].count = resource.quantity;
            }
        });
    }

    create() {
        // Background Rectangle
        const rectangle = this.add.rectangle(91, 296, 128, 128)
        rectangle.scaleX = 1.447
        rectangle.scaleY = 4.65
        rectangle.isFilled = true
        rectangle.fillColor = 9539985
        rectangle.postFX!.addShadow(-1, 1, 0.1, 1, 0, 2, 1)

        // Inventory title
        const inventoryTitle = this.add.text(29, 16, "Inventory", {
            fontSize: "24px",
            color: "#000000",
        })
        inventoryTitle.scaleX = 1
        inventoryTitle.scaleY = 1

        // resource objects
        let offset = 0
        for (const key in ResourceMap) {
            const res = {
                resource_type_id: parseInt(key),
                quantity: 0
            } as ResourceBase
            this.addResource(res, 25, 79 + 40*offset)
            offset++
        }

        ResourcesService.readResources().then((response) => {
            for (const resource of response) {
                const res_name = ResourceMap[resource.resource_type_id];
                this.inventory[res_name].count = resource.quantity;
            }
        });
    }

    // Helper function to add a resource (image, name, and count text)
    private addResource(
        resource: ResourceBase,
        xCord: number,
        yCord: number,
    ) {
        const key = ResourceMap[resource.resource_type_id]
        const imgX = xCord
        const imgY = yCord
        const nameX = xCord + 26
        const nameY = yCord - 18
        const countX = xCord + 26
        const countY = yCord + 2
        const text = this.inventory[key].name + ":"
        this.add.image(imgX, imgY, key).setScale(2)
        this.add.text(nameX, nameY, text, { fontSize: "16px" })
        this.inventory[key].textObject = this.add.text(
            countX,
            countY,
            `${this.inventory[key].count}`,
            { fontSize: "16px" },
        )
    }

    // Method to update the inventory counts (can be called from other scenes)
    updateInventoryDisplay() {
        for (const item in this.inventory) {
            if (this.inventory[item].textObject) {
                this.inventory[item].textObject!.setText(
                    `${this.inventory[item].count}`,
                )
            }
        }
    }

    displayFloatingTextAtCursor(text: string) {
        const pointer = this.input.activePointer // Get the current pointer (cursor) position

        // Calculate the Y position offset to prevent overlap
        const yOffset = this.activeFloatingTexts.length * this.floatingTextOffsetY

        // Create the floating text near the cursor
        const floatingText = this.add.text(
            pointer.worldX,
            pointer.worldY - yOffset,
            text,
            {
                fontSize: "16px",
                color: "#ffffff",
            },
        )

        // Add the floating text to the active list to manage offsets
        this.activeFloatingTexts.push(floatingText)

        // Apply tween to animate the text
        this.tweens.add({
            targets: floatingText,
            y: pointer.worldY - 50 - yOffset, // Move up by 50 pixels (plus any offset)
            alpha: 0, // Fade out the text
            duration: 1000, // 1 second animation
            ease: "Power1",
            onComplete: () => {
                floatingText.destroy() // Destroy the text after the animation
                this.activeFloatingTexts = this.activeFloatingTexts.filter(
                    (text) => text !== floatingText,
                ) // Remove from active list
            },
        })
    }

    // Method to add resources
    addToInventory(resource: string, amount: number): void {
        if (this.inventory[resource]) {
            this.inventory[resource].count += amount
            this.inventory[resource].textObject!.setText(
                `${this.inventory[resource].count}`,
            )

            // Show floating text at the cursor
            const res_name = this.inventory[resource].name
            this.displayFloatingTextAtCursor("+" + amount + " " + res_name)
        }

        let id = -1;
        for (const key in ResourceMap) {
            if (resource == ResourceMap[key]) {
                id = parseInt(key)
            }
        }

        const res = {
            resource_type_id: id,
            quantity: this.inventory[resource].count,
        } as ResourceBase;
        let data = []
        data.push(res)
        let body = {
            requestBody: data
        } as TDataSetResources;
        ResourcesService.setResources(body);
    }

    // Method to deduct resources
    deductFromInventory(resource: string, amount: number): boolean {
        if (this.inventory[resource] && this.inventory[resource].count >= amount) {
            this.inventory[resource].count -= amount
            this.inventory[resource].textObject!.setText(
                `${this.inventory[resource].count}`,
            )

            let id = -1;
            for (const key in ResourceMap) {
                if (resource == ResourceMap[key]) {
                    id = parseInt(key)
                }
            }
            const res = {
                resource_type_id: id,
                quantity: this.inventory[resource].count,
            } as ResourceBase;
            let data = []
            data.push(res)
            let body = {
                requestBody: data

            } as TDataSetResources;

            ResourcesService.setResources(body);

            // Show floating text at the cursor
            const res_name = this.inventory[resource].name
            this.displayFloatingTextAtCursor("-" + amount + " " + res_name)

            return true
        }
        return false
    }
}
