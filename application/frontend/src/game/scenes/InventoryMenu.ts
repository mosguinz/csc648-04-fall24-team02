import Phaser from "phaser"
import { ResourcesService, ResourceBase, TDataSetResources } from "../../client";

export default class InventoryMenu extends Phaser.Scene {
    public inventory: {
        [key: string]: { count: number; textObject: Phaser.GameObjects.Text | null }
    } = {
            iron_ore: { count: 0, textObject: null },
            copper_ore: { count: 0, textObject: null },
            rock: { count: 0, textObject: null },
            iron_ingot: { count: 0, textObject: null },
            copper_ingot: { count: 0, textObject: null },
            concrete: { count: 0, textObject: null },
            iron_plate: { count: 0, textObject: null },
            copper_plate: { count: 0, textObject: null },
            iron_rod: { count: 0, textObject: null },
            screws: { count: 0, textObject: null },
            wire: { count: 0, textObject: null },
            cable: { count: 0, textObject: null },
        }


    public itemNames: { [key: string]: string } = {
        iron_ore: "Iron Ore",
        copper_ore: "Copper Ore",
        rock: "Rock",
        iron_ingot: "Iron Ingot",
        copper_ingot: "Copper Ingot",
        concrete: "Concrete",
        iron_plate: "Iron Plate",
        copper_plate: "Copper Plate",
        iron_rod: "Iron Rod",
        screws: "Screws",
        wire: "Wire",
        cable: "Cable",
        reinforced_iron_plate: "Reinforced Iron Plate",
    }

    private floatingTextOffsetY = 20 // Y offset for overlapping texts
    private activeFloatingTexts: Phaser.GameObjects.Text[] = [] // Store active floating texts to manage overlaps

    constructor() {
        super({ key: "InventoryMenu" })
        // TODO: Properly add syncing with the backend
        const resourceMap = ["iron_ore",
            "copper_ore",
            "rock",
            "iron_ingot",
            "copper_ingot",
            "concrete",
            "iron_plate",
            "copper_plate",
            "iron_rod",
            "screws",
            "wire",
            "cable",]

        ResourcesService.readResources().then((response) => {
            for (const resource of response) {
                const key = resourceMap[resource.resource_type_id - 1];
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

        // Add all resources with images, names, and counters

        // Iron Ore
        this.addResource("iron_ore", "Iron Ore:", 25, 79, 51, 62, 51, 82)

        // Copper Ore
        this.addResource("copper_ore", "Copper Ore:", 25, 119, 51, 102, 51, 122)

        // Rock
        this.addResource("rock", "Rock:", 25, 159, 51, 142, 51, 162)

        // Iron Ingot
        this.addResource("iron_ingot", "Iron Ingot:", 25, 199, 51, 182, 51, 202)

        // Copper Ingot
        this.addResource("copper_ingot", "Copper Ingot:", 25, 239, 51, 221, 51, 241)

        // Concrete
        this.addResource("concrete", "Concrete:", 25, 279, 51, 261, 51, 281)

        // Iron Plate
        this.addResource("iron_plate", "Iron Plate:", 25, 319, 51, 301, 51, 321)

        // Copper Plate
        this.addResource("copper_plate", "Copper Plate:", 25, 359, 51, 341, 51, 361)

        // Iron Rod
        this.addResource("iron_rod", "Iron Rod:", 25, 399, 51, 381, 51, 401)

        // Screws
        this.addResource("screws", "Screws:", 25, 439, 51, 421, 51, 441)

        // Wire
        this.addResource("wire", "Wire:", 25, 479, 51, 461, 51, 481)

        // Cable
        this.addResource("cable", "Cable:", 25, 519, 51, 501, 51, 521)

        // console.log("Pre-requesting resources");
        // const token =  localStorage.getItem("access_token");

        // fetch(`/api/v1/resources`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Bearer ${token}`, // JWT auth example
        //     }
        // }).then(response => { 
        //     console.log(JSON.stringify(response));
        //     console.log("Post-requesting resources");
        //  });
        const resourceMap = ["iron_ore",
            "copper_ore",
            "rock",
            "iron_ingot",
            "copper_ingot",
            "concrete",
            "iron_plate",
            "copper_plate",
            "iron_rod",
            "screws",
            "wire",
            "cable",]

        ResourcesService.readResources().then((response) => {
            for (const resource of response) {
                const key = resourceMap[resource.resource_type_id - 1];
                this.inventory[key].count = resource.quantity;
            }
        });
    }

    // Helper function to add a resource (image, name, and count text)
    private addResource(
        key: string,
        name: string,
        imgX: number,
        imgY: number,
        nameX: number,
        nameY: number,
        countX: number,
        countY: number,
    ) {
        this.add.image(imgX, imgY, key).setScale(2)
        this.add.text(nameX, nameY, name, { fontSize: "16px" })
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

    displayFloatingTextAtCursor(resource: string, amount: number) {
        const pointer = this.input.activePointer // Get the current pointer (cursor) position

        // Calculate the Y position offset to prevent overlap
        const yOffset = this.activeFloatingTexts.length * this.floatingTextOffsetY

        // Get the display name from the mapping
        const displayName = this.itemNames[resource] || resource

        // Create the text content (e.g., "+1 Iron Ore")
        const textContent = `${amount > 0 ? "+" : ""}${amount} ${displayName}`

        // Create the floating text near the cursor
        const floatingText = this.add.text(
            pointer.worldX,
            pointer.worldY - yOffset,
            textContent,
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
            this.displayFloatingTextAtCursor(resource, amount)
        }
        const resourceMap = ["iron_ore",
            "copper_ore",
            "rock",
            "iron_ingot",
            "copper_ingot",
            "concrete",
            "iron_plate",
            "copper_plate",
            "iron_rod",
            "screws",
            "wire",
            "cable",]

        const id = resourceMap.indexOf(resource) + 1;
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
        // const token =  localStorage.getItem("access_token");
        // fetch(`/api/v1/resources`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`, // JWT auth example
        //     },
        //     body: JSON.stringify(data)
        // }).then(response => { 
        //     console.log(JSON.stringify(response));
        //     console.log("Post-requesting resources");
        //  });
    }

    // Method to deduct resources
    deductFromInventory(resource: string, amount: number): boolean {
        if (this.inventory[resource] && this.inventory[resource].count >= amount) {
            this.inventory[resource].count -= amount
            this.inventory[resource].textObject!.setText(
                `${this.inventory[resource].count}`,
            )
            const resourceMap = ["iron_ore",
                "copper_ore",
                "rock",
                "iron_ingot",
                "copper_ingot",
                "concrete",
                "iron_plate",
                "copper_plate",
                "iron_rod",
                "screws",
                "wire",
                "cable",]
    
            const id = resourceMap.indexOf(resource) + 1;
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
            this.displayFloatingTextAtCursor(resource, -amount)

            return true
        }
        return false
    }
}
