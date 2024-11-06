import type InventoryMenu from "./InventoryMenu"
import BaseScene from "./Base"

export default class MinerPlacementScene extends Phaser.Scene {
  private selectedNode: string | null = null // Track which node is selected for miner placement
  private minerLevels: { [key: string]: number } = {
    iron: 0,
    copper: 0,
    rock: 0,
  } // Track miner levels

  constructor() {
    super({ key: "MinerPlacementScene" })
  }

  create() {
    // Create background for the popup scene
    const background = this.add.rectangle(650, 300, 800, 500, 0x666666)
    background.setInteractive()
    this.add.text(420, 100, "Build/Upgrade Miners", {
      fontSize: "40px",
      color: "#ffffff",
    })
    this.add.text(320, 150, "Costs per build/upgrade:", {
      fontSize: "25px",
      color: "#ffffff",
    })

    // Costs text and images
    this.add.text(690, 150, "4x", { fontSize: "25px", color: "#ffffff" })
    this.add.image(740, 164, "iron_rod").setScale(2.25)
    this.add.text(765, 150, "12x", { fontSize: "25px", color: "#ffffff" })
    this.add.image(830, 164, "iron_plate").setScale(2.25)
    this.add.text(860, 150, "10x", { fontSize: "25px", color: "#ffffff" })
    this.add.image(925, 164, "concrete").setScale(2.25)

    this.add.text(270, 220, "Resource Node to Build/Upgrade:", {
      fontSize: "25px",
      color: "#ffffff",
    })

    // Close button
    const closeButton = this.add
      .text(1020, 60, "X", { fontSize: "40px", color: "#ffffff" })
      .setInteractive()
    closeButton.on("pointerdown", () => this.scene.stop("MinerPlacementScene"))

    // Resource nodes for placing the miner
    const ironNode = this.add.image(400, 370, "iron_ore_block").setScale(8).setInteractive()
    const copperNode = this.add.image(650, 370, "copper_ore_block").setScale(8).setInteractive()
    const rockNode = this.add.image(900, 370, "rock_block").setScale(8).setInteractive()

    // Display miner level and power under each block
    this.displayMinerInfo("iron", ironNode)
    this.displayMinerInfo("copper", copperNode)
    this.displayMinerInfo("rock", rockNode)

    // Handle clicking on nodes
    ironNode.on("pointerdown", () => this.placeMiner("iron"))
    copperNode.on("pointerdown", () => this.placeMiner("copper"))
    rockNode.on("pointerdown", () => this.placeMiner("rock"))
  }

  // Display miner info (level and mining power) under the blocks
  displayMinerInfo(node: string, nodeImage: Phaser.GameObjects.Image) {
    // Miner level text
    this.add.text(
      nodeImage.x - 40,
      nodeImage.y + 80,
      `Level: ${this.minerLevels[node]}`,
      {
        fontSize: "20px",
        color: "#ffffff",
      },
    )
  }

  placeMiner(node: string) {
    const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu
    const baseScene = this.scene.get("BaseScene") as BaseScene

    if (this.selectedNode === node) {
      console.log("Upgrading miner on node:", node)
      if (inventoryScene.deductFromInventory("iron_ore", 1)) {
        // Increase miner level
        this.minerLevels[node] += 1

        // Update mining power
        const miningPower = this.minerLevels[node]

        // Emit event to BaseScene to apply increased mining power
        baseScene.events.emit("updateMinerPower", node, miningPower)

        this.scene.stop("MinerPlacementScene")
      } else {
        console.log("Not enough resources to upgrade miner.")
      }
    } else {
      console.log("Placing miner on node:", node)
      if (inventoryScene.deductFromInventory("iron_ore", 1)) {
        this.selectedNode = node
        this.minerLevels[node] = 1

        const miningPower = this.minerLevels[node]

        // Emit event to BaseScene to start miner with initial power
        baseScene.events.emit("placeMiner", node, miningPower)

        this.scene.stop("MinerPlacementScene")
      } else {
        const pointer = this.input.activePointer
        const floatingText = this.add.text(
          pointer.worldX,
          pointer.worldY,
          "Not enough resources to build/upgrade miner.",
          { fontSize: "16px", color: "#ff0000" },
        )

        this.tweens.add({
          targets: floatingText,
          y: pointer.worldY - 50,
          alpha: 0,
          duration: 1000,
          ease: "Power1",
          onComplete: () => floatingText.destroy(),
        })
      }
    }
  }
}