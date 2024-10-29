import Phaser from "phaser"
import type InventoryMenu from "./InventoryMenu"

export default class BaseScene extends Phaser.Scene {

  constructor() {
    super("BaseScene")
  }

  create() {
    // background_1
    const background_1 = this.add.image(767, 431, "background_1")
    background_1.scaleX = 1.5
    background_1.scaleY = 1.5

    const inventoryMenu = this.scene.get("InventoryMenu") as InventoryMenu
    // iron_ore_block
    const iron_ore_block = this.add.image(374, 247, "iron_ore_block")
    iron_ore_block.scaleX = 7.8
    iron_ore_block.scaleY = 7.8
    iron_ore_block.setInteractive()
    iron_ore_block.on("pointerdown", () => {
      inventoryMenu.addToInventory("iron_ore", 1)
      inventoryMenu.updateInventoryDisplay()
    })

    // copper_ore_block
    const copper_ore_block = this.add.image(807, 312, "copper_ore_block")
    copper_ore_block.scaleX = 7.8
    copper_ore_block.scaleY = 7.8
    copper_ore_block.setInteractive()
    copper_ore_block.on("pointerdown", () => {
      inventoryMenu.addToInventory("copper_ore", 1)
      inventoryMenu.updateInventoryDisplay()
    })

    // rock_block
    const rock_block = this.add.image(432, 435, "rock_block")
    rock_block.scaleX = 7.8
    rock_block.scaleY = 7.8
    rock_block.setInteractive()
    rock_block.on("pointerdown", () => {
      inventoryMenu.addToInventory("rock", 1)
      inventoryMenu.updateInventoryDisplay()
    })
  }
}
