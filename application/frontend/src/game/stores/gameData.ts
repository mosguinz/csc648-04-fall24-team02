import { ResourceBase, UserMiner } from "../../client";
import { ResourcesService, FacilitiesService } from "../../client";

export const GameData = {
    resources: [] as ResourceBase[],
    eventEmitter: new Phaser.Events.EventEmitter(), // Event emitter to notify updates for inventory and miners

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
        GameData.eventEmitter.emit('update-inventory');
        GameData.saveInventory();
    },

    removeResource(key: number, amount: number): void {
        if (GameData.resources[key]) {
            GameData.resources[key].quantity = Math.max(0, GameData.resources[key].quantity - amount);
            GameData.eventEmitter.emit('inventory-changed');
            GameData.eventEmitter.emit('update-inventory');
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
    },

    miners: [] as UserMiner[],
    nextMinerId: 1,

    async populateMiners() {
        GameData.miners = await FacilitiesService.readMiners();

        // Find the next available miner ID
        const maxId = GameData.miners.reduce((max, miner) => {
            return miner.id ? Math.max(max, parseInt(miner.id, 10)) : max;
        }, 0);
        GameData.nextMinerId = maxId + 1;
    },

    saveMiners() {
        const data = {
            requestBody: GameData.miners,
        };
        FacilitiesService.setMiners(data);
    },
};