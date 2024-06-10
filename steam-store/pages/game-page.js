import {getLocalization} from "../test-data/localization/getLocalization";

const { expect, test } = require('@playwright/test');
import { MainMenu} from "./main-menu";
export class GamePage {

    constructor(page) {
        this.currentLocale = getLocalization();
        this.page = page;
        this.mainMenu = new MainMenu(page);
    }
}
