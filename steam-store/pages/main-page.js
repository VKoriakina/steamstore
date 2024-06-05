const { expect, test } = require('@playwright/test');
import { MainMenu} from "./main-menu";

export class MainPage {

    constructor(page) {
        this.page = page;
        this.mainMenu = new MainMenu(page);

    }

    async navigateMenu(menu, submenu) {
        await test.step(`Navigate to ${submenu}`, async ()=>{
            await this.mainMenu.navigateMenuItem(menu);
            await this.mainMenu.selectSubMenuItem(submenu);
        })
    }



    async selectLanguage(name){
        await test.step('Select language', async ()=>{
            await this.mainMenu.selectLanguage(name);
        })
    }




}
