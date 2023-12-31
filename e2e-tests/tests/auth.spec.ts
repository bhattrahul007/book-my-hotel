import { test, expect } from "@playwright/test";

const ui_uri = "http://localhost:5173";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(ui_uri);

  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("comcom");

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page.getByText("Sign in successfull.")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to signup", async ({ page }) => {
  const test_email = `testaccount${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(ui_uri);
  await page.getByRole("link", { name: "Sign in" }).click();
  expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.getByRole("link", { name: "Create an account" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("Test");
  await page.locator("[name=lastName]").fill("Account");
  await page.locator("[name=email]").fill(test_email);
  await page.locator("[name=password]").fill("tester123");
  await page.locator("[name=confirmPassword]").fill("tester123");

  await page.getByRole("button", { name: "Create an account" }).click();

  await expect(page.getByText("Account created")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
