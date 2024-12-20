import { type Page, expect, test } from "@playwright/test"
import { firstSuperuser, firstSuperuserPassword } from "./config.ts"
import { randomPassword } from "./utils/random.ts"

test.use({ storageState: { cookies: [], origins: [] } })

type OptionsType = {
  exact?: boolean
}

const fillForm = async (page: Page, email: string, password: string) => {
  await page.getByPlaceholder("Email").fill(email)
  await page.getByPlaceholder("Password", { exact: true }).fill(password)
}

const verifyInput = async (
  page: Page,
  placeholder: string,
  options?: OptionsType,
) => {
  const input = page.getByPlaceholder(placeholder, options)
  await expect(input).toBeVisible()
  await expect(input).toHaveText("")
  await expect(input).toBeEditable()
}

test("Inputs are visible, empty and editable", async ({ page }) => {
  await page.goto("/login")

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

  await verifyInput(page, "Email")
  await verifyInput(page, "Password", { exact: true })
})

test("Log In button is visible", async ({ page }) => {
  await page.goto("/login")

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

  await expect(page.getByRole("button", { name: "Log In" })).toBeVisible()
})

test("Forgot Password link is visible", async ({ page }) => {
  await page.goto("/login")

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

  await expect(
    page.getByRole("link", { name: "Forgot password?" }),
  ).toBeVisible()
})

test("Log in with valid email and password", async ({ page }) => {
  await page.goto("/login")

  // Disable animations
  await page.addStyleTag({
    content: `
      * {
        transition: none !important;
        animation: none !important;
      }
    `,
  })

  // Fill in the form
  await fillForm(page, firstSuperuser, firstSuperuserPassword)

  // Get the login button
  const loginButton = page.getByRole("button", { name: "Log In" })

  // Ensure the button is visible and enabled
  await loginButton.waitFor({ state: 'visible' })
  await expect(loginButton).toBeEnabled()
  // Wait for any potential overlays to disappear
  await page.locator('.overlay').waitFor({ state: 'hidden' })
  // Click the login button
  await loginButton.click({ timeout: 60000 })



  // Wait for navigation to the homepage
  await page.waitForURL("/")
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
  // Verify successful login
  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()
})



test("Log in with invalid email", async ({ page }) => {
  await page.goto("/login")

  // Disable animations
  await page.addStyleTag({
    content: `
      * {
        transition: none !important;
        animation: none !important;
      }
    `,
  })

  await fillForm(page, "invalidemail", firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await expect(page.getByText("Invalid email address")).toBeVisible()
})


test("Log in with invalid password", async ({ page }) => {
  const password = randomPassword()

  await page.goto("/login")
  await page.waitForLoadState('networkidle')

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

  // Fill the form
  await fillForm(page, firstSuperuser, password)

  // Ensure the "Log In" button is visible and enabled
  const loginButton = page.getByRole("button", { name: /Log\s*In/i })
  await expect(loginButton).toBeVisible()
  await expect(loginButton).toBeEnabled()

  // Click the "Log In" button
  await loginButton.click()

  // Verify the error message is visible
  await expect(page.getByText(/Incorrect email or password/i)).toBeVisible()
})


// Log out

test("Successful log out", async ({ page }) => {
  await page.goto("/login")
  await page.waitForLoadState("networkidle")
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

  await fillForm(page, firstSuperuser, firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await page.waitForURL("/")

  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()

  await page.getByTestId("user-menu").click()
  await page.getByRole("menuitem", { name: "Log out" }).click()
  await page.waitForURL("/login")
})

test("Logged-out user cannot access protected routes", async ({ page }) => {
  await page.goto("/login")

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

  await fillForm(page, firstSuperuser, firstSuperuserPassword)
  await page.getByRole("button", { name: "Log In" }).click()

  await page.waitForURL("/")

  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible()

  await page.getByTestId("user-menu").click()
  await page.getByRole("menuitem", { name: "Log out" }).click()
  await page.waitForURL("/login")

  await page.goto("/settings")
  await page.waitForURL("/login")
})
