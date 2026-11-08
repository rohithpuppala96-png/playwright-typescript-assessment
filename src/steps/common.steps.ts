import { Given } from "@cucumber/cucumber";
import { getData } from "../support/utils/getData";
import { CustomWorld } from "../support/world";

Given("The test fetches required data {string}", function (this: CustomWorld, scenarioName: string) {
  this.currentData = getData.loadData(scenarioName);
});
