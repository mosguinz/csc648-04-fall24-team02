import Phaser from "phaser";
import { GameData } from "../stores/gameData";
import { UserAssembler } from "../../client";
import { recipes } from "../stores/constants";

export default class Crafter extends Phaser.Scene {
  private crafterTimers: { [key: string]: Phaser.Time.TimerEvent } = {};

  constructor() {
    super({ key: "Crafter" });
  }

  create() {
    GameData.populateCrafters().then(() => {
      this.startCrafting();
    });

    // Listen for miner updates
    this.events.on("add-crafter", (newCrafter: UserAssembler) => {
      this.addCrafter(newCrafter);
    });
  }

  private startCrafting() {
    for (const assembler of GameData.crafters) {
      this.startCrafterTimer(assembler);
    }
  }

  private addCrafter(crafter: UserAssembler) {
    if (GameData.crafters.find((m) => m.id === crafter.id)) {
      return;
    }

    GameData.crafters.push(crafter);
    GameData.nextCrafterId++;
    GameData.saveCrafters();

    this.startCrafterTimer(crafter);
  }

  private startCrafterTimer(crafter: UserAssembler) {
    if (this.crafterTimers[crafter.id || ""]) {
      return;
    }

    this.crafterTimers[crafter.id || ""] = this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        if (crafter.recipe_id) {
          this.craftItem(recipes[crafter.recipe_id]);
        }
      },
    });
  }

  public craftItem(recipe: {
    outputItem: string;
    outputAmount: number;
    ingredients: { item: string; amount: number }[];
  }) {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i];
      const resourceKey = parseInt(ingredient.item, 10);

      GameData.removeResource(resourceKey, ingredient.amount);
    }

    GameData.addResource(parseInt(recipe.outputItem, 10), recipe.outputAmount);
  }
}
