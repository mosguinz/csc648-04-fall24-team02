import Phaser from "phaser";
import { GameData } from "../stores/gameData";
import { UserAssembler } from "../../client";

export default class Crafter extends Phaser.Scene {
    private crafterTimers: { [key: string]: Phaser.Time.TimerEvent } = {};

    constructor() {
        super({ key: "Crafter" });
    }

    create() {
        GameData.populateCrafters().then(() => {
            this.startCrafting();
        });

        // Listen for miner updates
        this.events.on("add-crafter", (newCrafter: UserAssembler) => {
            console.log("New Crafter Added:", newCrafter);
            this.addCrafter(newCrafter);
        });
    }

    private startCrafting(): void {
        for (const assembler of GameData.miners) {
            this.startCrafterTimer(assembler);
        }
    }

    private addCrafter(crafter: UserAssembler): void {
        if (GameData.crafters.find((m) => m.id === crafter.id)) {
            return;
        }

        GameData.miners.push(crafter);
        GameData.nextMinerId++;
        GameData.saveMiners();

        this.startCrafterTimer(crafter);

    }

    private startCrafterTimer(miner: UserAssembler): void {
        if (this.crafterTimers[miner.id || ""]) {
            return;
        }

        this.crafterTimers[miner.id || ""] = this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                if (miner.recipe_id) {
                    console.log(`CRAFT!`);
                }
            },
        });
    }
}