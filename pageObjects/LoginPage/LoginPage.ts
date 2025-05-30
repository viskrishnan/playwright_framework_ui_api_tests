import { AxeBuilder } from "@axe-core/playwright";
import { expect, Page, } from "@playwright/test";
import { CommonPage } from "../../base_fwk/common/CommonPage";
import { CommonScenario } from "../../base_fwk/common/CommonScenario";
import { locators } from "../LoginPage/LoginPageLocators";
import { testData } from "../../tests/testData";

export class LoginPage extends CommonPage {
    constructor(public page: Page, readonly scenario: CommonScenario){
        super(page, scenario);
    }

    async goTo(){
        await this.page.goto(testData.qa);
        await this.page.waitForLoadState("domcontentloaded");
        await this.scenario.allAnalysis();
    }

    async validLogin(username, password){
        await this.page.locator(locators.userName).type(username);
        await this.page.locator(locators.password).type(password);
        await this.page.locator(locators.signInbutton).click();
        await this.page.waitForLoadState('networkidle');
    }
}