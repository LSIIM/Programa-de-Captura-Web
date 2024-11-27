Cypress.Commands.add("getByDataTestId", (dataTestId: string) => {
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
