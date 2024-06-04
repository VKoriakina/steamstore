const { expect, test} = require('@playwright/test');
exports.Browser = class Browser {

    constructor(page) {
        this.page = page;

    }

    async navigateToMainPage() {
        await test.step(`Open site`, async () => {
            await this.page.goto('/');
        })

    }
}