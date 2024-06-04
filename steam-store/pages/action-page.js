const { expect, test } = require('@playwright/test');
import { MainMenu} from "./main-menu";

export class ActionPage {

    constructor(page) {
        this.page = page;
        this.mainMenu = new MainMenu(page);
        this.rootGameLocator = page.locator('//div[@class = "y9MSdld4zZCuoQpRVDgMm"]');
        this.discountLocator = this.rootGameLocator.locator('div._1gO7r6Xr5gQHoBBkERY0gd');
        this.nameGameLocator = this.rootGameLocator.locator('div._1F4bcsKc9FjeWQ2TX8CWDe');
    }


    async navigateSubMenu(name) {
        await test.step(`Navigate to ${name}`, async () => {
            // const ActionPromise = this.page.waitForResponse('**/action/**');
            await this.page.keyboard.down('End');
            await this.mainMenu.selectMenuAction(name);
            // await ActionPromise;
        })
    }

    // Выбор игры с максимальной скидкой
    async selectMaxDisc() {
        const discountElements = await this.discountLocator.all();
        const nameGameElements = await this.nameGameLocator.all();

        // Убедиться, что есть хотя бы один элемент
        expect(discountElements.length, 'should have at least one item').toBeGreaterThan(0);

        // Получить значения скидок
        const discounts = await Promise.all(discountElements.map(async element => {
            const discountText = await element.innerText();
            const discountValue = parseInt(discountText.replace('%', ''), 10);
            return discountValue;
        }));

        // Найти максимальную скидку
        const maxDiscount = Math.max(...discounts);
        const maxDiscountIndex = discounts.indexOf(maxDiscount);

        // Получить название игры с максимальной скидкой
        const gameName = await nameGameElements[maxDiscountIndex].innerText();
        console.log(`Игра с максимальной скидкой: ${gameName}`);

        // Кликнуть на элемент с максимальной скидкой
        await discountElements[maxDiscountIndex].click();

        return gameName;
    }

}
