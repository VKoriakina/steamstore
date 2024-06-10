const { expect, test } = require('@playwright/test');
import { MainMenu} from "./main-menu";
const {getLocalization} = require('../test-data/localization/getLocalization');

export class MainPage {

    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.mainMenu = new MainMenu(page);

    }

    async navigateMenu(menu, submenu) {
        await test.step(`Navigate to ${this.currentLocale.subMenu}`, async ()=>{
            await this.mainMenu.navigateMenuItem(menu);
            await this.mainMenu.selectSubMenuItem(submenu);
        })
    }



}
