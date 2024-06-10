import {getLocalization} from "../test-data/localization/getLocalization";

const { expect, test } = require('@playwright/test');
import { MainMenu} from "./main-menu";
import{InstallSteam} from "./install-page";

export class GamePage {

    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.mainMenu = new MainMenu(page);
        this.installSteam = new InstallSteam(page);
        this.currentName = page.locator("#appHubAppName");

    }

    async checkGameName (name){
        await test.step(`Check game title ${name}`, async () => {
        const currentGameName = await this.currentName.innerText();
            return currentGameName === name;
    })
    }


    async downloadingInstaller(){
        await test.step('Download installer', async ()=>{
            await this.installSteam.installSteam();
        })
    }
}
