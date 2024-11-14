import Phaser from "phaser"
import type InventoryMenu from "./InventoryMenu"
import { NodePositions } from "../data/Constants.ts"

export default class BaseScene extends Phaser.Scene {
  public minerTimers: { [key: string]: Phaser.Time.TimerEvent } = {}

  // Constants
  private readonly BLOCK_SCALE = 7.8
  private readonly MINER_SCALE = 7.0
  private readonly MINING_DELAY = 3000
  private readonly FLOATING_TEXT_DURATION = 1000

  constructor() {
    super("BaseScene")
  }

  create() {
    // Background
    this.createBackground()

    // Create ore blocks
    this.createOreBlock("iron_ore", 374, 247)
    this.createOreBlock("copper_ore", 807, 312)
    this.createOreBlock("rock", 432, 435)

    // Listen for miner placement events
    this.events.on("placeMiner", (node: string) => this.placeMinerOnNode(node))

    // Animation setup
    this.anims.create({
      key: "miner_working",
      frames: [{ key: "miner1" }, { key: "miner2" }],
      frameRate: 7,
      repeat: -1,
    })
  }

  // Helper function to create the background
  private createBackground() {
    const background = this.add.image(767, 431, "background_1")
    background.setScale(1.5)
  }

  // Helper function to create ore blocks
  private createOreBlock(resource: string, x: number, y: number) {
    const block = this.add.image(x, y, `${resource}_block`)
    block.setScale(this.BLOCK_SCALE)
    block.setInteractive()
    block.on("pointerdown", () => this.mineBlock(resource))
  }

  // Method to mine a block
  private mineBlock(blockName: string) {
    const inventoryMenu = this.scene.get("InventoryMenu") as InventoryMenu
    inventoryMenu.addToInventory(blockName, 1)
    inventoryMenu.updateInventoryDisplay()
    console.log(`Mined 1 ${blockName}`)
  }

  // Method to place a miner on a node
  private placeMinerOnNode(node: string) {
    console.log(`Placing miner on ${node} node...`)

    if (this.minerTimers[node]) {
      this.minerTimers[node].remove()
    }

    const nodePosition = NodePositions[node]
    const miner = this.add.sprite(nodePosition.x, nodePosition.y, "miner1").setScale(this.MINER_SCALE)
    miner.play("miner_working")

    const resourceMap = new Map([
      ["iron", "iron_ore"],
      ["copper", "copper_ore"],
      ["rock", "rock"],
    ])
    const resource = resourceMap.get(node) || "unknown"

    // Create a new mining timer
    this.minerTimers[node] = this.time.addEvent({
      delay: this.MINING_DELAY,
      loop: true,
      callback: () => this.autoMineResource(nodePosition, resource),
    })
  }

  // Method to handle auto-mining of resources
  private autoMineResource(nodePosition: { x: number; y: number }, resource: string) {
    const inventoryMenu = this.scene.get("InventoryMenu") as InventoryMenu
    const resourceData = inventoryMenu.inventory[resource]

    resourceData.count += 1
    resourceData.textObject!.setText(`${resourceData.count}`)
    this.sound.play("mine_sound", { detune: 0, seek: 0.05, volume: 1.0 })

    const displayName = resourceData.name
    const textContent = `+1 ${displayName}`
    console.log(textContent)

    // Create floating text
    const floatingText = this.add.text(nodePosition.x, nodePosition.y, textContent, {
      fontSize: "16px",
      color: "#ffffff",
    })

    // Animate the floating text
    this.tweens.add({
      targets: floatingText,
      y: nodePosition.y - 50,
      alpha: 0,
      duration: this.FLOATING_TEXT_DURATION,
      ease: "Power1",
      onComplete: () => floatingText.destroy(),
    })

    console.log(`Auto-mining 1 ${resource} from node.`)
  }
}
