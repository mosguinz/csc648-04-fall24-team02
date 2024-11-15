import { Game } from 'phaser';
import * as Scenes from './scenes';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    pixelArt: true,
    scale: {
        parent: 'game-container',
        width: 2200,
        height: 1080,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#000000',
    // Add new scenes here
    scene: [
        Scenes.PreloadScene,
        Scenes.TestScene,
      ],
  }

const StartGame = (parent: string) => {
    const newGame = new Game({ ...config, parent })
    return newGame
  }
  
  export default StartGame