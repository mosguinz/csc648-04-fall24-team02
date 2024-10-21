export default class RunningSmeltersScene extends Phaser.Scene {
    private smelterContainers: Phaser.GameObjects.Container[] = [];
    private smeltersPerPage: number = 3; // Number of smelters to display per page
    private currentPage: number = 0;
    private totalSmelters: number = 0;
    private leftArrow!: Phaser.GameObjects.Text;
    private rightArrow!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'RunningSmeltersScene' });
    }

    create() {
        const background = this.add.rectangle(645, 270, 900, 550, 0x333333);
        background.setInteractive();

        const title = this.add.text(420, 50, 'Active Smelters', { fontSize: '40px', color: '#ffffff' });

        const closeButton = this.add.text(1020, 60, 'X', { fontSize: '40px', color: '#ffffff' }).setInteractive();
        closeButton.on('pointerdown', () => this.scene.stop('RunningSmeltersScene'));

        // Add left arrow button
        this.leftArrow = this.add.text(210, 470, '<', { fontSize: '90px', color: '#ffffff' }).setInteractive();
        this.leftArrow.on('pointerdown', () => this.switchPage(-1));

        // Add right arrow button
        this.rightArrow = this.add.text(1040, 470, '>', { fontSize: '90px', color: '#ffffff' }).setInteractive();
        this.rightArrow.on('pointerdown', () => this.switchPage(1));

        // Dynamically display all running smelters
        this.totalSmelters = this.getRunningSmelters().length;
        console.log(this.totalSmelters);
        this.displaySmelters();
        this.updateArrowVisibility();
    }

    // Function to dynamically display smelters
    displaySmelters() {
        // Clear previous smelter containers
        this.smelterContainers.forEach(container => container.destroy());
        this.smelterContainers = [];

        const smelters = this.getRunningSmelters(); // Get the list of running smelters
        const startIndex = this.currentPage * this.smeltersPerPage;
        const endIndex = Math.min(startIndex + this.smeltersPerPage, smelters.length);

        smelters.slice(startIndex, endIndex).forEach((node, index) => {
            const container = this.add.container(400, 150 + index * 120); // Dynamic placement
            const nodeImage = this.add.image(0, 0, `${node}_ore_block`).setScale(4);
            const smeltingText = this.add.text(50, 0, `Smelting ${node} ore...`, {
                fontSize: '20px',
                color: '#ffffff'
            });

            container.add([nodeImage, smeltingText]);
            this.smelterContainers.push(container);
        });
    }

    // Get list of currently running smelters from SmelterPlacementScene
    getRunningSmelters() {
        const smelterPlacementScene = this.scene.get('SmelterPlacementScene') as any;

        // Debugging
        if (!smelterPlacementScene) {
            console.log('SmelterPlacementScene not found.');
        } else if (!smelterPlacementScene.smelterTimers) {
            console.log('smelterTimers not found in SmelterPlacementScene.');
        } else {
            console.log('SmelterPlacementScene and smelterTimers found.');
        }

        if (smelterPlacementScene && smelterPlacementScene.smelterTimers) {
            const smelterNodes = ['iron', 'copper', 'rock']; // Example smelter nodes
            const smelterTimers = smelterPlacementScene.smelterTimers;

            // Log smelterTimers to debug
            console.log(smelterTimers);

            // Return only the smelters that have running timers
            return smelterNodes.filter(node => smelterTimers[node]);
        } else {
            return [];
        }
    }

    // Switch between pages (-1 for left, 1 for right)
    switchPage(direction: number) {
        this.currentPage += direction;

        const maxPage = Math.floor(this.totalSmelters / this.smeltersPerPage);
        if (this.currentPage < 0) this.currentPage = 0;
        if (this.currentPage > maxPage) this.currentPage = maxPage;

        this.displaySmelters();
        this.updateArrowVisibility();
    }

    // Update the visibility of the arrows based on the current page
    updateArrowVisibility() {
        const maxPage = Math.floor((this.totalSmelters - 1) / this.smeltersPerPage);

        // Hide the left arrow if on the first page
        this.leftArrow.setVisible(this.currentPage > 0);

        // Hide the right arrow if on the last page
        this.rightArrow.setVisible(this.currentPage < maxPage);
    }
}