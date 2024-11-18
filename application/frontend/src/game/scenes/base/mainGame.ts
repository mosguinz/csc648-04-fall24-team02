import Phaser from "phaser";

export default class MainGameScene extends Phaser.Scene {

    private camera!: Phaser.Cameras.Scene2D.Camera;

    constructor() {
        super({
            key: 'MainGameScene',
        });
    }

    create() {
        this.scene.launch('GameMenu');
        this.scene.launch('Miner');
        this.scene.launch('Crafter');
        console.log('main game running');
        
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('RPG Urban Pack', 'tileset')!; // ! is used to tell TypeScript that the value will not be null
        map.createLayer('Tile Layer 1', tileset, 0, 0);
        map.createLayer('Tile Layer 2', tileset, 0, 0);
        map.createLayer('Tile Layer 3', tileset, 0, 0);
        map.createLayer('Tile Layer 4', tileset, 0, 0);
        map.createLayer('Tile Layer 5', tileset, 0, 0);
        map.createLayer('Tile Layer 6', tileset, 0, 0);
        map.createLayer('Tile Layer 7', tileset, 0, 0);
        map.createLayer('Tile Layer 8', tileset, 0, 0);
        map.createLayer('Tile Layer 9', tileset, 0, 0);

        // Set camera bounds and zoom
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.camera.setZoom(2.5);

        // Edge size in pixels where the camera starts moving
        const edgeThreshold = 50;
        const panSpeed = 3;

        // Checks cursor position
        this.time.addEvent({
            delay: 16, // Roughly 60 FPS
            loop: true,
            callback: () => {

                // Cursor position
                const pointer = this.input.activePointer;

                // Check cursor position and move camera
                if (pointer.x < edgeThreshold) {
                    // Move left
                    this.camera.scrollX -= panSpeed;
                } else if (pointer.x > this.scale.width - edgeThreshold) {
                    // Move right
                    this.camera.scrollX += panSpeed;
                }

                if (pointer.y < edgeThreshold) {
                    // Move up
                    this.camera.scrollY -= panSpeed;
                } else if (pointer.y > this.scale.height - edgeThreshold) {
                    // Move down
                    this.camera.scrollY += panSpeed;
                }
            }
        });
    }

}
