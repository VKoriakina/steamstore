const { expect, test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const {getLocalization} = require('../test-data/localization/getLocalization');

export class MainMenu {

    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.menuLocator = this.page.locator(`//a[@class='pulldown_desktop' and text()='${this.currentLocale.menu}']`);
        this.subMenuLocator = this.page.locator(`//a[@class='gutter_item' and contains(text(), '${this.currentLocale.subMenu}')]`);
        this.menuActionLocator = this.page.locator(`//div[@class='Dhg57Pg1m91mAChUNE5_V Focusable' and contains(text(), '${this.currentLocale.menuActions}')]`);

    }

    installPageLocator() {
        return this.page.locator('div.header_installsteam_btn_content');
    }

    installLocator(){
        return this.page.locator('//div[@class="about_greeting_header"]/following-sibling::div');
    }


async navigateMenuItem() {
        await this.menuLocator.hover();
    }

    async selectSubMenuItem() {
        await this.subMenuLocator.click();
    }

    async selectMenuAction(){
        await this.menuActionLocator.click();

    }
    async installSteam() {
        await this.installPageLocator().click();
        const downloadPromise = this.page.waitForEvent('download');
       await this.installLocator().click();
        const download = await downloadPromise;
        await download.path();
        const downloadPath = path.join('/Users/tina/Desktop/js_playwright_1/steam/', download.suggestedFilename());
        console.log(`Download path: ${downloadPath}`);
        await download.saveAs(downloadPath);
        expect(fs.existsSync(downloadPath)).toBeTruthy();
        await fs.promises.unlink(downloadPath);
        }

}



