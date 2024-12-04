import Phaser from "phaser";
import { TEXT_STYLE_SMALL } from '../../config';
import { GAME_WIDTH, GAME_HEIGHT, NSP } from '../../stores/constants';

interface ButtonConfig {
    key: string;
    label: string;
    scene: string;
    icon: string;
}

export default class GameMenu extends Phaser.Scene {
    //store config values in one area
    private MENU_CONFIG: {
        width: number;
        height: number;
        iconWidth: number;
        iconHeight: number;
        hoverOffsetY: number;
        fontSize: number;
        buttons: ButtonConfig[];
    };

    constructor() {
        super({ key: 'GameMenu' });

        // Initialize MENU_CONFIG as a class property
        this.MENU_CONFIG = {
            width: 450,
            height: 180,
            iconWidth: 90,
            iconHeight: 90,
            hoverOffsetY: -65,
            fontSize: 25,
            buttons: [
                { key: 'inventory', label: 'INVENTORY', scene: 'InventoryMenu', icon: 'inventory_icon' },
                { key: 'build', label: 'BUILD', scene: 'BuildMenu', icon: 'build_icon' },
                { key: 'crafting', label: 'CRAFT', scene: 'CraftingMenu', icon: 'craft_icon' },
            ],
        };
    }

    create() {
        // Create the menu background
        this.add.nineslice(
            GAME_WIDTH - 10,
            GAME_HEIGHT - 10,
            'menu',
            0,
            this.MENU_CONFIG.width,
            this.MENU_CONFIG.height,
            NSP, NSP, NSP, NSP
        ).setOrigin(1, 1).setTint(0x247B7F);

        const gameMenuContainer = this.add.container(GAME_WIDTH - 10, GAME_HEIGHT - 10);

        // Icon hover effect
        const iconHover = this.add.image(0, 0, 'button_hover').setOrigin(0.5).setVisible(false).setScale(2);
        gameMenuContainer.add(iconHover);

        // Loop through buttons and create each dynamically
        this.MENU_CONFIG.buttons.forEach((buttonConfig: ButtonConfig, index: number) => {
            const xOffset = (index - 1) * this.MENU_CONFIG.iconWidth * 1.5;

            // Create button
            const button = this.add.nineslice(
                -(this.MENU_CONFIG.width / 2) + xOffset,
                -(this.MENU_CONFIG.height / 2) - 20,
                'menu_icon',
                0,
                this.MENU_CONFIG.iconWidth,
                this.MENU_CONFIG.iconHeight,
                NSP, NSP, NSP, NSP
            ).setOrigin(0.5).setInteractive();

            gameMenuContainer.add(button);

            // Button text
            const buttonText = this.add.text(
                button.x,
                button.y + 65,
                buttonConfig.label,
                TEXT_STYLE_SMALL
            ).setOrigin(0.5).setFontSize(this.MENU_CONFIG.fontSize);
            gameMenuContainer.add(buttonText);

            const buttonIcon = this.add.image(
                button.x,
                button.y,
                buttonConfig.icon,
            ).setOrigin(0.5).setScale(4);
            gameMenuContainer.add(buttonIcon);

            // Button interaction
            button.on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.scene.launch(buttonConfig.scene);
            });

            // Hover effect
            this.#updateHoverEffect(button, iconHover);
        });
    }

    // Update arrow position and visibility on hover
    #updateHoverEffect(button: Phaser.GameObjects.NineSlice, arrow: Phaser.GameObjects.Image) {
        button.on(Phaser.Input.Events.POINTER_OVER, () => {
            arrow.setPosition(button.x, button.y + this.MENU_CONFIG.hoverOffsetY);
            arrow.setVisible(true);
            this.tweens.killTweensOf(arrow);
            this.tweens.add({
                targets: arrow,
                y: '+=5',
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        });
        button.on(Phaser.Input.Events.POINTER_OUT, () => {
            arrow.setVisible(false);
            this.tweens.killTweensOf(arrow);
        });
    }
}
