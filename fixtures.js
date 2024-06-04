const base = require('@playwright/test');
// const testDataJson = require('./onliner/test-data/testData.json');


const fixtures = {

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