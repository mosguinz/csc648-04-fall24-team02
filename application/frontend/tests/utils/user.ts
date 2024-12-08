import { type Page, expect } from "@playwright/test";

export async function signUpNewUser(
  page: Page,
  name: string,
  email: string,
  password: string,
) {
  await page.goto("/signup");

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
  });

  await page.getByPlaceholder("Full Name").fill(name);
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password", { exact: true }).fill(password);
  await page.getByPlaceholder("Repeat Password").fill(password);

  // Ensure the "Sign Up" button is visible and enabled
  const signUpButton = page.getByRole("button", { name: /Sign\s*Up/i });
  await expect(signUpButton).toBeVisible();
  await expect(signUpButton).toBeEnabled();

  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(
    page.getByText("Your account has been created successfully"),
  ).toBeVisible();
  await page.goto("/login");
}

export async function logInUser(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        transition: none !important;
        animation: none !important;
      }
    `,
  });
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL("/");
  await expect(
    page.getByText("Welcome back, nice to see you again!"),
  ).toBeVisible();
}

export async function logOutUser(page: Page) {
  await page.getByTestId("user-menu").click();
  await page.getByRole("menuitem", { name: "Log out" }).click();
  await page.goto("/login");
}
