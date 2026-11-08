import { dynamicData } from "../../../data/testData/dynamicData";

export const getData = {
    loadData(scenarioName: string): Record<string, any> {
        const data = (dynamicData.testData as Record<string, any>)[scenarioName];
        if(!data) {
            throw new Error(`No test data found for "${scenarioName}" in dynamicData`);
        }
        return data;
    },
};