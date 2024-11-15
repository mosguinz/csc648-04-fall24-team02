import { Game } from 'phaser';
import * as Scenes from './scenes';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    pixelArt: true,
    scale: {
        parent: 'game-container',
        width: 1024,
        height: 576,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#000000',
    scene: [
        Scenes.TestScene,
      ],
  }

const StartGame = (parent: string) => {
    const newGame = new Game({ ...config, parent })
    return newGame
  }
  
  export default StartGame