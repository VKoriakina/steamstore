const { expect, test } = require('@playwright/test');
const EN = require('../test-data/localization/EN.json');
const DE = require('../test-data/localization/DE.json');

export class MainMenu {

    constructor(page) {
        this.page = page;
        this.langaugeDropdownLocator = page.locator('//span[@id="language_pulldown"]');

    }

    languageLocator(item) {
        return this.page.locator(`//a[@class ="popup_menu_item tight" and contains(text(), '${item}')]`);
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

    // метод определения языка
 //    async languageDetermination (name){
 // if (await this.langaugeDropdownLocator.innerText('language'))
 // {
 //    expect
 // }
 // else if (await this.langaugeDropdownLocator.innerText('English'))
 // {
 //    expect
 // }

    // }


    // в зависимости от результата, переходим или нет.  Если English or Language - это значит стоит Инглиш и использовать данные с файла EN.json,
    //    или меняем на немецкий и берем только названия с DE.json

    async selectLanguage(name){
            await this.langaugeDropdownLocator.click();
            await this.languageLocator(name).click();
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


}



