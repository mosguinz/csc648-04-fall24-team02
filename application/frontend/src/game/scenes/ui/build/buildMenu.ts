import Phaser from "phaser";
import { TEXT_STYLE, TEXT_STYLE_SMALL } from "../../../config";
import { GAME_WIDTH, GAME_HEIGHT, NSP } from "../../../stores/constants";

export default class BuildMenu extends Phaser.Scene {
  private BUILD_MENU_WIDTH = GAME_WIDTH / 7;
  private BUILD_MENU_HEIGHT = GAME_HEIGHT / 1.5;

  constructor() {
    super({
      key: "BuildMenu",
    });
  }

  create() {
    this.add
      .nineslice(
        GAME_WIDTH / 1.24,
        GAME_HEIGHT / 9,
        "inventory_panel",
        0,
        this.BUILD_MENU_WIDTH,
        this.BUILD_MENU_HEIGHT,
        NSP,
        NSP,
        NSP,
        NSP,
      )
      .setOrigin(0, 0)
      .setTint(0x247b7f);

    const buildMenuContainer = this.add.container(
      GAME_WIDTH / 1.24,
      GAME_HEIGHT / 9,
    );

    // Build menu text
    buildMenuContainer.add(
      this.add
        .text(
          this.BUILD_MENU_WIDTH / 2,
          this.BUILD_MENU_HEIGHT / 15,
          "BUILD",
          TEXT_STYLE,
        )
        .setOrigin(0.5, 0.5)
        .setColor("black")
        .setFontSize(64),
    );

    // Close button
    const closeButton = this.add
      .image(this.BUILD_MENU_WIDTH - 50, 50, "close_button")
      .setOrigin(0.5, 0.5)
      .setScale(3)
      .setInteractive();
    buildMenuContainer.add(closeButton);
    closeButton.on(Phaser.Input.Events.POINTER_OVER, () => {
      closeButton.setTint(0xff0000);
    });
    closeButton.on(Phaser.Input.Events.POINTER_OUT, () => {
      closeButton.clearTint();
    });
    closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.stop("BuildMenu");
    });

    // Build miner icon
    const buildMinerIcon = this.add
      .image(
        this.BUILD_MENU_WIDTH / 2,
        this.BUILD_MENU_HEIGHT / 4,
        "miner_icon",
      )
      .setOrigin(0.5, 0.5)
      .setScale(6)
      .setInteractive();
    buildMinerIcon.on(Phaser.Input.Events.POINTER_OVER, () => {
      buildMinerIcon.setTint(0xffd602);
    });
    buildMinerIcon.on(Phaser.Input.Events.POINTER_OUT, () => {
      buildMinerIcon.clearTint();
    });
    buildMinerIcon.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start("MinerPlacementMenu");
      this.scene.stop("BuildMenu");
      this.scene.stop("InventoryMenu");
      this.scene.stop("CraftingMenu");
      this.scene.stop("GameMenu");
    });
    buildMenuContainer.add(buildMinerIcon);

    // Build miner text
    buildMenuContainer.add(
      this.add
        .text(
          this.BUILD_MENU_WIDTH / 2,
          this.BUILD_MENU_HEIGHT / 4 + 70,
          "HARVESTER",
          TEXT_STYLE_SMALL,
        )
        .setOrigin(0.5, 0.5)
        .setColor("white")
        .setFontSize(32),
    );

    // Build crafter icon
    const buildCrafterIcon = this.add
      .image(
        this.BUILD_MENU_WIDTH / 2,
        this.BUILD_MENU_HEIGHT / 2,
        "crafter_icon",
      )
      .setOrigin(0.5, 0.5)
      .setScale(6)
      .setInteractive();
    buildCrafterIcon.on(Phaser.Input.Events.POINTER_OVER, () => {
      buildCrafterIcon.setTint(0xffd602);
    });
    buildCrafterIcon.on(Phaser.Input.Events.POINTER_OUT, () => {
      buildCrafterIcon.clearTint();
    });
    buildCrafterIcon.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start("CrafterPlacementMenu");
      this.scene.stop("BuildMenu");
      this.scene.stop("InventoryMenu");
      this.scene.stop("CraftingMenu");
      this.scene.stop("GameMenu");
    });
    buildMenuContainer.add(buildCrafterIcon);

    // Build miner text
    buildMenuContainer.add(
      this.add
        .text(
          this.BUILD_MENU_WIDTH / 2,
          this.BUILD_MENU_HEIGHT / 2 + 70,
          "CRAFTER",
          TEXT_STYLE_SMALL,
        )
        .setOrigin(0.5, 0.5)
        .setColor("white")
        .setFontSize(32),
    );
  }
}
