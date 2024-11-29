import { test, expect, Page } from '@playwright/test';

// Helper function to wait for and get canvas
async function getGameCanvas(page: Page) {
  const canvas = await page.waitForSelector('#game-container canvas', { timeout: 10000 });
  // Wait for game to initialize
  await page.waitForTimeout(2000);
  return canvas;
}

// Helper function to calculate screen coordinates
function calculateScreenPosition(
  position: { x: number; y: number },
  bounds: { x: number; y: number },
  scale: { x: number; y: number },
  zoomLevel: number
) {
  return {
    x: bounds.x + (position.x * scale.x * zoomLevel),
    y: bounds.y + (position.y * scale.y * zoomLevel)
  };
}

// Helper function to attempt clicks at a position
async function attemptClicksAtPosition(
  page: Page,
  screenX: number,
  screenY: number,
  mapX: number,
  mapY: number,
  attempts: number = 5,
  delayBetweenClicks: number = 500
) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    console.log(`Click attempt ${attempt} at map position (${mapX}, ${mapY}) -> screen position (${Math.round(screenX)}, ${Math.round(screenY)})`);
    await page.mouse.click(screenX, screenY);
    await page.waitForTimeout(delayBetweenClicks);
  }
}

test.describe('Game Resource Collection and Crafting', () => {
  const humanPositions = [
    // human_x positions
    { x: 176, y: 192 },
    { x: 256, y: 352 },
    { x: 192, y: 368 },
    { x: 272, y: 48 },
    { x: 336, y: 112 },
    // human_y positions
    { x: 448, y: 96 },
    { x: 112, y: 112 },
    { x: 448, y: 416 }
  ];

  test('complete game workflow', async ({ page }) => {
    // Navigate to the game
    await page.goto('http://localhost:5173/game');

    // Get canvas and its properties using the working method
    const canvas = await getGameCanvas(page);
    const bounds = await canvas.boundingBox();

    if (!bounds) {
      throw new Error('Could not get canvas bounds');
    }

    // Get canvas display size
    const displaySize = await page.evaluate(() => {
      const canvas = document.querySelector('#game-container canvas');
      if (!canvas) return null;
      return {
        width: canvas.clientWidth,
        height: canvas.clientHeight
      };
    });

    console.log('Canvas display size:', displaySize);

    if (!displaySize) {
      throw new Error('Could not get canvas display size');
    }

    // Calculate scale factors
    const scale = {
      x: displaySize.width / 2048,
      y: displaySize.height / 1152
    };

    // Game zoom level
    const zoomLevel = 3;

    // 1. Click humans using the working method
    for (const position of humanPositions) {
      const screenPos = calculateScreenPosition(position, bounds, scale, zoomLevel);
      await attemptClicksAtPosition(
        page,
        screenPos.x,
        screenPos.y,
        position.x,
        position.y
      );
    }

    // Wait for clicks to complete
    await page.waitForTimeout(1000);

    // 2. Open inventory
    const menuY = 1152 - 100;
    const inventoryPos = calculateScreenPosition(
      { x: 2048 - 400, y: menuY },
      bounds,
      scale,
      1  // No zoom for UI elements
    );
    console.log('Opening inventory at:', inventoryPos);
    await page.mouse.click(inventoryPos.x, inventoryPos.y);
    await page.waitForTimeout(1000);

    // 3. Close inventory
    const closePos = calculateScreenPosition(
      { x: 809.43, y: 178 },
      bounds,
      scale,
      1
    );
    console.log('Closing inventory at:', closePos);
    await page.mouse.click(closePos.x, closePos.y);
    await page.waitForTimeout(500);

    // 4. Open crafting menu
    const craftingPos = calculateScreenPosition(
      { x: 2048 - 100, y: menuY },
      bounds,
      scale,
      1
    );
    console.log('Opening crafting at:', craftingPos);
    await page.mouse.click(craftingPos.x, craftingPos.y);
    await page.waitForTimeout(1000);

    // 5. Click craft button
    const craftButtonPos = calculateScreenPosition(
      { x: 1024, y: 576 }, // Center of screen
      bounds,
      scale,
      1
    );
    console.log('Clicking craft button at:', craftButtonPos);
    await page.mouse.click(craftButtonPos.x, craftButtonPos.y);
    await page.waitForTimeout(1000);

    // 6. Close crafting menu
    const craftClosePos = calculateScreenPosition(
      { x: 600, y: 225.77 },
      bounds,
      scale,
      1
    );
    console.log('Closing crafting at:', craftClosePos);
    await page.mouse.click(craftClosePos.x, craftClosePos.y);
    await page.waitForTimeout(500);

    // 7. Reopen inventory for final check
    console.log('Reopening inventory at:', inventoryPos);
    await page.mouse.click(inventoryPos.x, inventoryPos.y);
    await page.waitForTimeout(1000);

    // Take final screenshot
    await page.screenshot({ path: 'final-inventory.png' });
  });
});