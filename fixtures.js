const base = require('@playwright/test');
const testDataJson = require('./steam-store/test-data/age-data.json')

const fixtures = {

    clientAge: [ testDataJson.clientAge, { option: true} ],

    async page({page}, use){



        // chromium
        const context = await base.chromium.launchPersistentContext('', {
            channel: 'chrome'
        });
        const customPage = await context.newPage();

        await use(customPage);
    },
    // async page({page}, use){
    //     // chromium
    //     const context = await base.firefox.launchPersistentContext('', {
    //         channel: 'chrome'
    //     });
    //     const customPage = await context.newPage();
    //
    //     await use(customPage);
    // }

}

const test = base.test.extend(fixtures);
const { expect } = base;

module.exports = {
    test,
    expect
};