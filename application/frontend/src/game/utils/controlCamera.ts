import { cursorPosition } from "../hooks/cursor";
import { GAME_WIDTH, GAME_HEIGHT } from "../stores/constants";

export function controlCamera(camera: Phaser.Cameras.Scene2D.Camera) {
    const edgeThreshold = 50;
    const panSpeed = 3;
    
    // Cursor position
    const pointer = cursorPosition;

    // Check cursor position and move camera
    if (pointer.x < edgeThreshold) {
        // Move left
        camera.scrollX -= panSpeed;
    } else if (pointer.x > GAME_WIDTH - edgeThreshold) {
        // Move right
        camera.scrollX += panSpeed;
    }

    if (pointer.y < edgeThreshold) {
        // Move up
        camera.scrollY -= panSpeed;
    } else if (pointer.y > GAME_HEIGHT - edgeThreshold) {
        // Move down
        camera.scrollY += panSpeed;
    }
}