import type InventoryMenu from "./InventoryMenu"
import Phaser from "phaser"
import { Recipe, recipes } from "../data/Constants"

export default class SmelterPlacementScene extends Phaser.Scene {

  constructor() {
    super({ key: "SmelterPlacementScene" })
  }

  create() {
    // Create background for the popup scene
    const background = this.add.rectangle(650, 300, 800, 500, 0x666666)
    background.setInteractive() // Prevent clicks going through
    this.add.text(500, 100, "Build Smelters", {
      fontSize: "40px",
      color: "#ffffff",
    })
    this.add.text(420, 150, "Costs per build:", {
      fontSize: "25px",
      color: "#ffffff",
    })

    // Smelter costs text and images
    this.add.text(670, 150, "10x", { fontSize: "25px", color: "#ffffff" })
    this.add.image(740, 164, "iron_plate").setScale(2.25)
    this.add.text(760, 150, "10x", { fontSize: "25px", color: "#ffffff" })
    this.add.image(830, 164, "concrete").setScale(2.25)

    this.add.text(465, 180, "one item per 3 seconds", {
      fontSize: "25px",
      color: "#ffffff",
    })

    this.add.text(270, 220, "Select Ore Type to Build Smelter:", {
      fontSize: "25px",
      color: "#ffffff",
    })

    // Close button
    const closeButton = this.add
      .text(1020, 60, "X", { fontSize: "40px", color: "#ffffff" })
      .setInteractive()
    closeButton.on("pointerdown", () =>
      this.scene.stop("SmelterPlacementScene"),
    )

    // Resource types for placing the smelter
    this.add.text(250, 470, "Iron Ore Smelter", {
      fontSize: "25px",
      color: "#ffffff",
    })
    const ironFurnaceIcon = this.add
      .image(370, 370, "smelter")
      .setScale(8)
      .setInteractive()
    this.add.image(370, 350, "iron_ore").setScale(3)
    this.add.text(550, 470, "Copper Ore Smelter", {
      fontSize: "25px",
      color: "#ffffff",
    })
    const copperFurnaceIcon = this.add
      .image(678, 370, "smelter")
      .setScale(8)
      .setInteractive()
    this.add.image(678, 350, "copper_ore").setScale(3)
    this.add.text(845, 470, "Concrete Maker", {
      fontSize: "25px",
      color: "#ffffff",
    })
    const rockFurnaceIcon = this.add
      .image(945, 370, "smelter")
      .setScale(8)
      .setInteractive()
    this.add.image(945, 350, "rock").setScale(3)

    // Handle clicking on resource types
    ironFurnaceIcon.on("pointerdown", () => this.placeSmelter(recipes[0]))
    copperFurnaceIcon.on("pointerdown", () => this.placeSmelter(recipes[1]))
    rockFurnaceIcon.on("pointerdown", () => this.placeSmelter(recipes[2]))
  }

  placeSmelter(recipe: Recipe) {
    const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu

    // Check if resources are available for placing the smelter
    if (inventoryScene.deductFromInventory("iron_ore", 1)) {
      console.log(`Placing smelter for ${recipe.outputItem}...`)

      // Emit event to start the smelter in MainMenu
      this.scene.get("Smelter").events.emit("startSmelter", recipe)

      // Close the placement window
      this.scene.stop("SmelterPlacementScene")
    } else {
      console.log("Not enough resources to place a smelter.")
    }
  }
}
