import { test, expect} from '../../fixtures';
import {Browser} from '../framework/browser';
import {MainPage } from '../pages/main-page';
import {ActionPage} from "../pages/action-page";

test('game with maximum discount', async ({page, }, testInfo) => {

    const browser = new Browser(page);
    const mainPage = new MainPage(page);
    const actionPage =new ActionPage(page);

    await browser.navigateToMainPage();
    await mainPage.selectLanguage('Deutsch');
    await mainPage.navigateMenu('Kategorien', 'Action');
    await actionPage.navigateSubMenu('Im Angebot');
    const gameName = await actionPage.selectMaxDisc();
    console.log(`Выбранная игра: ${gameName}`);


});