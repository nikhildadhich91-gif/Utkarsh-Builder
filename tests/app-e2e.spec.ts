import { test, expect } from "@playwright/test";

test.describe("Foundational E2E Coverage", () => {

  // 1. Initial Page Load and Preloader verification
  test("1. Verify Page Preloader behaves correctly and fades out", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    const logo = page.locator('img[alt="Utkarsh Builder"]').first();
    // Expect preloader logo to fade/hide within 5 seconds
    await expect(logo).toBeHidden({ timeout: 5000 });
  });

  // 2. Navigation and Page Transitions
  test("2. Verify header navigation works across routes", async ({ page }) => {
    await page.goto("/");
    
    // Find nav links pointing to /about, /services, or /projects
    const navLinks = page.locator('nav a[href*="/about"], nav a[href*="/services"]');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      await navLinks.first().click();
      await expect(page).not.toHaveURL("/");
    }
  });

  // 3. Responsive Layout Checks (Viewport variations)
  test("3. Verify no horizontal overflow scrollbar on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    
    const hasHorizontalScroll = await page.evaluate(
      () => document.body.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalScroll).toBe(false);
  });

  // 4. Dynamic Mobile Menu Toggling
  test("4. Verify mobile menu button toggles menu drawer visibility", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    
    // Select the mobile toggle button
    const toggleBtn = page.locator('button[aria-label="Toggle menu"]').first();
    const count = await toggleBtn.count();
    
    if (count > 0) {
      // Find the mobile navigation drawer container
      const drawer = page.locator('div[class*="fixed inset-0 z-40 bg-[#FAF7F5]"]').first();
      
      // Initially, it should not have opacity-100 class
      await expect(drawer).not.toHaveClass(/opacity-100/);
      
      // Click toggle button to open menu
      await toggleBtn.click();
      
      // Now, it should have opacity-100 class
      await expect(drawer).toHaveClass(/opacity-100/);
    }
  });
});
