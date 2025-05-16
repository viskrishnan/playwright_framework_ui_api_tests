import {test, expect } from '@playwright/test';
import { qaTestData } from "../test-data/qa/google.json";
import { stageTestData } from "../test-data/stage/google.json"

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
    

})