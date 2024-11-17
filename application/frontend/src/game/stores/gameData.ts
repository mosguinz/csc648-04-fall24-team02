import { ResourceBase } from "../../client";
import { ResourcesService } from "../../client";

export const GameData = {
    resources: [] as ResourceBase[],
    async populateInventory() {
        GameData.resources = await ResourcesService.readResources();
    },

    addResource(key: number, amount: number): void {
        let resource = GameData.resources.find(res => res.resource_type_id === key);

        if (resource) {
            resource.quantity += amount;
        } else {
            resource = { resource_type_id: key, quantity: amount };
            GameData.resources.push(resource);
        }
        GameData.saveInventory();
    },

    removeResource(key: number, amount: number): void {
        if (GameData.resources[key]) {
            GameData.resources[key].quantity = Math.max(0, GameData.resources[key].quantity - amount);
            GameData.saveInventory();
        }
    },

    getResourceCount(key: number): number {
        return GameData.resources[key]?.quantity || 0;
    },

    saveInventory() {
        const data = {
            requestBody: GameData.resources,
        };
        ResourcesService.setResources(data);
    }
};