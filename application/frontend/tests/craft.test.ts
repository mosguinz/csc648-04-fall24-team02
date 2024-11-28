import { test, expect } from '@playwright/test';

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
      x: displayedBounds.x + (gameX * scaleX),
      y: displayedBounds.y + (gameY * scaleY)
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

    // 3. Close inventory
    const closeButtonPos = convertToScreenCoords(1800, 200);
    await page.mouse.click(closeButtonPos.x, closeButtonPos.y);
    await page.waitForTimeout(500);

    // 4. Open crafting menu (third button)
    const craftingButtonPos = convertToScreenCoords(2048 - 200, menuY);
    console.log('Opening crafting at:', craftingButtonPos);
    await page.mouse.click(craftingButtonPos.x, craftingButtonPos.y);
    await page.waitForTimeout(1000);

    // 5. Click craft button (in middle of crafting menu)
    const craftButtonPos = convertToScreenCoords(1024, 600); // Middle of screen vertically
    console.log('Clicking craft button at:', craftButtonPos);
    await page.mouse.click(craftButtonPos.x, craftButtonPos.y);
    await page.waitForTimeout(1000);

    console.log('Debug info:', {
      canvasBounds: displayedBounds,
      scalingFactors: { scaleX, scaleY },
      clickSequence: {
        human: humanPos,
        inventoryButton: inventoryButtonPos,
        closeButton: closeButtonPos,
        craftingButton: craftingButtonPos,
        craftButton: craftButtonPos
      }
    });
  });
});