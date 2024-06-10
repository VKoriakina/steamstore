import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://store.steampowered.com/category/action/?flavor=popularpurchaseddiscounted');
    const discountRoot = page.locator(".NO-IPpXzHDNjw_TLDlIo7")
    await discountRoot.waitFor({
        state: 'visible'
    });

    const locators = discountRoot.locator(".Discounted ._2fpFvkG2gjtlAHB3ZxS-_7");
    const discounts = (await locators.allInnerTexts()).map((discountString) => Math.abs(Number.parseFloat(discountString)));

    const max = Math.max(...discounts);
    console.log(await discountRoot.locator(".Panel").nth(discounts.indexOf(max)).innerText());

});