import { test, expect} from '../../fixtures';
import {Browser} from '../framework/browser';
import {MainPage } from '../pages/main-page';
import {ActionPage} from "../pages/action-page";
import {AgeConfirm} from "../pages/age-check";

test('game with maximum discount', async ({page, clientAge} ) => {

    const browser = new Browser(page);
    const mainPage = new MainPage(page);
    const actionPage =new ActionPage(page);
    const ageCheck = new AgeConfirm(page);

    await browser.navigateToMainPage();
    await mainPage.navigateMenu();
    await actionPage.navigateSubMenu();
    await page.pause();
    const game = await actionPage.findMaxDiscGame();

    await actionPage.openGame(game.gameLink);

    if (page.url().includes("agecheck")){
        await ageCheck.confirmAge();
    }
    await checkGameName();

    // await page.pause();
    // await actionPage.downloadingInstaller();


});