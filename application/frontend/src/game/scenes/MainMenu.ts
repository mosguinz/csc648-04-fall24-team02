import Phaser from "phaser";
import InventoryMenu from './InventoryMenu';

export default class MainMenu extends Phaser.Scene {
	private minerTimers: { [key: string]: Phaser.Time.TimerEvent } = {};
	private smelterTimers: { [key: string]: Phaser.Time.TimerEvent } = {}; // Track smelter timers

	constructor() {
		super("Game");
	}

	preload() {
		//  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
		//  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
		this.load.pack('pack', 'assets/boot-asset-pack.json');
	}

	editorCreate(): void {
		const particles = this.add.particles('particle');

		// Creating particles
		this.miningParticles = this.add.particles('particle');

		// background_1
		const background_1 = this.add.image(767, 431, "background_1");
		background_1.scaleX = 1.5;
		background_1.scaleY = 1.5;

		// iron_ore_block
		const iron_ore_block = this.add.image(374, 247, "iron_ore_block");
		iron_ore_block.scaleX = 7.8;
		iron_ore_block.scaleY = 7.8;
		iron_ore_block.setInteractive();
		iron_ore_block.on('pointerdown', () => {
			this.scene.get('InventoryMenu').addToInventory('iron_ore', 1);
			this.scene.get('InventoryMenu').updateInventoryDisplay();
		});

		// copper_ore_block
		const copper_ore_block = this.add.image(807, 312, "copper_ore_block");
		copper_ore_block.scaleX = 7.8;
		copper_ore_block.scaleY = 7.8;
		copper_ore_block.setInteractive();
		copper_ore_block.on('pointerdown', () => {
			this.scene.get('InventoryMenu').addToInventory('copper_ore', 1);
			this.scene.get('InventoryMenu').updateInventoryDisplay();
		});

		// rock_block
		const rock_block = this.add.image(432, 435, "rock_block");
		rock_block.scaleX = 7.8;
		rock_block.scaleY = 7.8;
		rock_block.setInteractive();
		rock_block.on('pointerdown', () => {
			this.scene.get('InventoryMenu').addToInventory('rock', 1);
			this.scene.get('InventoryMenu').updateInventoryDisplay();
		});

		// rectangle_1
		const rectangle_1 = this.add.rectangle(1195, 290, 128, 128);
		rectangle_1.scaleX = 1.447046084870738;
		rectangle_1.scaleY = 4.650162957270586;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 9539985;

		// shadowFx_1
		rectangle_1.postFX!.addShadow(1, 1, 0.1, 1, 0, 4, 1);

		// build_UI_name
		const build_UI_name = this.add.text(1156, 12, "", {});
		build_UI_name.scaleX = 1.5;
		build_UI_name.scaleY = 1.5;
		build_UI_name.text = "Build";
		build_UI_name.setStyle({ "color": "#000000ff" });

		// smelter
		const smelter = this.add.image(1142, 71, "smelter");
		smelter.scaleX = 3;
		smelter.scaleY = 3;
		smelter.setInteractive();
		smelter.on('pointerdown', () => {
			this.scene.launch('SmelterPlacementScene'); // Open smelter placement window
		});
		const smelterList = this.add.text(1190, 77, 'List').setInteractive();
		smelterList.setInteractive();
		smelterList.on('pointerdown', () => {
			this.scene.launch('RunningSmeltersScene');
		});

		// crafter
		const crafter = this.add.image(1142, 141, "crafter");
		crafter.scaleX = 3;
		crafter.scaleY = 3;
		const crafterList = this.add.text(1190, 147, 'List').setInteractive();

		// miner
		const miner = this.add.image(1142, 211, "miner");
		miner.scaleX = 3;
		miner.scaleY = 3;
		miner.setInteractive();
		miner.on('pointerdown', () => {
			this.scene.launch('MinerPlacementScene'); // Open miner placement window
		});

		// smelter_name
		const smelter_name = this.add.text(1188, 50, "", {});
		smelter_name.text = "Smelter";

		// crafter_name
		const crafter_name = this.add.text(1188, 120, "", {});
		crafter_name.text = "Crafter";

		// miner_name
		const miner_name = this.add.text(1188, 191, "", {});
		miner_name.text = "Miner";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */


	create() {
		this.scene.launch('CraftingMenu');
		this.scene.launch('InventoryMenu');
		// this.scene.launch('RunningSmeltersScene');
		this.editorCreate();

		// Listen for miner placement events from MinerPlacementScene
		this.events.on('placeMiner', (node: string) => {
			this.placeMinerOnNode(node);
		});

		this.anims.create({
			key: 'miner_working', // Key to refer to the animation
			frames: [
				{ key: 'miner1' },
				{ key: 'miner2' }
			],
			frameRate: 7, // Adjust frame rate for the speed of the animation
			repeat: -1 // -1 means loop forever
		});

		// Listen for the startSmelter event from SmelterPlacementScene
		this.events.on('startSmelter', (resource: string) => {
			this.startSmelterTimer(resource);
		});


	}
	mineBlock(blockName: string, x: number, y: number) {
		// Emit particles directly from the miningParticles object
		// this.miningParticles.createEmitter({
		//     x: x,
		//     y: y,
		//     speed: { min: 50, max: 150 },
		//     lifespan: { min: 500, max: 1000 },
		//     scale: { start: 0.5, end: 0 },
		//     alpha: { start: 1, end: 0 },
		//     quantity: 10,
		//     gravityY: 200
		// });

		// Add the mined resource to the inventory based on the block name
		InventoryMenu.addToInventory(blockName, 1); // Add 1 unit of the mined resource

		console.log(`Mined 1 ${blockName}`);
	}

	placeMinerOnNode(node: string) {
		console.log(`Placing miner on ${node} node...`);

		// Clear any existing timer for the node (in case of upgrades)
		if (this.minerTimers[node]) {
			this.minerTimers[node].remove();
		}

		// Get the position of the node (iron/copper/rock block)
		const nodePosition = this.getNodePosition(node); // Custom function to return the X and Y of the block/node

		// Create a sprite for the miner and apply the animation
		const miner = this.add.sprite(nodePosition.x, nodePosition.y, 'miner1').setScale(7.0);
		miner.play('miner_working'); // Play the looping animation

		// Create a new timer that generates resources every X milliseconds
		this.minerTimers[node] = this.time.addEvent({
			delay: 3000, // Adjust delay for mining speed
			loop: true,
			callback: () => {
				const inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu;
				const resource = node === 'iron' ? 'iron_ore' : node === 'copper' ? 'copper_ore' : 'rock';

				// Increment the resource count in the inventory
				inventoryScene.inventory[resource].count += 1;
				inventoryScene.inventory[resource].textObject!.setText(`${inventoryScene.inventory[resource].count}`);
				this.sound.play('mine_sound', {
					detune: 0, // Adjust this to tweak pitch if necessary
					seek: 0.05, // Skip the first 50 milliseconds (tweak this based on your needs)
					volume: 1.0
				});

				// Get the display name for the resource
				const displayName = inventoryScene.itemNames[resource];
				const amount = 1;
				const textContent = `${amount > 0 ? '+' : ''}${amount} ${displayName}`;

				console.log(textContent);

				// Create floating text next to the miner (not the cursor)
				const floatingText = this.add.text(nodePosition.x, nodePosition.y, textContent, {
					fontSize: '16px',
					color: '#ffffff'
				});

				// Apply tween to animate the text (move up and fade out)
				this.tweens.add({
					targets: floatingText,
					y: nodePosition.y - 50, // Move up by 50 pixels
					alpha: 0,  // Fade out the text
					duration: 1000, // 1 second animation
					ease: 'Power1',
					onComplete: () => {
						floatingText.destroy(); // Destroy the text after the animation
					}
				});

				console.log(`Auto-mining 1 ${resource} from ${node} node.`);
			}
		});
	}

	// Custom function to get the position of the node based on the type
	getNodePosition(node: string) {
		// Define the positions for the iron, copper, and rock nodes
		const positions = {
			iron: { x: 374, y: 247 },
			copper: { x: 807, y: 312 },
			rock: { x: 432, y: 435 }
		};

		return positions[node] || { x: 0, y: 0 }; // Return a default position if the node is unknown
	}

	startSmelterTimer(resource: string) {
		const inventoryScene = this.scene.get('InventoryMenu') as InventoryMenu;

		// Automatically smelt resources
		const smeltInterval = 3000; // Smelting every 3 seconds
		console.log(`Starting smelter for ${resource}...`);

		this.smelterTimers[resource] = this.time.addEvent({
			delay: smeltInterval,
			loop: true,
			callback: () => {
				if (resource === 'iron' && inventoryScene.inventory['iron_ore'].count >= 1) {
					// Deduct iron ore and add iron ingot
					inventoryScene.inventory['iron_ore'].count -= 1;
					inventoryScene.inventory['iron_ingot'].count += 1;

					// Update the iron ore and iron ingot count displays
					inventoryScene.inventory['iron_ore'].textObject!.setText(`${inventoryScene.inventory['iron_ore'].count}`);
					inventoryScene.inventory['iron_ingot'].textObject!.setText(`${inventoryScene.inventory['iron_ingot'].count}`);

					// Show floating text for iron ingot
					this.displayFloatingText('Iron Ingot');
					console.log('Smelting iron ore to iron ingot.');

				} else if (resource === 'copper' && inventoryScene.inventory['copper_ore'].count >= 1) {
					// Deduct copper ore and add copper ingot
					inventoryScene.inventory['copper_ore'].count -= 1;
					inventoryScene.inventory['copper_ingot'].count += 1;
					inventoryScene.inventory['copper_ore'].textObject!.setText(`${inventoryScene.inventory['copper_ore'].count}`);
					inventoryScene.inventory['copper_ingot'].textObject!.setText(`${inventoryScene.inventory['copper_ingot'].count}`);

					// Show floating text for copper ingot
					this.displayFloatingText('Copper Ingot');
					console.log('Smelting copper ore to copper ingot.');

				} else if (resource === 'rock' && inventoryScene.inventory['rock'].count >= 1) {
					// Deduct rock and add concrete
					inventoryScene.inventory['rock'].count -= 1;
					inventoryScene.inventory['concrete'].count += 1;
					inventoryScene.inventory['rock'].textObject!.setText(`${inventoryScene.inventory['rock'].count}`);
					inventoryScene.inventory['concrete'].textObject!.setText(`${inventoryScene.inventory['concrete'].count}`);

					// Show floating text for concrete
					this.displayFloatingText('Concrete');
					console.log('Turning rock into concrete.');
				}
			}
		});
	}

	// Function for floating text
	displayFloatingText(producedItem: string) {
		const floatingText = this.add.text(1142, 100, `+1 ${producedItem}`, {
			fontSize: '16px',
			color: '#ffffff'
		});

		// Apply tween to animate the text (move up and fade out)
		this.tweens.add({
			targets: floatingText,
			y: floatingText.y - 50, // Move up by 50 pixels
			alpha: 0,  // Fade out the text
			duration: 1000, // 1 second animation
			ease: 'Power1',
			onComplete: () => {
				floatingText.destroy(); // Destroy the text after the animation
			}
		});
	}
}
