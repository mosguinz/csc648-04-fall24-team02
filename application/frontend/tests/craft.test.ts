import { test, Page } from '@playwright/test';

async function getGameCanvas(page: Page) {
  const canvas = await page.waitForSelector('#game-container canvas', { timeout: 10000 });
  await page.waitForTimeout(2000);
  return canvas;
}

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


async function attemptClicksAtPosition(
  page: Page,
  screenX: number,
  screenY: number,
  mapX: number,
  mapY: number,
  attempts: number = 5,
  delayBetweenClicks: number = 300
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
    await page.goto('http://localhost:5173/game');
    const canvas = await getGameCanvas(page);
    const bounds = await canvas.boundingBox();

    if (!bounds) {
      throw new Error('Could not get canvas bounds');
    }

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

    const scale = {
      x: displaySize.width / 2048,
      y: displaySize.height / 1152
    };

    // 1. Click humans
    for (const position of humanPositions) {
      const screenPos = calculateScreenPosition(position, bounds, scale, 3);
      await attemptClicksAtPosition(
        page,
        screenPos.x,
        screenPos.y,
        position.x,
        position.y,
          10,  // More attempts for focused testing
        300  // Slightly faster clicks
      );
    }
    await page.waitForTimeout(1000);

    // 2. Open inventory (bottom right, third from right)
    const inventoryButton = calculateScreenPosition(
      { x: 2048 - 400, y: 1152 - 100 },
      bounds,
      scale,
      1
    );
    await page.mouse.click(inventoryButton.x, inventoryButton.y);
    await page.waitForTimeout(1000);

    // 3. Close inventory (top right of inventory panel)
    const closeInventory = calculateScreenPosition(
      { x: 809.43, y: 178 },
      bounds,
      scale,
      1
    );
    await page.mouse.click(closeInventory.x, closeInventory.y);
    await page.waitForTimeout(500);

    // 4. Open crafting menu (bottom right, first icon)
    const craftingButton = calculateScreenPosition(
      { x: 2048 - 100, y: 1152 - 100 },
      bounds,
      scale,
      1
    );
    await page.mouse.click(craftingButton.x, craftingButton.y);
    await page.waitForTimeout(1000);

    // 5. Click craft button (in the middle of crafting panel)
    // Using values from craftingMenu.ts:
    const CRAFTING_WIDTH = 2048 / 2.8;
    const CRAFTING_HEIGHT = 1152 / 1.5;
    const craftButtonX = (2048 / 2.3) + (CRAFTING_WIDTH / 2); // Menu X + button X
    const craftButtonY = (1152 / 9) + (CRAFTING_HEIGHT / 2); // Menu Y + button Y

    const craftPos = calculateScreenPosition(
      { x: craftButtonX, y: craftButtonY },
      bounds,
      scale,
      1
    );
    console.log('Clicking craft button at:', craftPos);
    await page.mouse.click(craftPos.x, craftPos.y);
    await page.waitForTimeout(1000);

    // 6. Close crafting menu
    const closeCrafting = calculateScreenPosition(
      { x: 600, y: 225.77 },
      bounds,
      scale,
      1
    );
    await page.mouse.click(closeCrafting.x, closeCrafting.y);
    await page.waitForTimeout(500);

    // 7. Reopen inventory to verify crafted item
    await page.mouse.click(inventoryButton.x, inventoryButton.y);
    await page.waitForTimeout(1000);

  });
});