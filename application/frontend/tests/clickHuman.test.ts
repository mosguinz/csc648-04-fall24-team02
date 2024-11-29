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

test.describe('Human Interaction Tests', () => {
  // Define the human positions from your map
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

  test('should click at human positions', async ({ page }) => {
    // Navigate to the game
    await page.goto('http://localhost:5173/game');

    // Get canvas and its properties
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
      x: displaySize.width / 2048,  // Game width from your config
      y: displaySize.height / 1152  // Game height from your config
    };

    // Game zoom level from your mainGame.ts
    const zoomLevel = 3;

    // Take an initial screenshot for comparison
    const initialScreenshot = await page.screenshot({
      clip: bounds
    });

    // Try clicking at each human position
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

    // Take a final screenshot to verify changes
    const finalScreenshot = await page.screenshot({
      clip: bounds
    });

    // Basic verification that something changed in the game
    expect(initialScreenshot).not.toEqual(finalScreenshot);
  });

  test('should click specific human positions repeatedly', async ({ page }) => {
    await page.goto('http://localhost:5173/game');
    const canvas = await getGameCanvas(page);
    const bounds = await canvas.boundingBox();

    if (!bounds) {
      throw new Error('Could not get canvas bounds');
    }

    // Get display size
    const displaySize = await page.evaluate(() => {
      const canvas = document.querySelector('#game-container canvas');
      return canvas ? {
        width: canvas.clientWidth,
        height: canvas.clientHeight
      } : null;
    });

    if (!displaySize) {
      throw new Error('Could not get canvas display size');
    }

    const scale = {
      x: displaySize.width / 2048,
      y: displaySize.height / 1152
    };

    // Focus on a few specific positions and try more attempts
    const focusPositions = [
      { x: 176, y: 192 },  // First human_x position
      { x: 448, y: 96 }    // First human_y position
    ];

    for (const position of focusPositions) {
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
  });
});