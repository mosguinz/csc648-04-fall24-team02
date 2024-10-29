import Phaser from "phaser"
import type InventoryMenu from "./InventoryMenu"
import { NodePositions } from "./Constants.ts"

export default class BaseScene extends Phaser.Scene {

  public minerTimers: { [key: string]: Phaser.Time.TimerEvent } = {}

  constructor() {
    super("BaseScene")
  }

  create() {
    // background
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
    this.events.on("placeMiner", (node: string) => {
      this.placeMinerOnNode(node)
    })

    this.anims.create({
      key: "miner_working", // Key to refer to the animation
      frames: [{ key: "miner1" }, { key: "miner2" }],
      frameRate: 7, // Adjust frame rate for the speed of the animation
      repeat: -1, // -1 means loop forever
    })
  }

  mineBlock(blockName: string) {
    // Add the mined resource to the inventory based on the block name
    const inventoryMenu = this.scene.get("InventoryMenu") as InventoryMenu
    inventoryMenu.addToInventory(blockName, 1) // Add 1 unit of the mined resource
    inventoryMenu.updateInventoryDisplay()

    console.log(`Mined 1 ${blockName}`)
  }

  placeMinerOnNode(node: string) {
    console.log(`Placing miner on ${node} node...`)

    // Clear any existing timer for the node (in case of upgrades)
    if (this.minerTimers[node]) {
      this.minerTimers[node].remove()
    }

    // Get the position of the node (iron/copper/rock block)
    // const nodePosition = this.getNodePosition(node) // Custom function to return the X and Y of the block/node
    const nodePosition = NodePositions[node]

    // Create a sprite for the miner and apply the animation
    const miner = this.add
      .sprite(nodePosition.x, nodePosition.y, "miner1")
      .setScale(7.0)
    miner.play("miner_working") // Play the looping animation

    // Create a new timer that generates resources every X milliseconds
    this.minerTimers[node] = this.time.addEvent({
      delay: 3000, // Adjust delay for mining speed
      loop: true,
      callback: () => {
        const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu
        const resource =
          node === "iron"
            ? "iron_ore"
            : node === "copper"
              ? "copper_ore"
              : "rock"

        // Increment the resource count in the inventory
        inventoryScene.inventory[resource].count += 1
        inventoryScene.inventory[resource].textObject!.setText(
          `${inventoryScene.inventory[resource].count}`,
        )
        this.sound.play("mine_sound", {
          detune: 0, // Adjust this to tweak pitch if necessary
          seek: 0.05, // Skip the first 50 milliseconds (tweak this based on your needs)
          volume: 1.0,
        })

        // Get the display name for the resource
        const displayName = inventoryScene.inventory[resource].name
        const amount = 1
        const textContent = `${amount > 0 ? "+" : ""}${amount} ${displayName}`

        console.log(textContent)

        // Create floating text next to the miner (not the cursor)
        const floatingText = this.add.text(
          nodePosition.x,
          nodePosition.y,
          textContent,
          {
            fontSize: "16px",
            color: "#ffffff",
          },
        )

        // Apply tween to animate the text (move up and fade out)
        this.tweens.add({
          targets: floatingText,
          y: nodePosition.y - 50, // Move up by 50 pixels
          alpha: 0, // Fade out the text
          duration: 1000, // 1 second animation
          ease: "Power1",
          onComplete: () => {
            floatingText.destroy() // Destroy the text after the animation
          },
        })

        console.log(`Auto-mining 1 ${resource} from ${node} node.`)
      },
    })
  }
}
