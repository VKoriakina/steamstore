const { expect, test } = require('@playwright/test');
import {MainMenu} from "../menu/main-menu";
const {getLocalization} = require('../menu/getLocalization');

export class MainPage {
    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.mainMenu = new MainMenu(page);
    }
    async navigateMenu(menu, submenu) {
        await this.mainMenu.navigateMenu(menu, submenu);
    }
}
