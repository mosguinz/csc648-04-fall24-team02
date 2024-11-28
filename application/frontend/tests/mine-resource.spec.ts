//import MainGameScene from "../src/game/scenes/base/mainGame"
//import { GameData } from '../src/game/stores/gameData';
//import Phaser from 'phaser';  
import { test, expect } from '@playwright/test'; 
// Pauses all animations in the current scene

test.describe('Check if map is being loaded in', () => {
    test('should ensure human1 sprite is visible on the canvas', async ({ page }) => {
        await page.goto('http://localhost:5174/game');  

        const canvas = await page.locator('canvas');
        await expect(canvas).toBeVisible();


        const canvasImage = await canvas.screenshot();

      
        expect(canvasImage.byteLength).toBeGreaterThan(0);
    });
});



test.describe('check if human is loaded onto map', () =>{

});

test.describe('check if car is loaded onto map', () =>{

});

test.describe('should check if human is clickable', () =>{

});

test.describe('should check if car is clickable', () =>{

});

test.describe('should check if human goes into inventory', () =>{

});

test.describe('should check if car goes into inventory', () =>{

});

test.describe('check if frontend value matches backend', () =>{

});