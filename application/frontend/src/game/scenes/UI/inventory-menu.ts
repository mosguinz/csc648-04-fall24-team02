import Phaser from "phaser";
// import { TEXT_STYLE } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../data/constants';

export default class InventoryMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'InventoryMenu',
        });
    }

    create() {
        this.add.nineslice(GAME_WIDTH/16, GAME_HEIGHT/9, 'inventory_panel', 0, GAME_WIDTH/2.8, GAME_HEIGHT/1.5, NSP, NSP, NSP, NSP).setOrigin(0, 0);
    }

    // #fillInventory() {

    // }

    
}