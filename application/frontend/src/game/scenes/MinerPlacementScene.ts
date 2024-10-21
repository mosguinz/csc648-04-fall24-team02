import InventoryMenu from './InventoryMenu';
import MainMenu from './MainMenu'; // Make sure to import MainMenu

export default class MinerPlacementScene extends Phaser.Scene {
    private selectedNode: string | null = null; // Track which node is selected for miner placement
    private minerLevels: { [key: string]: number } = { iron: 0, copper: 0, rock: 0 }; // Track miner levels
    private minerTimeTexts: { [key: string]: Phaser.GameObjects.Text } = {}; // Track mining time text objects

    constructor() {
        super({ key: 'MinerPlacementScene' });
    }

    create() {
        // Create background for the popup scene
        const background = this.add.rectangle(650, 300, 800, 500, 0x666666);
        background.setInteractive(); // Prevent clicks going through
        const buildTitle = this.add.text(420, 100, 'Build/Upgrade Miners', { fontSize: '40px', color: '#ffffff' });
        const costText = this.add.text(320, 150, 'Costs per build/upgrade:', { fontSize: '25px', color: '#ffffff' });
        // Costs text and images
        this.add.text(690, 150, '4x', { fontSize: '25px', color: '#ffffff' });
        this.add.image(740, 164, 'iron_rod').setScale(2.25);
        this.add.text(765, 150, '12x', { fontSize: '25px', color: '#ffffff' });
        this.add.image(830, 164, 'iron_plate').setScale(2.25);
        this.add.text(860, 150, '10x', { fontSize: '25px', color: '#ffffff' });
        this.add.image(925, 164, 'concrete').setScale(2.25);

        this.add.text(270, 220, 'Resource Node to Build/Upgrade:', { fontSize: '25px', color: '#ffffff' });

        // Close button
        const closeButton = this.add.text(1020, 60, 'X', { fontSize: '40px', color: '#ffffff' }).setInteractive();
        closeButton.on('pointerdown', () => this.scene.stop('MinerPlacementScene'));

        // Resource nodes for placing the miner
        const ironNode = this.add.image(400, 370, 'iron_ore_block').setScale(8).setInteractive();
        const copperNode = this.add.image(650, 370, 'copper_ore_block').setScale(8).setInteractive();
        const rockNode = this.add.image(900, 370, 'rock_block').setScale(8).setInteractive();

        // Display miner level and time under each block
        this.displayMinerInfo('iron', ironNode);
        this.displayMinerInfo('copper', copperNode);
        this.displayMinerInfo('rock', rockNode);

        // Handle clicking on nodes
        ironNode.on('pointerdown', () => this.placeMiner('iron'));
        copperNode.on('pointerdown', () => this.placeMiner('copper'));
        rockNode.on('pointerdown', () => this.placeMiner('rock'));
    }

    // Display miner info (level and mining time) under the blocks
    displayMinerInfo(node: string, nodeImage: Phaser.GameObjects.Image) {
        const levelText = this.add.text(nodeImage.x - 40, nodeImage.y + 80, `Level: ${this.minerLevels[node]}`, {
            fontSize: '20px',
            color: '#ffffff'
        });

        // Mining time text
        let miningTime = 0;
        if (!this.minerLevels[node] == 0) {
            miningTime = 3 * (0.5**(this.minerLevels[node] - 1));
        } 
        this.minerTimeTexts[node] = this.add.text(nodeImage.x - 40, nodeImage.y + 110, `Time: ${miningTime}s`, {
            fontSize: '20px',
            color: '#ffffff'
        });
    }

    placeMiner(node: string) {
        const inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu;
        const menuScene = this.scene.get('Game') as MainMenu;

        // Check if a miner exists on this node
        if (this.selectedNode === node) {
            // Option to upgrade the miner
            console.log('Upgrading miner on node:', node);
            if (inventoryScene.deductFromInventory('iron_ore', 1)) {
                const minerTimer = menuScene.minerTimers[node];
                minerTimer.delay *= 0.5; // Halve the mining delay on upgrade

                // Update miner level and time
                this.minerLevels[node] += 1;
                const miningTime = minerTimer.delay;
                this.minerTimeTexts[node].setText(`Time: ${miningTime}ms`);

                console.log(`Upgraded miner on ${node} node to level ${this.minerLevels[node]} with mining time ${miningTime}ms.`);
                // Close the placement window
                this.scene.stop('MinerPlacementScene');
            } else {
                console.log('Not enough resources to upgrade miner.');
            }
        } else {
            // Placing a new miner
            console.log('Placing miner on node:', node);

            // Deduct resources required for placing the miner
            if (inventoryScene.deductFromInventory('iron_ore', 1)) {
                // Mark node as having a miner
                this.selectedNode = node;

                // Emit event to place the miner in MainMenu scene
                this.scene.get('Game').events.emit('placeMiner', node);

                // Set initial level and mining time
                this.minerLevels[node] = 1;
                const miningTime = 3000 / this.minerLevels[node];
                this.minerTimeTexts[node].setText(`Time: ${miningTime}ms`);

                // Close the placement window
                this.scene.stop('MinerPlacementScene');
            } else {
                const pointer = this.input.activePointer; // Get the current pointer (cursor) position

                // Display floating text for insufficient resources
                const floatingText = this.add.text(pointer.worldX, pointer.worldY, "Not enough resources to build/upgrade miner.", {
                    fontSize: '16px',
                    color: '#ff0000'
                });

                // Apply tween to animate the text (move up and fade out)
                this.tweens.add({
                    targets: floatingText,
                    y: pointer.worldY - 50, // Move up by 50 pixels
                    alpha: 0,  // Fade out the text
                    duration: 1000, // 1 second animation
                    ease: 'Power1',
                    onComplete: () => {
                        floatingText.destroy(); // Destroy the text after the animation
                    }
                });
            }
        }
    }
}