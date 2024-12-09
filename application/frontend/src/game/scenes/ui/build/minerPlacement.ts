import Phaser from "phaser";
import { TEXT_STYLE } from '../../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../../stores/constants';
import { GameData } from "../../../stores/gameData";
import { UserMiner } from "../../../../client";
import { cursorPosition } from "../../../hooks/cursor";

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
            this.MINER_PLACEMENT_WIDTH, this.MINER_PLACEMENT_HEIGHT, NSP, NSP, NSP, NSP).setOrigin(0.5, 0).setTint(0x247B7F);

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

        // Cost for buildng a miner
        const costContainer = this.add.container(cursorPosition.x, cursorPosition.y);
        costContainer.setVisible(false);

        const cost1Text = this.add.text(25, 25, `Cost: 3`, { color: '#247B7F', fontSize: '24px' })
            .setShadow(2, 2, "#000000", 2, true, true).setOrigin(0.5);

        const cost1Icon = this.add.image(90, 25, '4').setOrigin(0.5).setScale(1.5);

        const cost2 = this.add.text(69, 50, `5`, { color: '#247B7F', fontSize: '24px' })
            .setShadow(2, 2, "#000000", 2, true, true).setOrigin(0.5);

        const cost2Icon = this.add.image(90, 50, '6').setOrigin(0.5).setScale(1.5);

        costContainer.add([cost1Text, cost1Icon, cost2, cost2Icon]);

        this.time.addEvent({
            delay: 16,
            loop: true,
            callback: () => {
                // Cursor position
                costContainer.setPosition(cursorPosition.x, cursorPosition.y);
            }
        });

        // Harvest item 1
        const harvestItem1 = this.add.image(this.MINER_PLACEMENT_WIDTH / 4, this.MINER_PLACEMENT_HEIGHT / 2, '1').setOrigin(.5, .5).setScale(4).setInteractive();



        harvestItem1.on(Phaser.Input.Events.POINTER_OVER, () => {
            harvestItem1.setTint(0xFFD602);
            costContainer.setVisible(true);
        });
        harvestItem1.on(Phaser.Input.Events.POINTER_OUT, () => {
            harvestItem1.clearTint();
            costContainer.setVisible(false);
        });
        harvestItem1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (GameData.getResourceCount(4) < 3 || GameData.getResourceCount(6) < 5) {
                const text = this.add.text(cursorPosition.x, cursorPosition.y, `Not enough resources`,
                    { color: '#FF0000', fontSize: '24px' }).setShadow(2, 2, "#000000", 2, true, true).setOrigin(0.5);
                this.tweens.add({
                    targets: text,
                    y: cursorPosition.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        text.destroy();
                    }
                });
            } else {
                const newMiner: UserMiner = {
                    id: GameData.nextMinerId.toString(),
                    facility_type_id: 1,
                    user_id: "12345", // TODO: Get user id from auth
                    recipe_id: 1,
                    status: "active",
                };
                MinerScene.events.emit('add-miner', newMiner);
                this.scene.start("GameMenu");
                this.scene.stop('MinerPlacementMenu');
            }
        });
        placementContainer.add(harvestItem1);

        // Harvest item 2
        const harvestItem2 = this.add.image(this.MINER_PLACEMENT_WIDTH / 2, this.MINER_PLACEMENT_HEIGHT / 2, '2').setOrigin(.5, .5).setScale(4).setInteractive();
        harvestItem2.on(Phaser.Input.Events.POINTER_OVER, () => {
            harvestItem2.setTint(0xFFD602);
            costContainer.setVisible(true);
        });
        harvestItem2.on(Phaser.Input.Events.POINTER_OUT, () => {
            harvestItem2.clearTint();
            costContainer.setVisible(false);
        });
        harvestItem2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (GameData.getResourceCount(4) < 3 || GameData.getResourceCount(6) < 5) {
                const text = this.add.text(cursorPosition.x, cursorPosition.y, `Not enough resources`,
                    { color: '#FF0000', fontSize: '24px' }).setShadow(2, 2, "#000000", 2, true, true).setOrigin(0.5);
                this.tweens.add({
                    targets: text,
                    y: cursorPosition.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        text.destroy();
                    }
                });
            } else {
                const newMiner: UserMiner = {
                    id: GameData.nextMinerId.toString(),
                    facility_type_id: 1,
                    user_id: "12345", // TODO: Get user id from auth
                    recipe_id: 2,
                    status: "active",
                };
                MinerScene.events.emit('add-miner', newMiner);
                this.scene.start("GameMenu");
                this.scene.stop('MinerPlacementMenu');
            }
        });
        placementContainer.add(harvestItem2);

        // Harvest item 3
        const harvestItem3 = this.add.image(this.MINER_PLACEMENT_WIDTH * 3 / 4, this.MINER_PLACEMENT_HEIGHT / 2, '3').setOrigin(.5, .5).setScale(4).setInteractive();
        harvestItem3.on(Phaser.Input.Events.POINTER_OVER, () => {
            harvestItem3.setTint(0xFFD602);
            costContainer.setVisible(true);
        });
        harvestItem3.on(Phaser.Input.Events.POINTER_OUT, () => {
            harvestItem3.clearTint();
            costContainer.setVisible(false);
        });
        harvestItem3.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (GameData.getResourceCount(4) < 3 || GameData.getResourceCount(6) < 5) {
                const text = this.add.text(cursorPosition.x, cursorPosition.y, `Not enough resources`,
                    { color: '#FF0000', fontSize: '24px' }).setShadow(2, 2, "#000000", 2, true, true).setOrigin(0.5);
                this.tweens.add({
                    targets: text,
                    y: cursorPosition.y - 50,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        text.destroy();
                    }
                });
            } else {
                const newMiner: UserMiner = {
                    id: GameData.nextMinerId.toString(),
                    facility_type_id: 1,
                    user_id: "12345", // TODO: Get user id from auth
                    recipe_id: 3,
                    status: "active",
                };
                MinerScene.events.emit('add-miner', newMiner);
                this.scene.start("GameMenu");
                this.scene.stop('MinerPlacementMenu');
            }
        });
        placementContainer.add(harvestItem3);

    }
}
