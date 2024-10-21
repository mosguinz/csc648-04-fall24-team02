export default class SmelterPlacementScene extends Phaser.Scene {
    private smelterTimers: { [key: string]: Phaser.Time.TimerEvent } = {}; // Track smelter timers
    private smelterIcons: { [key: string]: Phaser.GameObjects.Image } = {}; // Track smelter icons on the build rectangle

    constructor() {
        super({ key: 'SmelterPlacementScene' });
    }

    create() {
        // Create background for the popup scene
        const background = this.add.rectangle(650, 300, 800, 500, 0x666666);
        background.setInteractive(); // Prevent clicks going through
        const buildTitle = this.add.text(500, 100, 'Build Smelters', { fontSize: '40px', color: '#ffffff' });
        const costText = this.add.text(420, 150, 'Costs per build:', { fontSize: '25px', color: '#ffffff' });

        // Smelter costs text and images
        this.add.text(670, 150, '10x', { fontSize: '25px', color: '#ffffff' });
        this.add.image(740, 164, 'iron_plate').setScale(2.25);
        this.add.text(760, 150, '10x', { fontSize: '25px', color: '#ffffff' });
        this.add.image(830, 164, 'concrete').setScale(2.25);

        this.add.text(465, 180, 'one item per 3 seconds', { fontSize: '25px', color: '#ffffff' });

        this.add.text(270, 220, 'Select Ore Type to Build Smelter:', { fontSize: '25px', color: '#ffffff' });

        // Close button
        const closeButton = this.add.text(1020, 60, 'X', { fontSize: '40px', color: '#ffffff' }).setInteractive();
        closeButton.on('pointerdown', () => this.scene.stop('SmelterPlacementScene'));

        // Resource types for placing the smelter
        const ironButton = this.add.text(250, 470, 'Iron Ore Smelter', { fontSize: '25px', color: '#ffffff' });
		const ironFurnaceIcon = this.add.image(370, 370, 'smelter').setScale(8).setInteractive();
		const ironIcon = this.add.image(370, 350, 'iron_ore').setScale(3);
        const copperButton = this.add.text(550, 470, 'Copper Ore Smelter', { fontSize: '25px', color: '#ffffff' });
		const copperFurnaceIcon = this.add.image(678, 370, 'smelter').setScale(8).setInteractive();
        const copperIcon = this.add.image(678, 350, 'copper_ore').setScale(3);
		const rockButton = this.add.text(845, 470, 'Concrete Maker', { fontSize: '25px', color: '#ffffff' });
		const rockFurnaceIcon = this.add.image(945, 370, 'smelter').setScale(8).setInteractive();
		const rockIcon = this.add.image(945, 350, 'rock').setScale(3);

        // Handle clicking on resource types
        ironFurnaceIcon.on('pointerdown', () => this.placeSmelter('iron'));
        copperFurnaceIcon.on('pointerdown', () => this.placeSmelter('copper'));
        rockFurnaceIcon.on('pointerdown', () => this.placeSmelter('rock'));
    }

    placeSmelter(resource: string) {
    const inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu;

    // Check if resources are available for placing the smelter
    if (inventoryScene.deductFromInventory('iron_ore', 1)) {
        console.log(`Placing smelter for ${resource}...`);

        // Emit event to start the smelter in MainMenu
        this.scene.get('Game').events.emit('startSmelter', resource);

        // Close the placement window
        this.scene.stop('SmelterPlacementScene');
    } else {
        console.log('Not enough resources to place a smelter.');
    }
}

    // Floating text to show when a smelter smelts an item
    displayFloatingText(resource: string, producedItem: string) {
        const smelterIcon = this.smelterIcons[resource];
        const floatingText = this.add.text(smelterIcon.x + 50, smelterIcon.y, `+1 ${producedItem}`, {
            fontSize: '16px',
            color: '#ffffff'
        });

        // Apply tween to animate the text (move up and fade out)
        this.tweens.add({
            targets: floatingText,
            y: smelterIcon.y - 50, // Move up by 50 pixels
            alpha: 0,  // Fade out the text
            duration: 1000, // 1 second animation
            ease: 'Power1',
            onComplete: () => {
                floatingText.destroy(); // Destroy the text after the animation
            }
        });
    }
}