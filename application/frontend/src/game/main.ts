import { AUTO, Game } from "phaser"
import CraftingMenu from "./scenes/CraftingMenu"
import InventoryMenu from "./scenes/InventoryMenu"
import MainMenu from "./scenes/MainMenu"
import MinerPlacementScene from "./scenes/MinerPlacementScene"
import RunningSmeltersScene from "./scenes/RunningSmeltersScene"
import SmelterPlacementScene from "./scenes/SmelterPlacementScene"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1280, // Set width to the current window width
  height: 720,
  pixelArt: true,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [
    MainMenu,
    CraftingMenu,
    InventoryMenu,
    MinerPlacementScene,
    SmelterPlacementScene,
    RunningSmeltersScene,
  ],
}

const StartGame = (parent: string) => {
  const game = new Game({ ...config, parent })
  // const InventoryMenuScene = game.scene.getScene("InventoryMenu") as InventoryMenu

  return game
}

export default StartGame
