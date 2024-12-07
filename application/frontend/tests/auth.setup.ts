import { test as setup, expect } from "@playwright/test"
import { firstSuperuser, firstSuperuserPassword } from "./config.ts"

const authFile = "playwright/.auth/user.json"

setup("authenticate", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/login")
  //await page.waitForLoadState("networkidle")

  // Disable animations
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        transition: none !important;
        animation: none !important;
      }
    `,
  })

  // Ensure the login form is present
  await expect(page.getByPlaceholder("Email")).toBeVisible()
  await expect(page.getByPlaceholder("Password")).toBeVisible()

  // Fill in the form
  await page.getByPlaceholder("Email").fill(firstSuperuser)
  await page.getByPlaceholder("Password").fill(firstSuperuserPassword)

  // Ensure the "Log In" button is visible and enabled
  const loginButton = page.getByRole("button", { name: "Log In" })
  await expect(loginButton).toBeVisible()
  await expect(loginButton).toBeEnabled()

  // Click the "Log In" button
  await loginButton.click()

  // Wait for navigation to the homepage
  await page.waitForURL("/")

  // Save authentication state
  await page.context().storageState({ path: authFile })
})