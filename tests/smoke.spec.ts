import { test, expect } from "@playwright/test";

test("guest login to share flow", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Continue as Guest" }).click();

  await page.getByPlaceholder("Your name").fill("Alex");
  await page.setInputFiles('input[type="file"]', "public/templates/birthday.svg");
  await page.getByRole("button", { name: "Save profile and continue" }).click();

  await expect(page.getByRole("heading", { name: /Welcome, Alex/i })).toBeVisible();

  await page.getByRole("button", { name: "Birthday Blast" }).click();
  await expect(page.getByRole("heading", { name: "Birthday Blast" })).toBeVisible();

  await page.getByRole("button", { name: "Generate Preview" }).click();
  await expect(page.getByAltText("Merged greeting output")).toBeVisible();
});

