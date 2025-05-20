// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.HomePage = class HomePage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */

    constructor(page) {
        this.page = page;

        this.searchTextBox = page.locator("#APjFqb");
    }

    async goto(){
        await this.page.setViewportSize({width:1366, height:728});
        await this.page.goto(process.env.URL);
    }

    async searchKeyWords(param1){
        await expect(this.searchTextBox).toBeEnabled();
        await this.searchTextBox.click();
        await this.searchTextBox.fill(param1);
        await this.searchTextBox.press('Enter');
    }

}


