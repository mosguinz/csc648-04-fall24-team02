import Phaser from "phaser";
import { GameData } from "../stores/gameData";
import { UserMiner } from "../../client";

export default class Miner extends Phaser.Scene {
    private minerTimers: { [key: string]: Phaser.Time.TimerEvent } = {};

    constructor() {
        super({ key: "Miner"});
    }

    create()  {
        GameData.populateMiners().then(() => {
            this.startMining();
        });

        // Listen for miner updates
        this.events.on("add-miner", (newMiner: UserMiner) => {
            console.log("New Miner Added:", newMiner);
            this.addMiner(newMiner);
        });
    }

    private startMining() {
        for (const miner of GameData.miners) {
            this.startMinerTimer(miner);
        }
    }

    private addMiner(miner: UserMiner) {
        console.log(`Adding miner ${miner.id}`);
        if (GameData.miners.find((m) => m.id === miner.id)) {
            console.warn(`Miner already exists.`);
            return;
        }

        GameData.miners.push(miner);
        GameData.nextMinerId++;
        GameData.saveMiners();

        this.startMinerTimer(miner);

    }

    private startMinerTimer(miner: UserMiner) {
        if (this.minerTimers[miner.id || ""]) {
            return;
        }

        this.minerTimers[miner.id || ""] = this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                if (miner.recipe_id) {
                    console.log(`Mining with miner ${miner.id}`);
                    GameData.addResource(miner.recipe_id, 1);
                }
            },
        });
    }
}