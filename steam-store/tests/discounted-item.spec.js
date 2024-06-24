import { test, expect} from '../../fixtures';
import {Browser} from '../framework/browser';
import {MainPage} from '../page-objects/pages/main-page';
import {ActionPage} from "../page-objects/pages/action-page";
import {AgeConfirmPage} from "../page-objects/pages/agecheck-page";
import {GamePage} from "../page-objects/pages/game-page"
import {AboutPage} from "../page-objects/pages/about-page"
import {getLocalization} from "../page-objects/menu/getLocalization";

let browser;

test.beforeEach(  async ({page}) =>{
        browser = new Browser(page);
        await test.step(`Open site`, async () => {
            await browser.navigateToMainPage();
        });
    }
)


test('game with maximum discount', async ({page, clientAge} ) => {

    const mainPage = new MainPage(page);
    const actionPage =new ActionPage(page);
    const ageCheckPage = new AgeConfirmPage(page);
    const gamePage = new GamePage(page);
    const aboutPage = new AboutPage(page);
    const currentLocale = getLocalization();
    let game;



    await test.step(`Navigate to ${currentLocale.subMenu}`, async ()=> {
        await mainPage.navigateMenu(currentLocale.menu, currentLocale.subMenu);
    });

    await test.step(`Navigate to ${currentLocale.menuActions}`, async () => {
        await actionPage.navigateSubMenu(currentLocale.menuActions);
    });


    await test.step(`Find game with maximum discount`, async () => {
        game = await actionPage.findMaxDiscountGame();
    });

    await test.step(`Open game with MAX discount`, async () => {
        await actionPage.openMaxDiscountedGame(game.gameLink);
    });

    if (page.url().includes("agecheck")){

        await test.step(`Enter client age`, async () => {
            await ageCheckPage.confirmAge(clientAge.date, clientAge.month, clientAge.year);
        })
    }

    await test.step(`Check game title ${game.gameName}`, async() => {
        await gamePage.checkGameName(game.gameName);
    });

    await test.step('Navigate to About Page', async() => {
        await gamePage.navigateAboutSteam();
    });

    await test.step('Download Steam.exe', async() => {
        await aboutPage.installSteam();
    });
});
