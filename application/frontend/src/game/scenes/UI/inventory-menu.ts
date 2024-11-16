import Phaser from "phaser";
import { TEXT_STYLE } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../data/constants';

export default class InventoryMenu extends Phaser.Scene {

    constructor() {
        super({
            key: 'InventoryMenu',
        });
    }

    create() {
        // Inventory dimensions
        const INVENTORY_WIDTH = GAME_WIDTH / 2.8;
        const INVENTORY_HEIGHT = GAME_HEIGHT / 1.5;

        // Inventory slots constants
        const SLOT_SIZE = 100;
        const SLOT_TEXT_SIZE = 40;
        const SLOT_MARGIN_X = 15;
        const SLOT_MARGIN_Y = 90;
        const SLOT_ROWS = 3;
        const SLOT_COLS = 5;
        const SLOT_X = INVENTORY_WIDTH / 8;
        const SLOT_Y = INVENTORY_HEIGHT / 6;

        // Inventory background + container
        this.add.nineslice(GAME_WIDTH / 16, GAME_HEIGHT / 9, 'inventory_panel', 0,
            INVENTORY_WIDTH, INVENTORY_HEIGHT, NSP, NSP, NSP, NSP).setOrigin(0, 0).setTint(0x707070);

        const inventoryContainer = this.add.container(GAME_WIDTH / 16, GAME_HEIGHT / 9);

        // Inventory text
        inventoryContainer.add(
            this.add.text(INVENTORY_WIDTH / 2, INVENTORY_HEIGHT / 15, "INVENTORY", TEXT_STYLE)
                .setOrigin(.5, .5).setColor("black").setFontSize(64)
        );

        // Inventory dividers
        inventoryContainer.add(
            this.add.image(164, INVENTORY_HEIGHT / 15 + 7, 'inventory_divider')
                .setOrigin(.5, .5).setTint(0x000000).setScale(.75, 1)
        );
        inventoryContainer.add(
            this.add.image(INVENTORY_WIDTH - 160, INVENTORY_HEIGHT / 15 + 7, 'inventory_divider')
                .setOrigin(.5, .5).setTint(0x000000).setScale(-.75, 1)
        );

        // Close button
        const closeButton = this.add.image(INVENTORY_WIDTH -50, 50, 'close_button').setOrigin(.5, .5).setScale(3).setInteractive()
        inventoryContainer.add(closeButton);
        closeButton.on(Phaser.Input.Events.POINTER_OVER, () => {
            closeButton.setTint(0xff0000);
        });
        closeButton.on(Phaser.Input.Events.POINTER_OUT, () => {
            closeButton.clearTint();
        });
        closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.stop('InventoryMenu');
        });


        // Inventory slots
        for (let i = 0; i < SLOT_ROWS; i++) {
            for (let j = 0; j < SLOT_COLS; j++) {
                const slot = this.add.nineslice(SLOT_X + j * (SLOT_SIZE + SLOT_MARGIN_X), SLOT_Y + i * (SLOT_SIZE + SLOT_MARGIN_Y),
                    'inventory_slot', 0, SLOT_SIZE, SLOT_SIZE, NSP, NSP, NSP, NSP).setOrigin(0, 0);
                const slotTextContainer = this.add.nineslice(SLOT_X + j * (SLOT_SIZE + SLOT_MARGIN_X), SLOT_Y + i * (SLOT_SIZE + SLOT_MARGIN_Y) + SLOT_SIZE,
                    'inventory_slot', 0, SLOT_SIZE, SLOT_TEXT_SIZE, 10, 10, 10, 10).setOrigin(0, 0);

                inventoryContainer.add(slot);
                inventoryContainer.add(slotTextContainer);
            }
        }
    }

    // #fillInventory() {

    // }


}