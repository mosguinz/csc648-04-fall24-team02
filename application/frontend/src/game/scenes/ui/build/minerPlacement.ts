import Phaser from "phaser";
import { TEXT_STYLE, TEXT_STYLE_SMALL } from '../../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../../stores/constants';
import { GameData } from "../../../stores/gameData";
import { UserMiner } from "../../../../client";

export default class MinerPlacementMenu extends Phaser.Scene {

    private MINER_PLACEMENT_WIDTH = GAME_WIDTH / 3;
    private MINER_PLACEMENT_HEIGHT = GAME_HEIGHT / 5;

    constructor() {
        super({
            key: 'MinerPlacementMenu',
        });
    }

    create() {
        this.add.nineslice(GAME_WIDTH / 2, 0, 'inventory_panel', 0,
            this.MINER_PLACEMENT_WIDTH, this.MINER_PLACEMENT_HEIGHT, NSP, NSP, NSP, NSP).setOrigin(0.5, 0).setTint(0x707070);

        const placementContainer = this.add.container(GAME_WIDTH / 2 - this.MINER_PLACEMENT_WIDTH / 2, 0);

        // Build menu text
        placementContainer.add(
            this.add.text(this.MINER_PLACEMENT_WIDTH / 2, this.MINER_PLACEMENT_HEIGHT / 7, "HARVESTING?", TEXT_STYLE)
                .setOrigin(.5, .5).setColor("white").setFontSize(64)
        );

        // Close button
        const closeButton = this.add.image(this.MINER_PLACEMENT_WIDTH - 35, 35, 'close_button').setOrigin(.5, .5).setScale(3).setInteractive()
        placementContainer.add(closeButton);
        closeButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            closeButton.setTint(0xff0000);
        });
        closeButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            closeButton.clearTint();
        });
        closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start("GameMenu");
            this.scene.stop('MinerPlacementMenu');
        });

        // Getting the Miner scene
        const MinerScene = this.scene.get('Miner');

        // Harvest item 1
        const harvestItem1 = this.add.image(this.MINER_PLACEMENT_WIDTH / 4, this.MINER_PLACEMENT_HEIGHT / 2, '1').setOrigin(.5, .5).setScale(4).setInteractive();
        harvestItem1.on(Phaser.Input.Events.POINTER_OVER, () => {
            harvestItem1.setTint(0xFFD602);
        });
        harvestItem1.on(Phaser.Input.Events.POINTER_OUT, () => {
            harvestItem1.clearTint();
        });
        harvestItem1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            const newMiner: UserMiner = {
                id: GameData.nextMinerId.toString(),
                facility_type_id: 1,
                user_id: "12345", // TODO: Get user id from auth
                recipe_id: 1,
                status: "active",
            };
            console.log(newMiner);
            MinerScene.events.emit('add-miner', newMiner);
            this.scene.start("GameMenu");
            this.scene.stop('MinerPlacementMenu');
        });
        placementContainer.add(harvestItem1);

        // Item 2 text
        placementContainer.add(
            this.add.text(this.MINER_PLACEMENT_WIDTH / 4, this.MINER_PLACEMENT_HEIGHT / 2 + 70, "1", TEXT_STYLE_SMALL)
                .setOrigin(.5, .5).setColor("white").setFontSize(32));

        // Harvest item 2
        const harvestItem2 = this.add.image(this.MINER_PLACEMENT_WIDTH / 2, this.MINER_PLACEMENT_HEIGHT / 2, '2').setOrigin(.5, .5).setScale(4).setInteractive();
        harvestItem2.on(Phaser.Input.Events.POINTER_OVER, () => {
            harvestItem2.setTint(0xFFD602);
        });
        harvestItem2.on(Phaser.Input.Events.POINTER_OUT, () => {
            harvestItem2.clearTint();
        });
        harvestItem2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            const newMiner: UserMiner = {
                id: GameData.nextMinerId.toString(),
                facility_type_id: 1,
                user_id: "12345", // TODO: Get user id from auth
                recipe_id: 2,
                status: "active",
            };
            console.log(newMiner);
            MinerScene.events.emit('add-miner', newMiner);
            this.scene.start("GameMenu");
            this.scene.stop('MinerPlacementMenu');
        });
        placementContainer.add(harvestItem2);

        // Item 2 text
        placementContainer.add(
            this.add.text(this.MINER_PLACEMENT_WIDTH / 2, this.MINER_PLACEMENT_HEIGHT / 2 + 70, "2", TEXT_STYLE_SMALL)
                .setOrigin(.5, .5).setColor("white").setFontSize(32));

        // Harvest item 3
        const harvestItem3 = this.add.image(this.MINER_PLACEMENT_WIDTH * 3/4, this.MINER_PLACEMENT_HEIGHT / 2, '2').setOrigin(.5, .5).setScale(4).setInteractive();
        harvestItem3.on(Phaser.Input.Events.POINTER_OVER, () => {
            harvestItem3.setTint(0xFFD602);
        });
        harvestItem3.on(Phaser.Input.Events.POINTER_OUT, () => {
            harvestItem3.clearTint();
        });
        harvestItem3.on(Phaser.Input.Events.POINTER_DOWN, () => {
            const newMiner: UserMiner = {
                id: GameData.nextMinerId.toString(),
                facility_type_id: 1,
                user_id: "12345", // TODO: Get user id from auth
                recipe_id: 3,
                status: "active",
            };
            console.log(newMiner);
            MinerScene.events.emit('add-miner', newMiner);
            this.scene.start("GameMenu");
            this.scene.stop('MinerPlacementMenu');
        });
        placementContainer.add(harvestItem3);

        // Item 2 text
        placementContainer.add(
            this.add.text(this.MINER_PLACEMENT_WIDTH * 3/4, this.MINER_PLACEMENT_HEIGHT / 2 + 70, "3", TEXT_STYLE_SMALL)
                .setOrigin(.5, .5).setColor("white").setFontSize(32));

    }
}
