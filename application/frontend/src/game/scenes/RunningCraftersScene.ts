//automated crafter (new)

import Phaser from 'phaser'
import { CrafterInstance } from './Crafter' // Import CrafterInstance if defined in Crafter

export default class RunningCraftersScene extends Phaser.Scene {
  private crafterContainers: Phaser.GameObjects.Container[] = []
  private craftersPerPage = 3
  private currentPage = 0
  private totalCrafters = 0
  private leftArrow!: Phaser.GameObjects.Text
  private rightArrow!: Phaser.GameObjects.Text

  constructor() {
    super({ key: "RunningCraftersScene" })
  }

  create() {
    const background = this.add.rectangle(645, 270, 900, 550, 0x333333)
    background.setInteractive()

    this.add.text(420, 50, "Active Crafters", { fontSize: "40px", color: "#ffffff" })
    const closeButton = this.add.text(1020, 60, "X", { fontSize: "40px", color: "#ffffff" }).setInteractive()
    closeButton.on("pointerdown", () => this.scene.stop("RunningCraftersScene"))

    // Pagination arrows
    this.leftArrow = this.add.text(210, 470, "<", { fontSize: "90px", color: "#ffffff" }).setInteractive()
    this.leftArrow.on("pointerdown", () => this.switchPage(-1))

    this.rightArrow = this.add.text(1040, 470, ">", { fontSize: "90px", color: "#ffffff" }).setInteractive()
    this.rightArrow.on("pointerdown", () => this.switchPage(1))

    // Listen for crafter updates
    const crafterScene = this.scene.get("Crafter") as Phaser.Scene
    crafterScene.events.on("crafterAdded", this.updateDisplay, this)
    crafterScene.events.on("crafterRemoved", this.updateDisplay, this)

    this.updateDisplay()
  }

  // Function to retrieve crafters from Crafter scene
  getCrafters(): CrafterInstance[] {
    const crafterScene = this.scene.get("Crafter") as any
    return crafterScene.crafters as CrafterInstance[] || []
  }

  // Update the display of crafters based on the current page
  updateDisplay() {
    for (const container of this.crafterContainers) container.destroy()
    this.crafterContainers = []

    const crafters = this.getCrafters()
    this.totalCrafters = crafters.length

    const startIndex = this.currentPage * this.craftersPerPage
    const endIndex = Math.min(startIndex + this.craftersPerPage, crafters.length)

    crafters.slice(startIndex, endIndex).forEach((crafter: CrafterInstance, index: number) => {
      const container = this.add.container(400, 150 + index * 120) // Dynamic placement
      const nodeImage = this.add.image(0, 0, crafter.recipe.outputItem).setScale(4) // Use the crafted item's texture
      const craftingText = this.add.text(50, 0, `Crafting ${crafter.recipe.outputItem}...`, {
        fontSize: "20px",
        color: "#ffffff",
      })

      container.add([nodeImage, craftingText])
      this.crafterContainers.push(container)
    })

    this.updateArrowVisibility()
  }

  // Pagination controls
  switchPage(direction: number) {
    this.currentPage += direction
    const maxPage = Math.floor(this.totalCrafters / this.craftersPerPage)
    this.currentPage = Phaser.Math.Clamp(this.currentPage, 0, maxPage)
    this.updateDisplay()
  }

  updateArrowVisibility() {
    const maxPage = Math.floor((this.totalCrafters - 1) / this.craftersPerPage)
    this.leftArrow.setVisible(this.currentPage > 0)
    this.rightArrow.setVisible(this.currentPage < maxPage)
  }
}
