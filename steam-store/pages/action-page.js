const { expect, test } = require('@playwright/test');
import { MainMenu} from "./main-menu";
const {getLocalization} = require('../test-data/localization/getLocalization');

export class ActionPage {

    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.mainMenu = new MainMenu(page);
        this.rootGameLocator = this.page.locator(".NO-IPpXzHDNjw_TLDlIo7");
        this.discountLocator = this.rootGameLocator.locator('.Discounted ._2fpFvkG2gjtlAHB3ZxS-_7');
        this.gamesLocator = this.rootGameLocator.locator('.Panel');
        this.nameLocator = this.rootGameLocator.locator ('.StoreSaleWidgetTitle');
        this.linkLocator = this.rootGameLocator.locator('._2Va3O50Z5ksJJcpvj-JFDI a');
    }


    async navigateSubMenu(name) {
        await test.step(`Navigate to ${this.currentLocale.menuActions}`, async () => {
            await this.page.waitForLoadState('load');
            await this.page.keyboard.press('End');
            await this.mainMenu.selectMenuAction(name);
        })
    }


    /**
     * Find game with max
     * @returns {Promise<{gameName: string, gameLink: string}>}
     */
    async findMaxDiscGame() {

        await this.page.waitForLoadState('load');

        const discountRoot = this.rootGameLocator;

        const locators = this.discountLocator;
        const discounts = (await locators.allInnerTexts()).map((discountString) => Math.abs(Number.parseFloat(discountString)));

        const max = Math.max(...discounts); //spread operator

       // console.log(await this.gamesLocator.nth(discounts.indexOf(max)).innerText());
       const gameName = await this.nameLocator.nth(discounts.indexOf(max)).innerText();
       console.log(gameName);

       const gameLink = await this.linkLocator.nth(discounts.indexOf(max)).getAttribute("href");
       console.log(gameLink);

       return {
           gameName,
           gameLink
       }

    }

    /**
     *
     * @param {string} url
     * @returns {Promise<void>}
     */
    async openGame (url){

    }




    async downloadingInstaller(){
        await test.step('Download installer', async ()=>{
            await this.mainMenu.installSteam();
        })
    }

}
