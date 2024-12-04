import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Constants for canvas positions
const humanPositions = [
  { x: 176, y: 192 },
  { x: 256, y: 352 },
  { x: 192, y: 368 },
  { x: 272, y: 48 },
  { x: 336, y: 112 },
  { x: 448, y: 96 },
  { x: 112, y: 112 },
  { x: 448, y: 416 },
];

const pinkCarPositions = [
  { x: 0, y: 0 },
  { x: 30, y: 0 },
  { x: 32, y: 0 },
  { x: 58, y: 0 },
  { x: 103, y: 0 },
  { x: 105, y: 0 },
  { x: 0, y: 1 },
  { x: 26, y: 1 },
  { x: 30, y: 1 },
  { x: 32, y: 1 },
  { x: 58, y: 1 },
  { x: 103, y: 1 },
  { x: 105, y: 1 },
  { x: 0, y: 2 },
  { x: 26, y: 2 },
  { x: 30, y: 2 },
  { x: 32, y: 2 },
  { x: 58, y: 2 },
  { x: 103, y: 2 },
  { x: 105, y: 2 },
];


const screenshotsDir = './screenshots';

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

// Helper to create unique screenshot paths
function getScreenshotPath(filename: string): string {
  return path.join(screenshotsDir, filename);
}

// Helper function to get the game canvas
async function getGameCanvas(page: Page) {
  const canvas = await page.waitForSelector('#game-container canvas', { timeout: 10000 });
  await page.waitForTimeout(2000);
  return canvas;
}

// Screen position calculator
function calculateScreenPosition(
  position: { x: number; y: number },
  bounds: { x: number; y: number },
  scale: { x: number; y: number },
  zoomLevel: number
) {
  return {
    x: bounds.x + position.x * scale.x * zoomLevel,
    y: bounds.y + position.y * scale.y * zoomLevel,
  };
}

// Helper function to attempt clicking a position multiple times
async function attemptClicksAtPosition(
  page: Page,
  screenX: number,
  screenY: number,
  mapX: number,
  mapY: number,
  attempts = 5,
  delayBetweenClicks = 500
) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    console.log(`Click attempt ${attempt} at map position (${mapX}, ${mapY}) -> screen position (${Math.round(screenX)}, ${Math.round(screenY)})`);
    await page.mouse.click(screenX, screenY);
    await page.waitForTimeout(delayBetweenClicks);
  }
}

//file clean up
test.afterAll(() => {
  fs.readdir(screenshotsDir, async (err, files) => {
    if (err) {
      console.error('Failed to read screenshots directory:', err);
      return;
    }
    for (const file of files) {
      const filePath = path.join(screenshotsDir, file);
      try {
        await fs.promises.unlink(filePath); // Using fs.promises to handle unlink asynchronously
        console.log(`Deleted screenshot: ${filePath}`);
      } catch (unlinkError) {
        console.error(`Failed to delete screenshot: ${filePath}`, unlinkError);
      }
    }
  });
});


// Test Suite: Verify if map is loaded
test.describe('Map Loading', () => {
  test('Check if map is loaded', async ({ page }) => {
    await page.goto('http://localhost:5174/game');
    const canvas = await page.locator('canvas');
    await expect(canvas).toBeVisible();

    const canvasImage = await canvas.screenshot({ path: getScreenshotPath('map-loaded.png') });
    expect(canvasImage.byteLength).toBeGreaterThan(0);
  });
});

// Test Suite: Verify human positions
test.describe('Human Sprite Testing', () => {
  test('Test human sprite positions', async ({ page }) => {
    await page.goto('http://localhost:5174/game');
    const canvas = await getGameCanvas(page);
    const bounds = await canvas.boundingBox();

    if (!bounds) throw new Error('Could not get canvas bounds');

    const displaySize = await page.evaluate(() => {
      const canvas = document.querySelector('#game-container canvas');
      if (!canvas) return null;
      return {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      };
    });

    if (!displaySize) throw new Error('Could not get canvas display size');

    const scale = {
      x: displaySize.width / 2048,
      y: displaySize.height / 1152,
    };

    const zoomLevel = 3;
    const initialScreenshot = await page.screenshot({ path: getScreenshotPath('human-initial.png') });

    for (const position of humanPositions) {
      const screenPos = calculateScreenPosition(position, bounds, scale, zoomLevel);
      await attemptClicksAtPosition(page, screenPos.x, screenPos.y, position.x, position.y);
    }

    const finalScreenshot = await page.screenshot({ path: getScreenshotPath('human-final.png') });
    expect(initialScreenshot).not.toEqual(finalScreenshot);
  });
});

// Test Suite: Verify pink car positions
test.describe('Pink Car Sprite Testing', () => {
  test.setTimeout(60000);
  test('Test pink car sprite positions', async ({ page }) => {
    await page.goto('http://localhost:5174/game');
    const canvas = await getGameCanvas(page);
    const bounds = await canvas.boundingBox();

    if (!bounds) throw new Error('Could not get canvas bounds');

    const displaySize = await page.evaluate(() => {
      const canvas = document.querySelector('#game-container canvas');
      if (!canvas) return null;
      return {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      };
    });

    if (!displaySize) throw new Error('Could not get canvas display size');

    const scale = {
      x: displaySize.width / 2048,
      y: displaySize.height / 1152,
    };

    const zoomLevel = 3;
    const initialScreenshot = await page.screenshot({ path: getScreenshotPath('pink-car-initial.png') });

    for (const position of pinkCarPositions) {
      const screenPos = calculateScreenPosition(position, bounds, scale, zoomLevel);
      await attemptClicksAtPosition(page, screenPos.x, screenPos.y, position.x, position.y);
    }

    const finalScreenshot = await page.screenshot({ path: getScreenshotPath('pink-car-final.png') });
    expect(initialScreenshot).not.toEqual(finalScreenshot);
  });
});

function convertToScreenCoords(
  gameCoords: { x: number; y: number },
  canvasBoundingBox: { x: number; y: number; width: number; height: number },
  scaleX: number,
  scaleY: number
): { x: number; y: number } {
  const screenX = canvasBoundingBox.x + gameCoords.x * scaleX;
  const screenY = canvasBoundingBox.y + gameCoords.y * scaleY;
  return { x: screenX, y: screenY };
}


//compare inventory before game and after playing game
//used to check if human or pink car is being stored
test.describe('Inventory Screenshot Comparison Test', () => {
  test('should compare inventory before and after interaction', async ({ page }) => {
    await page.goto('http://localhost:5174/game');
    const canvas = await page.waitForSelector('canvas[width="2048"][height="1152"]');
    const bounds = await canvas.boundingBox();
    if (!bounds) throw new Error('Could not get canvas bounds');

    const scaleX = bounds.width / 2048;
    const scaleY = bounds.height / 1152;

    // Open the inventory
    const menuY = 1152 - 100; // Y position for the menu
    const inventoryButtonPos = convertToScreenCoords({ x: 2048 - 400, y: menuY }, bounds, scaleX, scaleY);
    console.log('Opening inventory at:', inventoryButtonPos);
    await page.mouse.click(inventoryButtonPos.x, inventoryButtonPos.y);
    await page.waitForTimeout(1000);

    // Capture the initial screenshot
    const initialScreenshotPath = 'inventory-before.png';
    await page.screenshot({ path: initialScreenshotPath });

    // Interact with human positions
    for (const position of humanPositions) {
      const screenPos = convertToScreenCoords(position, bounds, scaleX, scaleY);
      await attemptClicksAtPosition(page, screenPos.x, screenPos.y, position.x, position.y);
    }

    // Reopen the inventory
    await page.mouse.click(inventoryButtonPos.x, inventoryButtonPos.y);
    await page.waitForTimeout(1000);

    // Capture the final screenshot after interactions
    const finalScreenshotPath = 'inventory-after.png';
    await page.screenshot({ path: finalScreenshotPath });

    const initialScreenshot = fs.readFileSync(initialScreenshotPath);
    const finalScreenshot = fs.readFileSync(finalScreenshotPath);
    expect(initialScreenshot).not.toEqual(finalScreenshot);

    fs.unlinkSync(initialScreenshotPath);
    fs.unlinkSync(finalScreenshotPath);
  });
});

test.describe('check if frontend value matches backend', () =>{

});
