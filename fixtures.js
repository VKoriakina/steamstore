const base = require('@playwright/test');
const ENJson = require('./steam-store/test-data/localization/EN.json');
const DEJson = require('./steam-store/test-data/localization/DE.json')



const fixtures = {
    EN: [ ENJson, { option: true} ],
    DE: [DEJson, { option: true} ],


    async page({page}, use){
        // chromium
        const context = await base.chromium.launchPersistentContext('', {
            channel: 'chrome'
        });
        const customPage = await context.newPage();

        await use(customPage);
    },
    // async pageff({page}, use){
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