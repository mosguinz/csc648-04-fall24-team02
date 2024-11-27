import { test, expect, Page } from '@playwright/test';

// Use type-only imports to prevent runtime imports
import type Phaser from 'phaser';

// Import MainGameScene and CraftingMenu to provide type information
import MainGameScene, { mainGameCursor } from '../src/game/scenes/base/mainGame';
import CraftingMenu from '../src/game/scenes/ui/craftingMenu';
import { GameData } from '../src/game/stores/gameData';

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

// Function to disable animations and pause game objects
async function disableAnimationsAndPauseObjects(page: Page) {
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

  // Pause Phaser tweens and animations
  await page.evaluate(() => {
    const game = window.game;
    if (game) {
      Object.values(game.scene.scenes).forEach((scene: any) => {
        if (scene.tweens) {
          scene.tweens.pauseAll();
        }
        if (scene.humanSprites) {
          Object.values(scene.humanSprites).forEach((sprite: any) => {
            sprite.anims.pause();
          });
        }
        if (scene.treeSprites) {
          Object.values(scene.treeSprites).forEach((sprite: any) => {
            sprite.anims.pause();
          });
        }
        if (scene.carSprites) {
          Object.values(scene.carSprites).forEach((sprite: any) => {
            sprite.anims.pause();
          });
        }
      });
    }
  });
}

// Function to collect a resource by its ID
async function collectResourceById(
  page: Page,
  resourceType: 'human' | 'tree' | 'car',
  id: number
) {
  await page.evaluate(
    ({ resourceType, id }) => {
      const game = window.game;
      if (game) {
        // Get the MainGameScene with proper typing
        const mainScene = game.scene.getScene<MainGameScene>('MainGameScene');
        if (mainScene) {
          // Access the sprites
          const sprites = (mainScene as any)[`${resourceType}Sprites`] as {
            [id: number]: Phaser.GameObjects.Sprite;
          };
          const sprite = sprites[id];
          if (sprite && sprite.visible) {
            // Update the GameData with the collected resource
            const resourceIndex = window.GameData.resources.findIndex(
              (r) => r.resource_type_id === 1
            );
            if (resourceIndex !== -1) {
              window.GameData.resources[resourceIndex].quantity++;
            }
            // Optionally, you can also play a resource collection animation or effect here
          }
        }
      }
    },
    { resourceType, id }
  );
}

// Function to navigate to the game and collect a resource
async function navigateToGameAndCollectResource(page: Page) {
  await page.goto('http://localhost:5173/game');
  await page.waitForSelector('canvas', { timeout: 10000 });

  // Initialize GameData
  await GameData.populateInventory();
  await GameData.populateMiners();

  //await page.getByText('START').click();
  await page.waitForTimeout(2000);

  await disableAnimationsAndPauseObjects(page);

  // Click the first human sprite (id: 1) and update GameData
  await collectResourceById(page, 'human', 1);

  // Wait for the resource to be added to GameData
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
      game.scene.isActive(CraftingMenu)
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