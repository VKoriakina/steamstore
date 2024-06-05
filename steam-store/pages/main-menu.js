const { expect, test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

export class MainMenu {

    constructor(page) {
        this.page = page;
        this.languageLocator = page.locator('//span[@class ="pulldown global_action_link"]');

    }

    installPageLocator() {
        return this.page.locator('div.header_installsteam_btn_content');
    }

    installLocator(){
        return this.page.locator('//div[@class="about_greeting_header"]/following-sibling::div');
    }

    mainMenuLocator(item) {
        return this.page.locator(`//a[@class='pulldown_desktop' and text()='${item}']`);
    }

    SubMenuLocator(item) {
        return this.page.locator(`//a[@class='gutter_item' and contains(text(), '${item}')]`);
    }

    menuActionLocator(item){
        return this.page.locator(`//div[@class='Dhg57Pg1m91mAChUNE5_V Focusable' and contains(text(), '${item}')]`);
    }

    async languageDetermination() {
        const languageText = await this.languageLocator.textContent();
        if (languageText.includes('language')) {
            return this.loadLanguageData('EN.json');
        } else if (languageText.includes('Sprache')) {
            return this.loadLanguageData('DE.json');
        } else {
            throw new Error(`Unsupported language text: ${languageText}`);
        }
    }

    async loadLanguageData(fileName) {
        const filePath = path.resolve(__dirname, `../test-data/localization/${fileName}`);
        const jsonData = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
    }


async navigateMenuItem(name) {
        await this.mainMenuLocator(name).hover();
    }

    async selectSubMenuItem(name) {
        await this.SubMenuLocator(name).click();
    }

    async selectMenuAction(name){
        await this.menuActionLocator(name).click();

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



