const { expect, test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const {getLocalization} = require('../menu/getLocalization');

export class AboutPage {
    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.installLocator = this.page.locator('//div[@class="about_greeting_header"]/following-sibling::div');
    }

    async installSteam() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.installLocator.click();
        const [download] = await Promise.all([
            downloadPromise,
            this.page.waitForLoadState('networkidle'),
        ]);

        const downloadPath = path.join(__dirname, download.suggestedFilename());
        await download.saveAs(downloadPath);
        expect(fs.existsSync(downloadPath)).toBeTruthy();
        await fs.promises.unlink(downloadPath);
    }

}

