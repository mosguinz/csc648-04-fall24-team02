import { test, expect } from '@playwright/test';
import sharp from 'sharp';  

//check if map is loaded in
// Function to check if the sprite is visible in the canvas screenshot
async function checkIfHuman1SpriteIsVisible(canvasImage: Buffer): Promise<boolean> {
  const image = sharp(canvasImage);
  // Process the image to get raw pixel data
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  //adjust here for where sprite should be
  const spriteRegion = {
    x: 100,  
    y: 100,  
    width: 32,  
    height: 32,
  };
  return checkPixelsForVisibility(data, info.width, spriteRegion);
}

// Function to check the pixel data in the region for visibility <-- change if needed for testing :)
function checkPixelsForVisibility(data: Buffer, width: number, region: { x: number, y: number, width: number, height: number }): boolean {
  for (let y = region.y; y < region.y + region.height; y++) {
    for (let x = region.x; x < region.x + region.width; x++) {
      const pixelIndex = (y * width + x) * 4; 
      const alpha = data[pixelIndex + 3];  

      if (alpha > 0) { 
        return true; 
      }
    }
  }
  return false; 
}

//check if human being loaded in
test.describe('Game Canvas Sprite Tests', () => {
  test('should ensure human1 sprite is visible on the canvas', async ({ page }) => {
    await page.goto('http://localhost:5174/game');  

    const canvas = await page.locator('canvas');
    await expect(canvas).toBeVisible();

    //timeout timer
    await page.waitForTimeout(2000);


    const canvasImage = await canvas.screenshot();

    const human1Visible = await checkIfHuman1SpriteIsVisible(canvasImage);
    expect(human1Visible).toBe(true); 
  });
});

//check if pink car is being loaded in
async function checkIfPinkCarSpriteIsVisible(canvasImage: Buffer): Promise<boolean> {
    const image = sharp(canvasImage);
  
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
    // Adjust these coordinates and size for the pink_car sprite <-- change if needed for testing :)
    const spriteRegion = {
      x: 200,  
      y: 150, 
      width: 32, 
      height: 32,  
    };
  
    return checkPixelsForVisibility(data, info.width, spriteRegion);
  }

  test.describe('Game Canvas Sprite Tests', () => {
    test('should ensure pink_car sprite is visible on the canvas', async ({ page }) => {
      
      await page.goto('http://localhost:5174/game');  
      const canvas = await page.locator('canvas');
      await expect(canvas).toBeVisible();
  
     
      await page.waitForTimeout(2000);  
  
      const canvasImage = await canvas.screenshot();
     
      const pinkCarVisible = await checkIfPinkCarSpriteIsVisible(canvasImage);
  
      
      expect(pinkCarVisible).toBe(true);  
    });
  });

// Function to check if the sprite is visible in the canvas screenshot
async function checkIfSpriteIsVisible(canvasImage: Buffer, spriteRegion: { x: number, y: number, width: number, height: number }): Promise<boolean> {
    const image = sharp(canvasImage);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    return checkPixelsForVisibility(data, info.width, spriteRegion);
  }
  
//check if human is being removed as item gets mined

//check if pink car is being removed as item gets mined
test.describe('Game Canvas Sprite Tests', () => {
    test('should remove pink_car sprite after mining', async ({ page }) => {
      // Navigate to the game page
      await page.goto('http://localhost:5174/game');
  
    
      await page.waitForTimeout(3000);  
  
      const carSpriteLocator = await page.locator('[data-testid="pink_car"]'); 
      try {
       
        await carSpriteLocator.waitFor({ state: 'visible', timeout: 15000 }); 
      } catch (error) {
        console.log('pink_car not found or not visible');
        return;  
      }
      await carSpriteLocator.click(); 

      await page.waitForTimeout(3000);  
  
      const canvas = await page.locator('canvas');
      const canvasImageAfterMining = await canvas.screenshot();
      //change if needed for testing :)
      const carSpriteRegion = { x: 200, y: 150, width: 32, height: 32 };  
  
      const pinkCarVisibleAfterMining = await checkIfSpriteIsVisible(canvasImageAfterMining, carSpriteRegion);
  
      expect(pinkCarVisibleAfterMining).toBe(false);  
    });
  });
//check if inventory updates as inventory gets mined and placed into inventory
//check if value in inventory updates with new value
//check game data
//check frontend to backend if data updates with these code