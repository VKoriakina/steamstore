const { expect, test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const {getLocalization} = require('../menu/getLocalization');

export class InstallSteam {

    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
    }

    installPageLocator() {
        return this.page.locator('div.header_installsteam_btn_content');
    }

    installLocator(){
        return this.page.locator('//div[@class="about_greeting_header"]/following-sibling::div');
    }

    async installSteam() {
        await this.installPageLocator().click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.installLocator().click();
        const download = await downloadPromise;
        await download.path();
        const downloadPath = path.join('D:\\tina\\Desktop\\js_playwright_1\\steam', download.suggestedFilename());
        console.log(`Download path: ${downloadPath}`);
        await download.saveAs(downloadPath);
        expect(fs.existsSync(downloadPath)).toBeTruthy();
        await fs.promises.unlink(downloadPath);
    }

}



