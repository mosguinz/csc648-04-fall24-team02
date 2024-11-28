import { test, expect, Page } from '@playwright/test';
import { GameData } from '../src/game/stores/gameData'; // Adjust path as needed

test.describe('Game Resource Collection and Crafting', () => {
  test('should collect human, verify inventory, and craft', async ({ page }) => {
    // Navigate to game
    await page.goto('http://localhost:5173/game');

    // Wait for canvas and get bounds
    const canvas = await page.waitForSelector('canvas[width="2048"][height="1152"]');
    const displayedBounds = await canvas.boundingBox();
    if (!displayedBounds) throw new Error('Could not get canvas bounds');

    const scaleX = displayedBounds.width / 2048;
    const scaleY = displayedBounds.height / 1152;

    const convertToScreenCoords = (gameX: number, gameY: number) => ({
      x: displayedBounds.x + gameX * scaleX,
      y: displayedBounds.y + gameY * scaleY
    });

    // Wait for game to fully load
    await page.waitForTimeout(2000);

    // 1. Click human sprite
    const humanPos = convertToScreenCoords(200, 400);
    console.log('Clicking human at:', humanPos);
    await page.mouse.click(humanPos.x, humanPos.y);
    await page.waitForTimeout(1000);

    // 2. Open inventory to verify human was added
    const menuY = 1152 - 100;
    const inventoryButtonPos = convertToScreenCoords(2048 - 400, menuY);
    console.log('Opening inventory at:', inventoryButtonPos);
    await page.mouse.click(inventoryButtonPos.x, inventoryButtonPos.y);
    await page.waitForTimeout(1000);

    // Take screenshot of inventory state
    await page.screenshot({ path: 'inventory-with-human.png' });

    // Define game dimensions
    const GAME_WIDTH = 2048;
    const GAME_HEIGHT = 1152;

    // Calculate inventory dimensions
    const INVENTORY_WIDTH = GAME_WIDTH / 2.8; // ≈ 731.43
    const INVENTORY_HEIGHT = GAME_HEIGHT / 1.5; // = 768

    // Calculate inventory position
    const inventoryX = GAME_WIDTH / 16; // = 128
    const inventoryY = GAME_HEIGHT / 9;  // = 128

    // Close button position within the inventory
    const closeButtonX = INVENTORY_WIDTH - 50; // ≈ 681.43
    const closeButtonY = 50;

    // Close button game coordinates
    const closeButtonGameX = inventoryX + closeButtonX; // ≈ 809.43
    const closeButtonGameY = inventoryY + closeButtonY; // = 178

    // Convert to screen coordinates
    const closeButtonPos = convertToScreenCoords(closeButtonGameX, closeButtonGameY);
    console.log('Clicking close button at:', closeButtonPos);
    await page.mouse.click(closeButtonPos.x, closeButtonPos.y);
    await page.waitForTimeout(500);




     // 4. Open the crafting menu
    const CRAFTING_WIDTH = GAME_WIDTH / 2.8; // ≈ 731.43
    const CRAFTING_HEIGHT = GAME_HEIGHT / 1.5; // = 768
    const craftingMenuX = GAME_WIDTH / 2.3; // ≈ 890.43
    const craftingMenuY = GAME_HEIGHT / 9;   // = 128
    const craftingButtonPos = convertToScreenCoords(2048 - 100, menuY);
    console.log('Opening crafting menu at:', craftingButtonPos);
    await page.mouse.click(craftingButtonPos.x, craftingButtonPos.y);
    await page.waitForTimeout(1000);

    // 5. Close the crafting menu
    const craftingCloseButtonX =  600; // ≈ 1571.86
    const craftingCloseButtonY = 225.7724609375 // = 178
    const craftingCloseButtonPos = convertToScreenCoords(craftingCloseButtonX, craftingCloseButtonY);
    console.log('Clicking crafting menu close button at:', craftingCloseButtonPos);
    await page.mouse.click(craftingCloseButtonPos.x, craftingCloseButtonPos.y);
    await page.waitForTimeout(500);

    // Debug information
    console.log('Debug info:', {
      canvasBounds: displayedBounds,
      scalingFactors: { scaleX, scaleY },
      clickSequence: {
        human: humanPos,
        inventoryButton: inventoryButtonPos,
        inventoryCloseButton: closeButtonPos,
        craftingButton: craftingButtonPos,
        craftingCloseButton: craftingCloseButtonPos,
      },
    });
  });
});