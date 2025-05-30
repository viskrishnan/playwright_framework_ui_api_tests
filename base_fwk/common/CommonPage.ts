import {test , expect, Page } from "@playwright/test";
import { CommonScenario } from "../common/CommonScenario";


export class CommonPage {
    private dataMap = new Map();
    constructor(public page: Page, readonly scenario: CommonScenario) {
    }

    public getValue(key: string){
        const value = this.getValue(key);
        return value;
    }


    public setValue(key: string, value: string){
        this.scenario.setValue(key, value);
    }

    async takeScreenShot(name: string){
        await this.takeScreenShot(name);
    }
}