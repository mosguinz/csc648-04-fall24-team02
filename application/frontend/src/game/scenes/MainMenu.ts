import Phaser from "phaser"

export default class MainMenu extends Phaser.Scene {

  constructor() {
    super("Game")
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.pack("pack", "assets/boot-asset-pack.json")
  }

  /* START-USER-CODE */

  create() {
    this.scene.launch("BaseScene")
    this.scene.launch("CraftingMenu")
    this.scene.launch("InventoryMenu")
    this.scene.launch("BuildMenu")
    this.scene.launch("Smelter")
    this.scene.launch("Crafter")
  }
}
