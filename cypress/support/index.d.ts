declare namespace Cypress {
    interface Chainable<Subject> {
        getByDataTestId(dataTestId: string): Chainable<any>;
        checkOnTable(props?: { length?: number; dataArr?: string[] }): void;
        getInputByLabel(label: string): Chainable<any>;
        getSelectByLabel(label: string): Chainable<any>;
    }
}
