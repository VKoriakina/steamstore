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
        this.nameLocator = this.rootGameLocator.locator ('.StoreSaleWidgetTitle');
        this.linkLocator = this.rootGameLocator.locator('._2Va3O50Z5ksJJcpvj-JFDI a');
        this.gameTableLocator = this.page.locator('.hWbTIbfDv_T6qCKW7NQHG');
    }


    async navigateSubMenu(name) {
        await test.step(`Navigate to ${this.currentLocale.menuActions}`, async () => {
            await this.page.waitForLoadState('load');
            await this.page.keyboard.press('End');
            await this.gameTableLocator.scrollIntoViewIfNeeded();
            await this.mainMenu.selectMenuAction(name);
        })
    }


    /**
     * Find game with max
     * @returns {Promise<{gameName: string, gameLink: string}>}
     */
    async findMaxDiscGame() {
        await test.step(`Wait for loading`, async () => {
            await this.page.waitForLoadState('load');
        })
            const locators = this.discountLocator;
            const discounts = (await locators.allInnerTexts()).map((discountString) => Math.abs(Number.parseFloat(discountString)));

            const max = Math.max(...discounts); //spread operator

            const gameName = await this.nameLocator.nth(discounts.indexOf(max)).innerText();

            const gameLink = await this.linkLocator.nth(discounts.indexOf(max)).getAttribute("href");
            //"https://store.steampowered.com/app/271590/Grand_Theft_Auto_V?snr=1_241_4_action_100722"; // example of game with age check

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
    async openGame (url) {
        await test.step(`Open game with MAX discount`, async () => {
            await this.page.goto(url);
        })
    }


}
