import Phaser from "phaser";
import { GameData } from "../stores/gameData";
import { UserMiner } from "../../client";

export default class Miner extends Phaser.Scene {
  private minerTimers: { [key: string]: Phaser.Time.TimerEvent } = {};

  constructor() {
    super({ key: "Miner" });
  }

  create() {
    GameData.populateMiners().then(() => {
      this.startMining();
    });

    // Listen for miner updates
    this.events.on("add-miner", (newMiner: UserMiner) => {
      this.addMiner(newMiner);
    });
  }

  private startMining() {
    for (const miner of GameData.miners) {
      this.startMinerTimer(miner);
    }
  }

  private addMiner(miner: UserMiner) {
    if (GameData.miners.find((m) => m.id === miner.id)) {
      return;
    }

    GameData.miners.push(miner);
    GameData.nextMinerId++;
    GameData.saveMiners();

    this.startMinerTimer(miner);
  }

  private startMinerTimer(miner: UserMiner) {
    this.minerTimers[miner.id || ""] = this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        if (miner.recipe_id == 1) {
          // Click on a human with miner's ID
          this.events.emit("human-clicked", miner.id);
        } else if (miner.recipe_id == 2) {
          // Click on a tree with miner's ID
          this.events.emit("tree-clicked", miner.id);
        } else if (miner.recipe_id == 3) {
          // Click on a rock with miner's ID
          this.events.emit("car-clicked", miner.id);
        }
      },
    });
  }
}
