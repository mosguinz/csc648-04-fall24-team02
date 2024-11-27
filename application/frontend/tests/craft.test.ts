import { test, expect, Page } from '@playwright/test';

// Use type-only imports to prevent runtime imports
import type Phaser from 'phaser';

// Import types only
import type MainGameScene from '../src/game/scenes/base/mainGame';
import { GameData } from '../src/game/stores/gameData'; // Adjust this path accordingly

test.setTimeout(60000);

// Extend the Window interface
declare global {
  interface Window {
    GameData: typeof GameData;
    game: Phaser.Game;
  }
}

// Define interfaces for resources
interface ResourceBase {
  resource_type_id: number;
  quantity: number;
}

// Function to disable animations for testing
async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        transition: none !important;
        animation: none !important;
      }
    `
  });

  // Pause Phaser animations and movements
  await page.evaluate(() => {
    const game = window.game;
    if (game) {
      Object.values(game.scene.scenes).forEach((scene: Phaser.Scene & { tweens?: Phaser.Tweens.TweenManager }) => {
        if (scene.tweens) {
          scene.tweens.pauseAll();
        }
      });

      // Pause all animations globally
      game.anims.pauseAll();
    }
  });
}

// Function to simulate clicking a resource by its ID
async function clickResourceById(
  page: Page,
  resourceType: 'human' | 'tree' | 'car',
  id: number
) {
  // Lock sprite position and ensure interactivity
  await page.evaluate(
    ({ resourceType, id }) => {
      const game = window.game;
      if (game) {
        const mainScene = game.scene.getScene('MainGameScene') as any;
        if (mainScene) {
          const sprites = mainScene[`${resourceType}Sprites`] as {
            [id: number]: Phaser.GameObjects.Sprite;
          };

          const sprite = sprites[id];
          if (sprite) {
            // Lock sprite position to ensure static interaction
            sprite.setX(200); // Static position for testing
            sprite.setY(300);

            // Ensure sprite is interactive
            sprite.setInteractive();

            // Emit the pointerdown event on the sprite
            sprite.emit('pointerdown');
          }
        }
      }
    },
    { resourceType, id }
  );

  await page.waitForTimeout(500); // Wait for resource collection
}

// Function to navigate to the game and collect a resource
async function navigateToGameAndCollectResource(page: Page) {
  await page.goto('http://localhost:5173/game');
  await page.waitForSelector('canvas', { timeout: 10000 });

  //await page.getByText('START').click();
  await page.waitForTimeout(2000);

  await disableAnimations(page);

  // Click the first human sprite (id: 0)
  await clickResourceById(page, 'human', 0);

  // Wait for resource to be added
  await page.waitForFunction(() => {
    return (
      window.GameData &&
      window.GameData.resources &&
      window.GameData.resources.some(
        (r: ResourceBase) => r.resource_type_id === 1 && r.quantity > 0
      )
    );
  });
}

// Function to open the crafting menu
async function openCraftingMenu(page: Page) {
  const menuButton = page.locator('img[alt="craft_icon"]');
  await menuButton.waitFor({ state: 'visible' });
  await menuButton.click();

  await page.waitForFunction(() => {
    const game = window.game;
    return (
      game &&
      game.scene &&
      game.scene.isActive('CraftingMenu')
    );
  });
}

// Test case for completing the crafting flow
test('complete crafting flow', async ({ page }) => {
  await navigateToGameAndCollectResource(page);
  await openCraftingMenu(page);

  const leftArrow = page.locator('img[alt="left_arrow"]');
  const rightArrow = page.locator('img[alt="right_arrow"]');

  await expect(leftArrow).not.toBeVisible();
  await expect(rightArrow).toBeVisible();

  const craftButton = page.getByText('CRAFT');
  await craftButton.click();

  // Wait for the crafted item to be added to resources
  await page.waitForFunction(() => {
    return (
      window.GameData &&
      window.GameData.resources &&
      window.GameData.resources.some(
        (r: ResourceBase) => r.resource_type_id === 4 && r.quantity > 0
      )
    );
  });

  const closeButton = page.locator('img[alt="close_button"]');
  await closeButton.click();

  await expect(craftButton).not.toBeVisible();
});

// Test case for handling insufficient resources when crafting
test('insufficient resources message', async ({ page }) => {
  await navigateToGameAndCollectResource(page);
  await openCraftingMenu(page);

  // Use up the resource by crafting once
  await page.getByText('CRAFT').click();
  await page.waitForTimeout(500);

  // Try crafting again without enough resources
  await page.getByText('CRAFT').click();

  // Expect an error message about insufficient resources
  await expect(
    page.getByText('Not enough resources to craft item.')
  ).toBeVisible();
});

// Debugging sprite state during the test
test('debug human sprite state', async ({ page }) => {
  await page.goto('http://localhost:5173/game');
  await page.waitForSelector('canvas', { timeout: 10000 });

  await page.evaluate(() => {
    const game = window.game;
    if (game) {
      const mainScene = game.scene.getScene('MainGameScene') as any;
      if (mainScene) {
        const sprite = mainScene.humanSprites[0]; // Adjust index as needed
        console.log('Sprite state:', {
          x: sprite?.x,
          y: sprite?.y,
          visible: sprite?.visible,
          interactive: sprite?.input?.enabled,
        });
      }
    }
  });
});
