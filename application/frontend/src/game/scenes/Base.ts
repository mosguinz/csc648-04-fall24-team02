import Phaser from "phaser"
import type InventoryMenu from "./InventoryMenu"
import { NodePositions } from "../data/Constants.ts"

export default class BaseScene extends Phaser.Scene {

  public minerTimers: { [key: string]: Phaser.Time.TimerEvent } = {}
  private minerPowers: { [key: string]: number } = {}

  constructor() {
    super("BaseScene")
  }

  create() {
    // Background
    const background = this.add.image(767, 431, "background_1")
    background.scaleX = 1.5
    background.scaleY = 1.5

    // iron_ore_block
    const iron_ore_block = this.add.image(374, 247, "iron_ore_block")
    iron_ore_block.scaleX = 7.8
    iron_ore_block.scaleY = 7.8
    iron_ore_block.setInteractive()
    iron_ore_block.on("pointerdown", () => {
      this.mineBlock("iron_ore")
    })

    // copper_ore_block
    const copper_ore_block = this.add.image(807, 312, "copper_ore_block")
    copper_ore_block.scaleX = 7.8
    copper_ore_block.scaleY = 7.8
    copper_ore_block.setInteractive()
    copper_ore_block.on("pointerdown", () => {
      this.mineBlock("copper_ore")
    })

    // rock_block
    const rock_block = this.add.image(432, 435, "rock_block")
    rock_block.scaleX = 7.8
    rock_block.scaleY = 7.8
    rock_block.setInteractive()
    rock_block.on("pointerdown", () => {
      this.mineBlock("rock")
    })

    // Listen for miner placement events from MinerPlacementScene
    this.events.on("placeMiner", (node: string, power: number) => {
      this.placeMinerOnNode(node, power)
    })
    this.events.on("updateMinerPower", (node: string, newPower: number) => {
      this.updateMinerPower(node, newPower)
    })

    this.anims.create({
      key: "miner_working",
      frames: [{ key: "miner1" }, { key: "miner2" }],
      frameRate: 7,
      repeat: -1,
    })
  }

  mineBlock(blockName: string) {
    const inventoryMenu = this.scene.get("InventoryMenu") as InventoryMenu
    inventoryMenu.addToInventory(blockName, 1)
    inventoryMenu.updateInventoryDisplay()
    console.log(`Mined 1 ${blockName}`)
  }

  // Place a miner with specified power on a node
  placeMinerOnNode(node: string, power: number) {
    if (this.minerTimers[node]) {
      this.minerTimers[node].remove()
    }

    const nodePosition = NodePositions[node]
    this.minerPowers[node] = power

    const miner = this.add.sprite(nodePosition.x, nodePosition.y, "miner1").setScale(7.0)
    miner.play("miner_working")

    this.minerTimers[node] = this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => {
        this.mineResources(node)
      },
    })
  }

  // Update the mining power of an existing miner
  updateMinerPower(node: string, newPower: number) {
    this.minerPowers[node] = newPower
  }

  // Auto-mine resources based on the current mining power
  private mineResources(node: string) {
    const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu
    const resource = node === "iron" ? "iron_ore" : node === "copper" ? "copper_ore" : "rock"
    const miningPower = this.minerPowers[node]

    inventoryScene.inventory[resource].count += miningPower
    inventoryScene.inventory[resource].textObject!.setText(`${inventoryScene.inventory[resource].count}`)
    this.sound.play("mine_sound", { detune: 0, seek: 0.05, volume: 1.0 })

    const displayName = inventoryScene.inventory[resource].name
    const textContent = `+${miningPower} ${displayName}`

    const nodePosition = NodePositions[node]
    const floatingText = this.add.text(nodePosition.x, nodePosition.y, textContent, {
      fontSize: "16px",
      color: "#ffffff",
    })

    this.tweens.add({
      targets: floatingText,
      y: nodePosition.y - 50,
      alpha: 0,
      duration: 1000,
      ease: "Power1",
      onComplete: () => floatingText.destroy(),
    })

    console.log(`Auto-mining ${miningPower} ${resource} from ${node} node.`)
  }
}