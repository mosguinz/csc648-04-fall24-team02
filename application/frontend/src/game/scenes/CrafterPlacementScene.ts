import type InventoryMenu from "./InventoryMenu"
import { type Recipe, recipes } from "../data/Constants" // Import the recipes data

export default class CrafterPlacementScene extends Phaser.Scene {
  private currentPage = 0
  private craftingItemsPerPage = 5 // Number of crafting items per page
  private craftingRecipes = recipes.slice(3) // Exclude the first 3 recipes
  private totalCraftingItems: number = this.craftingRecipes.length
  private craftingItems: Phaser.GameObjects.Container[] = [] // Store crafting item containers
  private leftArrow!: Phaser.GameObjects.Text // Left arrow
  private rightArrow!: Phaser.GameObjects.Text // Right arrow

  constructor() {
    super({ key: "CrafterPlacementScene" })
  }

  create() {
    const background = this.add.rectangle(650, 300, 800, 500, 0x666666)
    background.setInteractive() // Prevent clicks going through
    this.add.text(500, 100, "Build Crafters", {
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

    this.add.text(270, 220, "Select a recipe to Build Crafter:", {
      fontSize: "25px",
      color: "#ffffff",
    })

    // Close button
    const closeButton = this.add
      .text(1020, 60, "X", { fontSize: "40px", color: "#ffffff" })
      .setInteractive()
    closeButton.on("pointerdown", () =>
      this.scene.stop("CrafterPlacementScene")
    )

    // Left arrow button
    this.leftArrow = this.add
      .text(260, 370, "<", { fontSize: "40px" })
      .setInteractive()
    this.leftArrow.on("pointerdown", () => this.switchPage(-1))

    // Right arrow button
    this.rightArrow = this.add
      .text(1020, 370, ">", { fontSize: "40px" })
      .setInteractive()
    this.rightArrow.on("pointerdown", () => this.switchPage(1))

    this.updateDisplay()
  }

  switchPage(direction: number) {
    this.currentPage += direction
    const maxPage = Math.ceil(
      this.totalCraftingItems / this.craftingItemsPerPage,
    ) - 1
    if (this.currentPage < 0) this.currentPage = 0
    if (this.currentPage > maxPage) this.currentPage = maxPage

    this.updateDisplay()
  }

  displayCraftingItems() {
    for (const item of this.craftingItems) {
      item.destroy()
    }

    this.craftingItems = []

    const startIndex = this.currentPage * this.craftingItemsPerPage
    const endIndex = Math.min(
      startIndex + this.craftingItemsPerPage,
      this.totalCraftingItems,
    )

    for (let i = startIndex; i < endIndex; i++) {
      const recipe = this.craftingRecipes[i] // Use filtered recipes

      const itemContainer = this.add.container(
        290 + (i - startIndex) * 153,
        350,
      )

      const itemImage = this.add.image(35, 0, recipe.outputItem).setScale(4)
      itemContainer.add(itemImage)

      const outputQuantityText = this.add.text(
        70,
        -25,
        `x ${recipe.outputAmount}`,
        { fontSize: "16px", color: "#ffffff" },
      )
      itemContainer.add(outputQuantityText)

      recipe.ingredients.forEach((ingredient, index) => {
        const ingredientContainer = this.add.container(0, 40 + index * 30)
        const quantityText = this.add.text(0, 0, `${ingredient.amount}x`, {
          fontSize: "16px",
        })
        ingredientContainer.add(quantityText)

        const ingredientImage = this.add
          .image(44, 6, ingredient.item)
          .setScale(1.5)
        ingredientContainer.add(ingredientImage)
        itemContainer.add(ingredientContainer)
      })

      const autoCraftButton = this.add
        .text(0, 80, "Auto-Craft", {
          fontSize: "20px",
          backgroundColor: "#555",
          padding: { x: 10, y: 5 },
        }).setInteractive()
      itemContainer.add(autoCraftButton)
      autoCraftButton.on("pointerdown", () => this.startAutoCrafting(recipe))
      autoCraftButton.on("pointerdown", () => this.scene.stop("CrafterPlacementScene"))

      this.craftingItems.push(itemContainer)
    }
  }

  updateArrowVisibility() {
    const maxPage = Math.ceil(
      (this.totalCraftingItems) / this.craftingItemsPerPage,
    ) - 1

    this.leftArrow.setVisible(this.currentPage > 0)
    this.rightArrow.setVisible(this.currentPage < maxPage)
  }

  updateDisplay() {
    this.updateArrowVisibility()
    this.displayCraftingItems()
  }

  // Start auto-crafting by emitting an event to the Crafter scene
  startAutoCrafting(recipe: Recipe) {
    const inventoryScene = this.scene.get("InventoryMenu") as InventoryMenu

    if (
      inventoryScene.deductFromInventory("iron_ore", 1)
    ) {
      this.scene.get("Crafter").events.emit("startCrafting", recipe)
      console.log(`Auto-crafting setup for ${recipe.outputItem}`)
    } else {
      const pointer = this.input.activePointer
      const floatingText = this.add.text(
        pointer.worldX,
        pointer.worldY,
        "Not enough resources to auto-craft item.",
        {
          fontSize: "16px",
          color: "#ff0000",
        },
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
