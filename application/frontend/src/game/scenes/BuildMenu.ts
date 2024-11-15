import Phaser from "phaser"

export default class BuildMenu extends Phaser.Scene {
  private readonly UI_POSITION_X = 1142
  private readonly LIST_POSITION_X = 1190
  private readonly TEXT_POSITION_X = 1188
  private readonly SCALE = 3

  constructor() {
    super("BuildMenu")
  }

  create(): void {
    this.createBackground()
    this.createTitleText()
    this.createUIElement("smelter", 71, "Smelter", "SmelterPlacementScene", "RunningSmeltersScene")
    this.createUIElement("crafter", 141, "Crafter", "CrafterPlacementScene", "RunningCraftersScene")
    this.createUIElement("miner", 211, "Miner", "MinerPlacementScene")
  }

  // Helper function to create the background
  private createBackground(): void {
    const background = this.add.rectangle(1195, 290, 128, 128)
    background.setScale(1.45, 4.65)
    background.setFillStyle(0x919191)
    background.postFX?.addShadow(1, 1, 0.1, 1, 0, 4, 1)
  }

  // Helper function to create the title text
  private createTitleText(): void {
    const buildUIName = this.add.text(1156, 12, "Build", {
      color: "#000000",
      fontSize: "24px",
    })
    buildUIName.setScale(1.5)
  }

  // Helper function to create UI elements (smelter, crafter, miner)
  private createUIElement(
    textureKey: string,
    yPosition: number,
    name: string,
    placementScene: string,
    listScene?: string
  ): void {
    // Create the main image
    const element = this.add.image(this.UI_POSITION_X, yPosition, textureKey)
    element.setScale(this.SCALE)
    element.setInteractive()
    element.on("pointerdown", () => {
      console.log(`${name} clicked`)
      this.scene.launch(placementScene)
    })

    // Create the list button if provided
    if (listScene) {
      const listButton = this.add.text(this.LIST_POSITION_X, yPosition + 6, "List").setInteractive()
      listButton.on("pointerdown", () => {
        this.scene.launch(listScene)
      })
    }

    // Create the name text
    this.add.text(this.TEXT_POSITION_X, yPosition - 21, name)
  }
}
