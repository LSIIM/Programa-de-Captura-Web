import constants from "../utils/constants";

describe("Recordings", () => {
    const AMOUNT_RECORDING_BY_GET = 50;
    const PATIENT = { name: "Alana" };
    const PROJECT = { name: "camera fixa" };

    beforeEach(() => {
        cy.visit(constants.VIEWS.RECORDINGS_PATH);
    });

    it("should view all recordings", () => {
        cy.getByDataTestId("card-recording").should("have.length", AMOUNT_RECORDING_BY_GET);

        cy.getByDataTestId("scroll-infinite").scrollTo("bottom");
        cy.getByDataTestId("card-recording").should("have.length", AMOUNT_RECORDING_BY_GET * 2);
    });

    it("should create recordings", () => {
        cy.contains("Gravar").click();

        cy.url().should("contain", constants.VIEWS.CREATE_RECORD_PATH);

        cy.getSelectByLabel("Paciente").select(PATIENT.name);
        cy.getSelectByLabel("Projeto").select(PROJECT.name);

        //TODO: Tem alguma forma de testar mais de uma câmera?
        cy.contains("Escolher câmeras").click();
        cy.getByDataTestId("btn-select-cam").eq(0).click();
        cy.contains("Confirmar").click();

        cy.getByDataTestId("btn-play-pause-retry-video").click();
        cy.getByDataTestId("btn-play-pause-retry-video").click();

        cy.intercept({ method: "POST", url: constants.API.RECORDINGS.DEFAULT_PATH }, (req) => {
            //TODO: Verificar como posso tratar o ArrayBuffer para verificar os dados vindos.
            req.reply({});
        });

        cy.getByDataTestId("btn-upload-video").click();
        cy.contains("Movimento salvo!");
    });

    it("should play a recording's video", () => {
        cy.getByDataTestId("card-img-recording").eq(0).click();
        cy.url().should("contain", constants.VIEWS.PLAYING_FIRST_RECORDING);
        //TODO: Fazer outras verificações como por exemplo verificar se o infinite scroll funciona aqui.
    });
});
