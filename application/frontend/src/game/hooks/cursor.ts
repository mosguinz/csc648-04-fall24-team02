import { position } from "../stores/constants";

export let cursorPosition: position = { x: 0, y: 0 };

export default class Cursor extends Phaser.Scene {

    constructor() {
        super({ key: "Cursor" });
    }

    create() {
        this.time.addEvent({
            delay: 16,
            loop: true,
            callback: () => {
                // Cursor position
                cursorPosition = { x: this.input.activePointer.x, y: this.input.activePointer.y };
            }
        });
    };
}
