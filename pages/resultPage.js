// Include playwright module
const { expect} = require('@playwright/test')

//create class
exports.ResultsPage = class ResultsPage {

    /**
     * 
     * @param  {import ('@playwright/test').Page} page
     */

    constructor(page){
        //Init page
        this.page = page;

        this.playlistlink = page.getByRole('link',{name: 'playwright by testers talk'});
    }


    async clickOnPlaylist(){
        await expect(this.playlistlink.first()).toBeEnabled();
        await this.playlistlink.first().click();
    }

}