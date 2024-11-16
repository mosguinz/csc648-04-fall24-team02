import Phaser from "phaser";
import { ResourcesService, ResourceBase } from "../../client";
import { ResourceMap } from "../data/Constants";

export default class InventoryMenu extends Phaser.Scene {
    public inventory: Record<string, { count: number; textObject: Phaser.GameObjects.Text | null; name: string }> = {};
    private floatingTextOffsetY = 20;
    private activeFloatingTexts: Phaser.GameObjects.Text[] = [];
   

    constructor() {
        super({ key: "InventoryMenu" });
        this.initializeInventory();
        this.syncWithBackend();
    }

    // Initialize inventory from ResourceMap
    private initializeInventory() {
        for (const key in ResourceMap) {
            const resourceName = ResourceMap[key];
            this.inventory[resourceName] = {
                count: 0,
                textObject: null,
                name: resourceName.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
            };
        }
    }

  // Sync inventory with backend
private async syncWithBackend() {
    const response = await ResourcesService.readResources();

    // Replacing forEach with for...of loop
    for (const resource of response) {
        const key = ResourceMap[resource.resource_type_id];
        if (this.inventory[key]) {
            this.inventory[key].count = resource.quantity;
        }
    }
}


    create() {
        this.createUI();
        this.populateInventoryUI();
    }

    // Create UI elements
    private createUI() {
        const rectangle = this.add.rectangle(91, 296, 128, 128)
            .setScale(1.447, 4.65)
            .setFillStyle(9539985);
        rectangle.postFX!.addShadow(-1, 1, 0.1, 1, 0, 2, 1);

        this.add.text(29, 16, "Inventory", { fontSize: "24px", color: "#000000" });
    }

    // Populate inventory UI with resource elements
    private populateInventoryUI() {
        let offset = 0;
        for (const key in ResourceMap) {
            const resource = { resource_type_id: parseInt(key), quantity: 0 } as ResourceBase;
            this.addResource(resource, 25, 79 + 40 * offset);
            offset++;
        }
        this.updateInventoryDisplay();
    }

    // Helper function to add a resource (image, name, and count text)
    private addResource(resource: ResourceBase, xCord: number, yCord: number) {
        const key = ResourceMap[resource.resource_type_id];
        const imgX = xCord;
        const imgY = yCord;
        const nameX = xCord + 26;
        const nameY = yCord - 18;
        const countX = xCord + 26;
        const countY = yCord + 2;
        const text = this.inventory[key].name + ":";

        this.add.image(imgX, imgY, key).setScale(2);
        this.add.text(nameX, nameY, text, { fontSize: "16px" });
        this.inventory[key].textObject = this.add.text(countX, countY, `${this.inventory[key].count}`, { fontSize: "16px" });
    }

    // Update the displayed counts for the inventory
    updateInventoryDisplay() {
        for (const key in this.inventory) {
            const item = this.inventory[key];
            item.textObject?.setText(`${item.count}`);
        }
    }

    // Display floating text at cursor
    displayFloatingTextAtCursor(text: string) {
        const pointer = this.input.activePointer;
        const yOffset = this.activeFloatingTexts.length * this.floatingTextOffsetY;
        const floatingText = this.add.text(pointer.worldX, pointer.worldY - yOffset, text, { fontSize: "16px", color: "#ffffff" });

        this.activeFloatingTexts.push(floatingText);

        this.tweens.add({
            targets: floatingText,
            y: pointer.worldY - 50 - yOffset,
            alpha: 0,
            duration: 1000,
            ease: "Power1",
            onComplete: () => {
                floatingText.destroy();
                this.activeFloatingTexts = this.activeFloatingTexts.filter((text) => text !== floatingText);
            },
        });
    }

    // Unified method for updating inventory counts and syncing with backend
    private updateResourceCount(resource: string, amount: number) {
        if (!this.inventory[resource]) return;

        this.inventory[resource].count += amount;
        this.inventory[resource].textObject?.setText(`${this.inventory[resource].count}`);

        const id = Object.entries(ResourceMap).find(([_, value]) => value === resource)?.[0] ?? "-1";

        const data = [{ resource_type_id: parseInt(id), quantity: this.inventory[resource].count }] as ResourceBase[];

        ResourcesService.setResources({ requestBody: data });
    }

    // Method to add resources
    addToInventory(resource: string, amount: number) {
        this.updateResourceCount(resource, amount);
        this.displayFloatingTextAtCursor(`+${amount} ${this.inventory[resource]?.name}`);
    }

    // Method to deduct resources
    deductFromInventory(resource: string, amount: number): boolean {
        if (this.inventory[resource]?.count >= amount) {
            this.updateResourceCount(resource, -amount);
            this.displayFloatingTextAtCursor(`-${amount} ${this.inventory[resource]?.name}`);
            return true;
        }
        return false;
    }
}
