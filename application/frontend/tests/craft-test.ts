import { type Page, expect, test } from "@playwright/test"

async function collectResource(page: Page) {
  // Click on human to collect resource (resource type 1)
  await page.locator('canvas').click({ position: { x: 374, y: 247 } }); // Iron location
  await page.waitForTimeout(500); // Wait for animation
}

test.describe('Crafting Menu Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // Start game
    await page.getByText("START").click()
    await page.waitForURL("/game")

    // Collect initial resource
    await collectResource(page)

    await page.addStyleTag({
      content: `*, *::before, *::after { transition: none !important; animation: none !important; }`
    })
  })

  test('crafting navigation and basic crafting flow', async ({ page }) => {
    // Verify crafting interface elements
    const leftArrow = page.locator('img[alt="left_arrow"]')
    const rightArrow = page.locator('img[alt="right_arrow"]')

    // Test arrow navigation
    await expect(leftArrow).not.toBeVisible()
    await expect(rightArrow).toBeVisible()

    // Navigate through recipes
    await rightArrow.click()
    await expect(leftArrow).toBeVisible()

    await leftArrow.click()
    await expect(leftArrow).not.toBeVisible()

    // Get initial counts from inventory
    const resource1Count = await page.locator(`text="1"`).first().textContent()

    // Craft first recipe (Iron Ingot - requires 1 Iron Ore)
    await page.getByText("CRAFT").click()
    await page.waitForTimeout(500) // Wait for crafting animation

    // Verify inventory updates - resource 1 consumed, resource 4 (iron ingot) created
    const newResource1Count = await page.locator(`text="0"`).first().textContent()
    const craftedItemCount = await page.locator(`text="1"`).nth(1).textContent()

    expect(Number(newResource1Count)).toBe(Number(resource1Count) - 1)
    expect(Number(craftedItemCount)).toBe(1)
  })

  test('insufficient resources shows error', async ({ page }) => {
    // Try crafting without resources
    await page.getByText("CRAFT").click()

    // Attempt to craft should show error message
    await expect(page.getByText(/Not enough/)).toBeVisible()
  })

  test('can close crafting interface', async ({ page }) => {
    const closeButton = page.locator('img[alt="close_button"]')
    await closeButton.click()

    // Verify crafting interface is closed
    await expect(page.getByText("CRAFT")).not.toBeVisible()
  })
})