import { test, expect} from '../../fixtures';
import {Browser} from '../framework/browser';
import {MainPage } from '../pages/main-page';
import {ActionPage} from "../pages/action-page";
import{MainMenu} from "../pages/main-menu";

test('game with maximum discount', async ({page, EN, DE}, testInfo) => {

    const browser = new Browser(page);
    const mainPage = new MainPage(page);
    const actionPage =new ActionPage(page);
    const mainMenu =new MainMenu(page);

    await browser.navigateToMainPage();
    await mainMenu.languageDetermination();
    await mainPage.navigateMenu('Kategorien', 'Action');
    await actionPage.navigateSubMenu('Im Angebot');

    await actionPage.downloadingInstaller();


});