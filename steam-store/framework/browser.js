const { expect, test} = require('@playwright/test');

exports.Browser = class Browser {
    constructor(page) {
        this.page = page;
    }
    async navigateToMainPage() {
        await this.page.goto('/');
    }
}
