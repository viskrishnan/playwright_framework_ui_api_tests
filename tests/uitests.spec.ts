import {test, expect } from '@playwright/test';
import { qaTestData } from "../test-data/qa/google.json";
import { stageTestData } from "../test-data/stage/google.json"
import { HomePage } from '../pages/homepage';
import {PlaylistPage} from '../pages/playlistPage';
import { ResultsPage } from '../pages/resultPage';



let testData: any;

test.beforeAll('Running before all tests', ()=> {
    if(process.env.ENV == 'qa'){
        testData = qaTestData;

    }
    else {
        testData = stageTestData;
    }
})

//Write a test
test('UI automation test using playwright', async ({page}) => {

    const homepage = new HomePage(page);
    const playlistPage = new PlaylistPage(page);
    const resultPage = new ResultsPage(page);
    

    await test.step('Go to URL', async () => {
        await homepage.goto();
    });

    await test.step('Search with keywords', async () => {
        await homepage.searchKeyWords(testData.skill1)

    });

    await test.step('Click on playlist', async () => {
        await resultPage.clickOnPlaylist();
        await page.waitForTimeout(4000);

    });


    await test.step('Click on video', async () => {
        await playlistPage.clickOnVideo();
        await page.waitForTimeout(8000);

    });

})