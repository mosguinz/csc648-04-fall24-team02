import { test, Page } from '@playwright/test';

// Helper functions from manual crafting remain the same
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

// Test automated crafting using CrafterPlacementScene
test.describe('Automated Crafting Test', () => {
    test('should complete automated crafting workflow', async ({ page }) => {
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
                height: canvas.clientHeight,
            };
        });

        console.log('Canvas display size:', displaySize);
        if (!displaySize) {
            throw new Error('Could not get canvas display size');
        }

        const scale = {
            x: displaySize.width / 2048,
            y: displaySize.height / 1152,
          };


        // 1: Open Build Menu
        const buildMenuButton = calculateScreenPosition(
            { x: 2048 - 200, y: 1152 - 100 }, // Coordinates for CrafterPlacementMenu button
            bounds,
            scale,
            1
        );
        await page.mouse.click(buildMenuButton.x, buildMenuButton.y);
        await page.waitForTimeout(1000);

        // 2: Build a crafter
        const crafterIcon = calculateScreenPosition(
            { x: 1790, y: 522 }, // Coordinates for Crafter icon
            bounds,
            scale,
            1
        );
        await page.mouse.click(crafterIcon.x, crafterIcon.y);
        await page.waitForTimeout(1000);


        // 3: Click build button
        const buildButton = calculateScreenPosition(
            { x: 1067, y: 172 }, // Coordinates for Build button
            bounds,
            scale,
            1
        );
        await page.mouse.click(buildButton.x, buildButton.y);
        await page.waitForTimeout(1000);

        
    });
});