//automated smelter (new)

import { SmelterInstance } from "./Smelter" // Import SmelterInstance if in a separate file

export default class RunningSmeltersScene extends Phaser.Scene {
  private smelterContainers: Phaser.GameObjects.Container[] = []
  private smeltersPerPage = 3
  private currentPage = 0
  private totalSmelters = 0
  private leftArrow!: Phaser.GameObjects.Text
  private rightArrow!: Phaser.GameObjects.Text

  constructor() {
    super({ key: "RunningSmeltersScene" })
  }

  create() {
    const background = this.add.rectangle(645, 270, 900, 550, 0x333333)
    background.setInteractive()

    this.add.text(420, 50, "Active Smelters", { fontSize: "40px", color: "#ffffff" })
    const closeButton = this.add.text(1020, 60, "X", { fontSize: "40px", color: "#ffffff" }).setInteractive()
    closeButton.on("pointerdown", () => this.scene.stop("RunningSmeltersScene"))

    // Arrows for pagination
    this.leftArrow = this.add.text(210, 470, "<", { fontSize: "90px", color: "#ffffff" }).setInteractive()
    this.leftArrow.on("pointerdown", () => this.switchPage(-1))

    this.rightArrow = this.add.text(1040, 470, ">", { fontSize: "90px", color: "#ffffff" }).setInteractive()
    this.rightArrow.on("pointerdown", () => this.switchPage(1))

    // Listen for smelter updates
    const smelterScene = this.scene.get("Smelter") as Phaser.Scene
    smelterScene.events.on("smelterAdded", this.updateDisplay, this)
    smelterScene.events.on("smelterRemoved", this.updateDisplay, this)

    this.updateDisplay()
  }

  // Function to retrieve smelters from Smelter scene
  getSmelters(): SmelterInstance[] {
    const smelterScene = this.scene.get("Smelter") as any
    return smelterScene.smelters as SmelterInstance[] || [] // Ensure return is cast to SmelterInstance[]
  }

  // Update the display of smelters based on the current page
  updateDisplay() {
    for (const container of this.smelterContainers) container.destroy()
    this.smelterContainers = []

    const smelters = this.getSmelters()
    this.totalSmelters = smelters.length

    const startIndex = this.currentPage * this.smeltersPerPage
    const endIndex = Math.min(startIndex + this.smeltersPerPage, smelters.length)

    smelters.slice(startIndex, endIndex).forEach((smelter: SmelterInstance, index: number) => {
      const container = this.add.container(400, 150 + index * 120) // Dynamic placement
      const textureKey = smelter.resource === "rock" ? "rock_block" : `${smelter.resource}_ore_block`;
      const nodeImage = this.add.image(0, 0, textureKey).setScale(4);
      const smeltingText = this.add.text(50, 0, `Smelting ${smelter.resource} ore...`, {
        fontSize: "20px",
        color: "#ffffff",
      })

      container.add([nodeImage, smeltingText])
      this.smelterContainers.push(container)
    })

    this.updateArrowVisibility()
  }

  // Pagination controls
  switchPage(direction: number) {
    this.currentPage += direction
    const maxPage = Math.floor(this.totalSmelters / this.smeltersPerPage)
    this.currentPage = Phaser.Math.Clamp(this.currentPage, 0, maxPage)
    this.updateDisplay()
  }

  updateArrowVisibility() {
    const maxPage = Math.floor((this.totalSmelters - 1) / this.smeltersPerPage)
    this.leftArrow.setVisible(this.currentPage > 0)
    this.rightArrow.setVisible(this.currentPage < maxPage)
  }
}
