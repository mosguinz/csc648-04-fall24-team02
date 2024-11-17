import { ResourceBase } from "../../client";
import { ResourcesService } from "../../client";
import { TDataSetResources } from "../../client";
import { TEXT_STYLE_SMALL } from '../../game/config';

export const GameData = {
    resources: [] as ResourceBase[],
};

// Global Inventory
export const inventory: {
    [key: number]: {
        count: number;
        name: string;
        textObject: Phaser.GameObjects.Text | null; // Add textObject for Phaser integration
    };
} = {
    1: { count: 0, name: "Iron Ore", textObject: null },
    2: { count: 0, name: "Copper Ore", textObject: null },
    3: { count: 0, name: "Rock", textObject: null },
    4: { count: 0, name: "Iron Ingot", textObject: null },
    5: { count: 0, name: "Copper Ingot", textObject: null },
    6: { count: 0, name: "Concrete", textObject: null },
    7: { count: 0, name: "Iron Plate", textObject: null },
    8: { count: 0, name: "Copper Plate", textObject: null },
    9: { count: 0, name: "Iron Rod", textObject: null },
    10: { count: 0, name: "Screws", textObject: null },
    11: { count: 0, name: "Wire", textObject: null },
    12: { count: 0, name: "Cable", textObject: null },
};

export async function populateInventory(): Promise<void> {
    // Fetch resources from API
    GameData.resources = await ResourcesService.readResources();

    // Populate the inventory with the fetched resources
    for (const resource of GameData.resources) {
        if (inventory[resource.resource_type_id]) {
            inventory[resource.resource_type_id].count = resource.quantity;
        }

        inventory[resource.resource_type_id].textObject
            ?.setText(`${inventory[resource.resource_type_id].count}`)
            .setOrigin(1, 1)
            .setColor("black")
            .setFontSize(28)
            .setStyle(TEXT_STYLE_SMALL);
    }
}

export function addResource(key: number, amount: number): void {
    if (inventory[key]) {
        inventory[key].count += amount;
        saveInventory();
    }
}

export function removeResource(key: number, amount: number): void {
    if (inventory[key]) {
        // Prevent negative values
        inventory[key].count = Math.max(0, inventory[key].count - amount);
    }
}

export function getResourceCount(key: number): number {
    return inventory[key]?.count || 0;
}

export function saveInventory() {
    const data: ResourceBase[] = Object.entries(inventory).map(([key, value]) => ({
        resource_type_id: Number(key),
        quantity: value.count,
    }));

    const body: TDataSetResources = {
        requestBody: data,
    };

    ResourcesService.setResources(body)
}
