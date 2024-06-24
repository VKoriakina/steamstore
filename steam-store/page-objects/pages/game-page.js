import {getLocalization} from "../menu/getLocalization";
const { expect, test } = require('@playwright/test');
import {MainMenu} from "../menu/main-menu";

export class GamePage {
    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.mainMenu = new MainMenu(page);
        this.currentName = page.locator("#appHubAppName");
    }
    async checkGameName(name) {
        const currentGameName = await this.currentName.innerText();
        return currentGameName === name;
    }
    async navigateAboutSteam(){
        await this.mainMenu.navigateAboutPage();
    }
}
