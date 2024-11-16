import Phaser from "phaser";
import { TEXT_STYLE} from '../../config';

export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainGameScene',
        });
    }

    create() {
        this.add.text(1100, 390, "GAME!", TEXT_STYLE).setOrigin(0.5, 0.5).setFontSize(128);
    }
}
