type tDataTestId =
    | "table-body-row"
    | "form-group"
    | "input-email"
    | "input-password"
    | "button-login"
    | "button-logout"
    | "modal-manage"
    | "btn-submit"
    | "card-recording"
    | "scroll-infinite"
    | "btn-select-cam"
    | "btn-play-pause-retry-video"
    | "btn-upload-video"
    | "card-img-recording"
    | "moviment-btn";

declare namespace Cypress {
    interface Chainable<Subject> {
        getByDataTestId(dataTestId: tDataTestId): Chainable<any>;
        checkOnTable(props?: { length?: number; dataArr?: string[] }): void;
        getInputByLabel(label: string): Chainable<any>;
        getSelectByLabel(label: string): Chainable<any>;
    }
}

Cypress.Commands.add("getByDataTestId", (dataTestId: tDataTestId) => {
    return cy.get(`[data-test=${dataTestId}]`);
});

Cypress.Commands.add("checkOnTable", (props?: { length?: number; dataArr?: string[] }) => {
    const tableRowId = "table-body-row";

    if (props?.length !== undefined) cy.getByDataTestId(tableRowId).should("have.length", props.length);
    if (props?.dataArr !== undefined)
        props.dataArr.forEach((data, index) => {
            cy.getByDataTestId(tableRowId).eq(index).contains(data);
        });
});

Cypress.Commands.add("getInputByLabel", (label: string) => {
    return cy.getByDataTestId("form-group").contains(label).parent().find("input, textarea");
});

Cypress.Commands.add("getSelectByLabel", (label: string) => {
    return cy.getByDataTestId("form-group").contains(label).parent().find("select");
});
