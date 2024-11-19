import Phaser from "phaser";
import { TEXT_STYLE, TEXT_STYLE_SMALL } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../stores/constants';
import { GameData } from "../../stores/gameData";

export default class InventoryMenu extends Phaser.Scene {

    // Inventory dimensions
    private INVENTORY_WIDTH = GAME_WIDTH / 2.8;
    private INVENTORY_HEIGHT = GAME_HEIGHT / 1.5;


    private SLOT_SIZE = 100;
    private SLOT_MARGIN_X = 15;
    private SLOT_MARGIN_Y = 90;
    private SLOT_ROWS = 3;
    private SLOT_COLS = 5;
    private SLOT_X = this.INVENTORY_WIDTH / 8;
    private SLOT_Y = this.INVENTORY_HEIGHT / 6;

    private slotArray: Phaser.GameObjects.NineSlice[] = [];
    private itemContainer!: Phaser.GameObjects.Container;

    constructor() {
        super({
            key: 'InventoryMenu',
        });
    }

    create() {


        // Inventory background + container
        this.add.nineslice(GAME_WIDTH / 16, GAME_HEIGHT / 9, 'inventory_panel', 0,
            this.INVENTORY_WIDTH, this.INVENTORY_HEIGHT, NSP, NSP, NSP, NSP).setOrigin(0, 0).setTint(0x707070);

        const inventoryContainer = this.add.container(GAME_WIDTH / 16, GAME_HEIGHT / 9);

        this.itemContainer = this.add.container(GAME_WIDTH / 16, GAME_HEIGHT / 9);

        // Inventory text
        inventoryContainer.add(
            this.add.text(this.INVENTORY_WIDTH / 2, this.INVENTORY_HEIGHT / 15, "INVENTORY", TEXT_STYLE)
                .setOrigin(.5, .5).setColor("black").setFontSize(64).setInteractive().on('pointerdown', () => {
                    const randomNumber = Phaser.Math.Between(1, 6);
                    console.log(randomNumber);
                    GameData.addResource(randomNumber, 1);
                    this.updateInventory();
                })

        );

        // Inventory dividers
        inventoryContainer.add(
            this.add.image(160, 55, 'inventory_divider')
                .setOrigin(.5, .5).setTint(0x000000).setScale(.75, 1)
        );
        inventoryContainer.add(
            this.add.image(this.INVENTORY_WIDTH - 160, 55, 'inventory_divider')
                .setOrigin(.5, .5).setTint(0x000000).setScale(-.75, 1)
        );

        // Close button
        const closeButton = this.add.image(this.INVENTORY_WIDTH - 50, 50, 'close_button').setOrigin(.5, .5).setScale(3).setInteractive()
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
        for (let i = 0; i < this.SLOT_ROWS; i++) {
            for (let j = 0; j < this.SLOT_COLS; j++) {
                const slot = this.add.nineslice(this.SLOT_X + j * (this.SLOT_SIZE + this.SLOT_MARGIN_X), this.SLOT_Y + i * (this.SLOT_SIZE + this.SLOT_MARGIN_Y),
                    'inventory_slot', 0, this.SLOT_SIZE, this.SLOT_SIZE + 40, NSP, NSP, NSP, NSP).setOrigin(0, 0);
                inventoryContainer.add(slot);

                // Divider between icon and count
                inventoryContainer.add(this.add.rectangle(this.SLOT_X + j * (this.SLOT_SIZE + this.SLOT_MARGIN_X) + 50,
                    this.SLOT_Y + i * (this.SLOT_SIZE + this.SLOT_MARGIN_Y) + 100, this.SLOT_SIZE - 10, 4, 0x707070).setOrigin(.5, .5));
                this.slotArray.push(slot); // For placing items inside slots
            }
        }

        // Update inventory initially
        this.updateInventory();

        // Listen for inventory updates
        GameData.eventEmitter.on('update-inventory', this.updateInventory, this);

    }

    public updateInventory(){

        this.itemContainer.removeAll(true);

        // Iterate through GameData.resources and populate the inventory
        let slotIndex = 0;
        for (const resource of GameData.resources) {
            if (resource.quantity > 0 && slotIndex < this.slotArray.length) {
                const slot = this.slotArray[slotIndex];

                // Create item image
                const itemImage = this.add.image(
                    slot.x + slot.width / 2,
                    slot.y + slot.height / 2,
                    `${resource.resource_type_id}`
                ).setOrigin(0.5, 0.5).setScale(3);

                // Create item quantity text
                const itemText = this.add.text(
                    slot.x + slot.width - 10,
                    slot.y + slot.height - 10,
                    `${resource.quantity}`,
                    {
                        fontSize: '20px',
                        color: '#000000',
                    }
                ).setOrigin(1, 1).setStyle(TEXT_STYLE_SMALL);

                // Add image and text to the container
                this.itemContainer.add(itemImage);
                this.itemContainer.add(itemText);

                slotIndex++;
            }
        }
    }
}