import { GameData } from "../stores/gameData";

export function startMining(scene: Phaser.Scene): void {
    for (const miner of GameData.miners) {
        scene.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                if (miner.recipe_id) {
                    GameData.addResource(miner.recipe_id, 1);
                }
            },
        });
    }
}