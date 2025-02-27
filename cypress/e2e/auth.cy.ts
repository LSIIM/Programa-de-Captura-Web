import constants from "../utils/constants";

describe("Auth", () => {
    const LOGIN_EMAIL = "example@example.com";
    const LOGIN_PASS = "(@mksda9)#is)a(d";

    it("should log in", () => {
        cy.visit(constants.VIEWS.LOGIN_PATH);

        cy.getByDataTestId("input-email").type(LOGIN_EMAIL);
        cy.getByDataTestId("input-password").type(LOGIN_PASS);

        cy.intercept({ method: "POST", url: constants.API.AUTH.LOGIN_PATH }, (req) => {
            expect(req.body.email).equals(LOGIN_EMAIL);
            expect(req.body.password).equals(LOGIN_PASS);
            req.reply({});
        });

        cy.getByDataTestId("button-login").click();
    });

    it("should log out", () => {
        cy.visit(constants.VIEWS.PACTIENTS_PATH);

        cy.checkOnTable({ length: 37, dataArr: ["Alana", "Ana", "Ana", "Anthony"] });

        cy.getByDataTestId("button-logout").click();

        cy.url().should("include", constants.VIEWS.LOGIN_PATH);
    });
});
