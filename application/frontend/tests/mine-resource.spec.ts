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
  //HUMAN_Y
  { x: 448, y: 96 },
  { x: 112, y: 112 },
  { x: 448, y: 416 }
];
//canvas locations for pink car location
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


// Helper function to get the game canvas
async function getGameCanvas(page: { waitForSelector: (arg0: string, arg1: { timeout: number }) => any; waitForTimeout: (arg0: number) => any; }) {
  const canvas = await page.waitForSelector('#game-container canvas', { timeout: 10000 });
  await page.waitForTimeout(2000);
  return canvas;
}

//Screen position calculator
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

// Helper function to attempt clicking a position multiple times
async function attemptClicksAtPosition(
  page: { mouse: { click: (arg0: any, arg1: any) => any; }; waitForTimeout: (arg0: number) => any; },
  screenX: number,
  screenY: number,
  mapX: any,
  mapY: any,
  attempts = 5,
  delayBetweenClicks = 500
) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    console.log(`Click attempt ${attempt} at map position (${mapX}, ${mapY}) -> screen position (${Math.round(screenX)}, ${Math.round(screenY)})`);
    await page.mouse.click(screenX, screenY);

    await page.waitForTimeout(delayBetweenClicks);
  }
}

test.describe('Check if map is being loaded in', () => {
  test('should ensure human1 sprite is visible on the canvas', async ({ page }) => {
  
    await page.goto('http://localhost:5173/game');
    const canvas = await page.locator('canvas');
    await expect(canvas).toBeVisible();

    const canvasImage = await canvas.screenshot();
    expect(canvasImage.byteLength).toBeGreaterThan(0);
  });
});
test.describe('Check if human is loaded onto map', () => {
  test('testing human positions', async ({ page }) => {
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

    if (!displaySize) {
      throw new Error('Could not get canvas display size');
    }

    const scale = {
      x: displaySize.width / 2048,  
      y: displaySize.height / 1152  
    };

    const zoomLevel = 3;

    const initialScreenshot = await page.screenshot({
      clip: bounds
    });

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
    const finalScreenshot = await page.screenshot({
      clip: bounds
    });

    expect(initialScreenshot).not.toEqual(finalScreenshot);
  });
});

test.describe('Test if pink car is being loaded on the map', () => {
  test('testing pink car positions', async ({ page }) => {
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

    if (!displaySize) {
      throw new Error('Could not get canvas display size');
    }

    const scale = {
      x: displaySize.width / 2048,  
      y: displaySize.height / 1152  
    };

    const zoomLevel = 3;

    const initialScreenshot = await page.screenshot({
      clip: bounds
    });

    for (const position of pinkCarPositions) {
      const screenPos = calculateScreenPosition(position, bounds, scale, zoomLevel);
      await attemptClicksAtPosition(
        page,
        screenPos.x,
        screenPos.y,
        position.x,
        position.y
      );
    }

    const finalScreenshot = await page.screenshot({
      clip: bounds
    });

    expect(initialScreenshot).not.toEqual(finalScreenshot);
  });
});


test.describe('Check if inventory opens', () => {
  test('should open and close the inventory', async ({ page }) => {
    await page.goto('http://localhost:5173/game');
    const canvas = await page.waitForSelector('canvas[width="2048"][height="1152"]');
    const displayedBounds = await canvas.boundingBox();
    if (!displayedBounds) throw new Error('Could not get canvas bounds');

    const scaleX = displayedBounds.width / 2048;
    const scaleY = displayedBounds.height / 1152;

    const convertToScreenCoords = (gameX: number, gameY: number) => ({
      x: displayedBounds.x + gameX * scaleX,
      y: displayedBounds.y + gameY * scaleY
    });

    const menuY = 1152 - 100; 
    const inventoryButtonPos = convertToScreenCoords(2048 - 400, menuY); // Position for the inventory button
    console.log('Opening inventory at:', inventoryButtonPos);
    await page.mouse.click(inventoryButtonPos.x, inventoryButtonPos.y);
    await page.waitForTimeout(1000);

    const screenshotPath = 'inventory-opened.png';  // Path to the screenshot

    // Take screenshot
    await page.screenshot({ path: screenshotPath });

    // Close inventory
    const GAME_WIDTH = 2048;
    const GAME_HEIGHT = 1152;
    const INVENTORY_WIDTH = GAME_WIDTH / 2.8; // ≈ 731.43
    //const INVENTORY_HEIGHT = GAME_HEIGHT / 1.5; // = 768
    const inventoryX = GAME_WIDTH / 16; // = 128
    const inventoryY = GAME_HEIGHT / 9;  // = 128

    const closeButtonX = INVENTORY_WIDTH - 50; // ≈ 681.43
    const closeButtonY = 50;
    const closeButtonGameX = inventoryX + closeButtonX; // ≈ 809.43
    const closeButtonGameY = inventoryY + closeButtonY; // = 178

    const closeButtonPos = convertToScreenCoords(closeButtonGameX, closeButtonGameY);
    console.log('Clicking close button at:', closeButtonPos);
    await page.mouse.click(closeButtonPos.x, closeButtonPos.y);
    await page.waitForTimeout(500);

    const inventoryPanel = await page.locator('.inventory-panel');
    await expect(inventoryPanel).not.toBeVisible();

    // Delete the screenshot after the test (asynchronously)
    fs.unlink(path.resolve(screenshotPath), (err) => {
      if (err) {
        console.error('Error deleting screenshot:', err);
      } else {
        console.log(`Screenshot deleted: ${screenshotPath}`);
      }
    });
  });
});



// Helper: Convert game coordinates to screen coordinates
function convertToScreenCoords(position: { x: any; y: any; }, bounds: { x: any; y: any; width?: number; height?: number; }, scaleX: number, scaleY: number) {
  return {
    x: bounds.x + position.x * scaleX,
    y: bounds.y + position.y * scaleY
  };
}

// Helper: Test a single set of positions 
async function testPositions(page: Page, positions: { x: number; y: number; }[], type: string) {
  const canvas = await page.waitForSelector('canvas[width="2048"][height="1152"]');
  const displayedBounds = await canvas.boundingBox();
  if (!displayedBounds) throw new Error('Could not get canvas bounds');

  const scaleX = displayedBounds.width / 2048;
  const scaleY = displayedBounds.height / 1152;

  // Open inventory and take initial screenshot
  const menuY = 1152 - 100; 
  const inventoryButtonPos = convertToScreenCoords({ x: 2048 - 400, y: menuY }, displayedBounds, scaleX, scaleY);
  console.log('Opening inventory at:', inventoryButtonPos);
  await page.mouse.click(inventoryButtonPos.x, inventoryButtonPos.y);
  await page.waitForTimeout(1000);

  const initialScreenshot = await page.screenshot({ path: `inventory-before-${type}.png` });

  // Close inventory
  const closeButtonGameX = (2048 / 16) + ((2048 / 2.8) - 50); 
  const closeButtonGameY = (1152 / 9) + 50;                  
  const closeButtonPos = convertToScreenCoords({ x: closeButtonGameX, y: closeButtonGameY }, displayedBounds, scaleX, scaleY);
  await page.mouse.click(closeButtonPos.x, closeButtonPos.y);
  await page.waitForTimeout(500);

  // Click each position in the provided list
  for (const position of positions) {
    const screenPos = convertToScreenCoords(position, displayedBounds, scaleX, scaleY);
    console.log(`Clicking ${type} at map position (${position.x}, ${position.y}) -> screen position (${Math.round(screenPos.x)}, ${Math.round(screenPos.y)})`);
    await page.mouse.click(screenPos.x, screenPos.y);
    await page.waitForTimeout(1000);
  }

  // Reopen inventory and take another screenshot
  await page.mouse.click(inventoryButtonPos.x, inventoryButtonPos.y);
  await page.waitForTimeout(1000);
  const updatedScreenshot = await page.screenshot({ path: `inventory-after-${type}.png` });

  // Compare screenshots
  expect(initialScreenshot).not.toEqual(updatedScreenshot);

  // Optionally close the inventory
  await page.mouse.click(closeButtonPos.x, closeButtonPos.y);
  await page.waitForTimeout(500);
}

// Test Suite for Humans
test.describe('Human Inventory Test', () => {
  test('should add human to inventory after interaction', async ({ page }) => {
    await page.goto('http://localhost:5173/game');
    await testPositions(page, humanPositions, 'human');
  });
});

// Test Suite for Pink Cars
test.describe('Pink Car Inventory Test', () => {
  test('should add pink car to inventory after interaction', async ({ page }) => {
    await page.goto('http://localhost:5173/game');
    await testPositions(page, pinkCarPositions, 'pinkcar');
  });
});

//compare inventory before game and after playing game
test.describe('Inventory Screenshot Comparison Test', () => {
  test('should compare inventory before and after interaction', async ({ page }) => {
    await page.goto('http://localhost:5173/game');
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

    // Compare the initial and final screenshots
    const initialScreenshot = fs.readFileSync(initialScreenshotPath);
    const finalScreenshot = fs.readFileSync(finalScreenshotPath);
    expect(initialScreenshot).not.toEqual(finalScreenshot);

    // Optionally, clean up the screenshots after comparison
    fs.unlinkSync(initialScreenshotPath);
    fs.unlinkSync(finalScreenshotPath);
  });
});

test.describe('check if frontend value matches backend', () =>{

});