const { expect, test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const {getLocalization} = require('./getLocalization');

export class MainMenu {
    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.aboutPageLocator = page.locator('div.header_installsteam_btn_content')
    }


    menuLocator(item){
        return this.page.locator(`//a[@class='pulldown_desktop' and text()='${item}']`)
    }

    subMenuLocator(item){
        return  this.page.locator(`//a[@class='gutter_item' and contains(text(), '${item}')]`);
    }

    menuActionLocator(item){
        return this.page.locator(`//div[contains(text(), '${item}')]`);
    }

    async navigateMenu(menu, submenu) {
        await this.menuLocator(menu).hover();
        await this.subMenuLocator(submenu).click();
    }

    async selectMenuAction(name) {
        await this.menuActionLocator(name).click();
    }
    async navigateAboutPage() {
        await this.aboutPageLocator.click();
    }
}
