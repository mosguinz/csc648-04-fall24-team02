import { ResourceBase } from "../../client";
import { ResourcesService } from "../../client";

export const GameData = {
    resources: [] as ResourceBase[],
};

export async function populateInventory(): Promise<void> {
    // Fetch resources from API
    GameData.resources = await ResourcesService.readResources();
}

export function addResource(key: number, amount: number): void {
    if (GameData.resources[key]) {
        GameData.resources[key].quantity += amount;
        saveInventory();
    }
}

export function removeResource(key: number, amount: number): void {
    if (GameData.resources[key]) {
        GameData.resources[key].quantity = Math.max(0, GameData.resources[key].quantity - amount);
        saveInventory();
    }
}

export function getResourceCount(key: number): number {
    return GameData.resources[key]?.quantity || 0;
}

export function saveInventory() {
    const data = {
        requestBody: GameData.resources,
    };
    ResourcesService.setResources(data);
}
