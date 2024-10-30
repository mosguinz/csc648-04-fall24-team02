
import Phaser from "phaser"

export default class BuildMenu extends Phaser.Scene {

  constructor() {
    super("BuildMenu")
  }

  create(): void {
    // rectangle_1
    const background = this.add.rectangle(1195, 290, 128, 128)
    background.scaleX = 1.447046084870738
    background.scaleY = 4.650162957270586
    background.isFilled = true
    background.fillColor = 9539985

    // shadowFx_1
    background.postFX!.addShadow(1, 1, 0.1, 1, 0, 4, 1)

    // build_UI_name
    const build_UI_name = this.add.text(1156, 12, "", {})
    build_UI_name.scaleX = 1.5
    build_UI_name.scaleY = 1.5
    build_UI_name.text = "Build"
    build_UI_name.setStyle({ color: "#000000ff" })

    // smelter
    const smelter = this.add.image(1142, 71, "smelter")
    smelter.scaleX = 3
    smelter.scaleY = 3
    smelter.setInteractive()
    smelter.on("pointerdown", () => {
      this.scene.launch("SmelterPlacementScene") // Open smelter placement window
    })
    const smelterList = this.add.text(1190, 77, "List").setInteractive()
    smelterList.setInteractive()
    smelterList.on("pointerdown", () => {
      this.scene.launch("RunningSmeltersScene")
    })

    // crafter
    const crafter = this.add.image(1142, 141, "crafter")
    crafter.scaleX = 3
    crafter.scaleY = 3
    crafter.setInteractive()
    crafter.on("pointerdown", () => {
      console.log("crafter clicked")
      this.scene.launch("CrafterPlacementScene")
    })
    const crafterList = this.add.text(1190, 147, "List").setInteractive()
    crafterList.on("pointerdown", () => {
      this.scene.launch("RunningCraftersScene")
    })

    // miner
    const miner = this.add.image(1142, 211, "miner")
    miner.scaleX = 3
    miner.scaleY = 3
    miner.setInteractive()
    miner.on("pointerdown", () => {
      this.scene.launch("MinerPlacementScene")
    })

    // smelter_name
    const smelter_name = this.add.text(1188, 50, "", {})
    smelter_name.text = "Smelter"

    // crafter_name
    const crafter_name = this.add.text(1188, 120, "", {})
    crafter_name.text = "Crafter"

    // miner_name
    const miner_name = this.add.text(1188, 191, "", {})
    miner_name.text = "Miner"
  }
}
