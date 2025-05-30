import { AxeBuilder } from "@axe-core/playwright";
import { test, expect, Page, TestInfo } from "@playwright/test";

export class CommonScenario {
    private myMap = new Map<string, string>();

    constructor(public page: Page, public testInfo: TestInfo) {
    }

    async takeScreenShot(name: string){
        this.testInfo.attach('$(this.testInfo.title)_$(name)', {
            contentType: "Image/png",
            body: await this.page.screenshot({
                fullPage:true
            })
        });
    }


    async hooks() {
        console.log("hook from the scenario page");
    }

    getValue(key: string){
        return this.myMap.get(key);
    }


    setValue(key: string, value: string){
        this.myMap.set(key,value);
    }


    async allAnalysis(){
        const accessibilityScanResults = await new AxeBuilder({ page: this.page }).analyze();
        const issues = accessibilityScanResults.violations.length;
        console.log("ally issues found: ", issues);
        await this.testInfo.attach('accessibility-Scan-Results', {
            body: JSON.stringify(accessibilityScanResults,null,2),
            contentType: 'application/json'
        });
    }
}