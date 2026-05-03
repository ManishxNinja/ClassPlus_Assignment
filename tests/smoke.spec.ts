import { test, expect } from "@playwright/test";

test("email login to share flow", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel(/email address/i).fill("alex@example.com");
  await page.getByRole("button", { name: "Continue with email" }).click();

  await page.getByLabel(/display name/i).fill("Alex");
  await page.setInputFiles('input[type="file"]', "public/templates/birthday.svg");
  await page.getByRole("button", { name: "Continue to templates" }).click();

  await expect(page.getByRole("heading", { name: /Hello, Alex/i })).toBeVisible();

  await page.getByRole("button", { name: /Sunburst Party/i }).click();
  await expect(page.getByRole("heading", { name: "Birthday Blast" })).toBeVisible();

  await page.getByRole("button", { name: "Generate preview" }).click();
  await expect(page.getByAltText("Merged greeting output")).toBeVisible();
});
