import Phaser from 'phaser';
import { TITLE_STYLE } from '../../config';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        this.add.text(1100, 520, "CLICK AND MORTAR", TITLE_STYLE).setOrigin(0.5, 0.5);
        this.add.nineslice(1100, 720, "button1",0 , 550, 120, 32, 32, 32, 32).setOrigin(0.5, 0.5).setTint(0xEF9DE9);


        
    }
}